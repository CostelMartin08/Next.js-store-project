import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./app/lib/db";

import authConfig from "./auth.config";


import { getUserById, updateUser } from "./app/data/user";
import { getTwoFactorConfirmationByUserId } from "./app/data/two-factor-confirmation";
import { getAccountByUserId } from "./app/data/account";

export const {

    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/signIn",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {

            await updateUser(user)
        }
    },
    callbacks: {

        async signIn({ user, account }) {


            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id as string);

            if (!existingUser?.emailVerified) return false;

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await

                    getTwoFactorConfirmationByUserId(existingUser.id);


                if (!twoFactorConfirmation) return false;

                //delete 2FA
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                });

            }


            return true;
        },
        async session({ token, session }) {

            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as "ADMIN" | "USER";
            }

            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            if (session.user) {
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.isOAuth = token.isOAuth as boolean
                session.user.image = token.picture as string;
            }
        
            return session;
        },
        async jwt({ token }) {

            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(
                existingUser.id
            );

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
            token.picture = existingUser.image;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})