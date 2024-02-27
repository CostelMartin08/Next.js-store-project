'use server'

import { NextResponse } from "next/server";
import { generateVerificationToken } from "@/app/lib/tokens";
import { sendVerificationEmail } from "@/app/lib/mail";
import bcrypt from 'bcrypt';

import { addUser } from "@/app/data/user";


export async function POST(req: any) {

    let { name, email, password } = await req.json() as { name: string, email: string, password: string };

    try {

        password = await bcrypt.hash(password, 10);

        const addUsr = await addUser(name, email, password);

        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return NextResponse.json({ message: `Confirmare utilizator trimisa: ${verificationToken}` }, {
            status: 201
        });

    } catch (error) {
        return NextResponse.json({ message: 'Eroare' }, { status: 500 });

    }

}
