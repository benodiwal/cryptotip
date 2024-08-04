import { getServerSession } from "next-auth";
import prisma from "@/db";
import { authConfig } from "@/lib/auth";

const getUserWallet = async () => {
    const session = await getServerSession(authConfig);
    if (!session?.user?.uid) {
        return {
            error: "User is not authenticated",
            userWaller: null,
        };
    }

    const userWallet = await prisma.solWallet.findFirst({
        where: {
            userId: session.user.uid,
        },
        select: {
            publicKey: true,
        }
    });

    if (!userWallet) {
        return {
            error: "No solana wallet found associated with the user",
            userWallet: null,
        };
    }

    return {
        error: null,
        userWallet   
    }
}

export default getUserWallet;
