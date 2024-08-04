import Google from "next-auth/providers/google";
import { session } from "@/types/session";
import prisma from "@/db";
import { Keypair } from "@solana/web3.js";

export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET ?? "",
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    callbacks: {
        session: ({ session, token }: any): session => {
            const newSession = session as session;
            if (newSession.user && token.uid) {
                newSession.user.uid = token.uid ?? "";
            }
            return newSession;
        },
        async jwt({ token, account }: any) {
            const user = await prisma.user.findFirst({
                where: {
                    sub: account?.providerAccountId ?? ""
                }
            });
            if (user) {
                token.uid = user.id   
            }
            return token;
        },
        async signIn({ user, account, profile }: any) {
            if (account?.provider == "google") {
                const email = user.email;
                if (!email) return false;
                const dbUser = await prisma.user.findFirst({
                    where: {
                        username: email
                    }
                });
                if (dbUser) return true;

                const keypair = Keypair.generate();
                const publickKey = keypair.publicKey.toBase58();
                const privateKey = keypair.secretKey;

                await prisma.user.create({
                    data: {
                        username: email,
                        name: profile?.name,
                        profilePicture: profile?.picture,
                        sub: account.providerAccountId,
                        solWallet: {
                            create: {
                                publicKey: publickKey,
                                privateKey: privateKey.toString(),
                            }
                        },
                        inrWallet: {
                            create: {
                                balance: 0,
                            }
                        }
                    }
                });
                return true;
            }
            return false;
        }
    }
};
