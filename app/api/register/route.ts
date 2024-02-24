'use server'

import { DatabaseService } from "@/app/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const dbService = new DatabaseService();

export async function POST(req: any) {

    let { name, email, password } = await req.json() as { name: string, email: string, password: string };

    try {

        password = await bcrypt.hash(password, 10);

        const addUser = await dbService.addUser(name, email, password);

        return NextResponse.json({ message: `Utilizator inregistrat cu succes: ${addUser}` }, {
            status: 201
        });

    } catch (error) {
        return NextResponse.json({ message: 'Eroare' }, { status: 500 });

    }

}
