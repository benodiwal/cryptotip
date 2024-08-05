import { connection } from "@/lib/constants";
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const getAccountBalance = async (token: {
    name: string;
    mint: string;
    native: boolean;
    decimals: number;
}, address: string) => {
    if (token.native) {
        let balance = await connection.getBalance(new PublicKey(address));
        return balance/LAMPORTS_PER_SOL;
    }
    const ata = await getAssociatedTokenAddress(new PublicKey(token.mint), new PublicKey(address));

    try {
        const account = await getAccount(connection, ata);
        return Number(account.amount)/(10 ** token.decimals);
    } catch (e: unknown) {
        return 0;
    } 
}
