import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { getUserById, updateUser } from "./app/data/user";
import { db } from "./app/lib/db";
import { getTwoFactorConfirmationByUserId } from "./app/data/two-factor-confirmation";
import { NextResponse } from "next/server";

export const {

    handlers: { GET, POST },
    auth,
    signIn,
    signOut
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

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})