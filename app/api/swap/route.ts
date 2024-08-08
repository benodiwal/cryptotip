import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";

export async function POST(req: NextRequest) {
    const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=5935eb6e-9c4e-4031-b4b6-f1290106d2d6");
    const { quoteResponse }: { quoteResponse: any } = await req.json();

    const session = await getServerSession(authConfig);
    if (!session?.user) {
        return NextResponse.json({ message: "You are not logged in" }, { status: 401 });
    }

    const solWallet = await db.solWallet.findFirst({
        where: { userId: session.user.uid }
    });

    if (!solWallet) {
        return NextResponse.json({ message: "Couldn't find associated Solana wallet" }, { status: 401 });
    }

    const swapApiResponse = await fetch('https://quote-api.jup.ag/v6/swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            quoteResponse,
            userPublicKey: solWallet.publicKey,
            wrapAndUnwrapSol: true,
        })
    });
    const { swapTransaction } = await swapApiResponse.json();

    console.log("Jupiter returned transaction");

    const transaction = deserializeAndSignTransaction(swapTransaction, solWallet.privateKey);

    const latestBlockHash = await connection.getLatestBlockhash();
    const rawTransaction = transaction.serialize();

    const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2
    });

    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txid
    });

    return NextResponse.json({ txid });
}

function deserializeAndSignTransaction(swapTransaction: string, privateKey: string): VersionedTransaction {
    const transactionBuffer = Buffer.from(swapTransaction, 'base64');
    const transaction = VersionedTransaction.deserialize(transactionBuffer);

    const privateKeyUint8Array = Uint8Array.from(privateKey.split(",").map(Number));
    const keypair = Keypair.fromSecretKey(privateKeyUint8Array);

    transaction.sign([keypair]);
    return transaction;
}
