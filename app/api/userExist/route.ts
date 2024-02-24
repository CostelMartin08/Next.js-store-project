
import { DatabaseService } from "@/app/db";
import { NextResponse } from "next/server";


const dbService = new DatabaseService();

export async function POST(req: any) {

    try {
        let { email } = await req.json()

        const user = await dbService.getUserById(email);

        return NextResponse.json({ user });

    } catch (error) {

        console.log("error");
    }


}