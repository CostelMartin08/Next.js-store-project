'use server'

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { sendVerificationEmail } from "@/app/lib/mail";
import { generateVerificationToken } from "@/app/lib/tokens";
import { getUserByEmail } from "@/app/data/user";
import { NextResponse } from "next/server";

interface UserCredentials {
    email: string;
    password: string;
}

export async function POST(req: { json: () => Promise<UserCredentials> }) {

    const { email, password } = await req.json();

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 404 })

    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email,
        );


        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        return NextResponse.json({ succes: 'Email send successfully' }, { status: 404 });

    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
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