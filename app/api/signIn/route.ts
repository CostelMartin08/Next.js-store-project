'use server'

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/app/lib/mail";
import { generateVerificationToken, generateTwoFactorToken } from "@/app/lib/tokens";
import { getUserByEmail } from "@/app/data/user";
import { NextRequest, NextResponse } from "next/server";
import { getTwoFactorTokenByEmail } from "@/app/data/two-factor-token";
import { db } from "@/app/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/app/data/two-factor-confirmation";

interface UserCredentials {
    email: string;
    password: string;
    code: string;
}

export async function POST(req: NextRequest, res: NextResponse) {

    const { email, password, code } = await req.json();


    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email,
        );

        await sendVerificationEmail(
            existingUser.name as string,
            verificationToken.email,
            verificationToken.token,
        );

        return { success: "Confirmation email sent!" };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {

        if (code) {

            const twoFactorToken = await getTwoFactorTokenByEmail(
                existingUser.email
            );

            if (!twoFactorToken) {
                return NextResponse.json({ error: 'Invalid code' }, { status: 404 })
            }

            if (twoFactorToken.token !== code) {
                return NextResponse.json({ error: 'Invalid code' }, { status: 404 })
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if (hasExpired) {
                return NextResponse.json({ error: 'Code expired' }, { status: 404 })
            }

            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id }
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(
                existingUser.id
            );

            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id }
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                }
            });
        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email)

            await sendTwoFactorEmail(
                existingUser.name as string,
                twoFactorToken.email,
                twoFactorToken.token,
            );


            return NextResponse.json({ twoFactor: true }, { status: 403 })
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });


    } catch (error) {

        if (error instanceof AuthError) {
            switch (error.type) {

                case "CredentialsSignin":

                    return NextResponse.json({ error: 'Invalid credentials' }, { status: 404 })
                default:
                    return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 })
            }
        }

        throw error;
    }

}