import Google from "next-auth/providers/google";
import { session } from "@/types/session";
import prisma from "@/db";

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
                await prisma.user.create({
                    data: {
                        username: email,
                        name: profile?.name,
                        profilePicture: profile?.picture,
                        sub: account.providerAccountId
                    }   
                });
                return true;
            }
            return false;
        }
    }
};
