'use server'

import { NextResponse, NextRequest } from "next/server";
import { generateVerificationToken } from "@/app/lib/tokens";
import { sendVerificationEmail } from "@/app/lib/mail";
import bcrypt from 'bcrypt';

import { addUser } from "@/app/data/user";

interface UserCredentials {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: any) {

    let { name, email, password } = await req.json() as { name: string, email: string, password: string };


    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        await addUser(name, email, hashedPassword);

        const verificationToken = await generateVerificationToken(email);

        await sendVerificationEmail(
            name,
            verificationToken.email,
            verificationToken.token,
        )

        return NextResponse.json({ succes: "Confirmation email sent!" }, {
            status: 201
        });

    } catch (error) {
        return NextResponse.json({ error: 'Something went wrong, try again later!' }, { status: 500 });

    }

}
