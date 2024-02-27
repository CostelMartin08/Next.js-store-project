
import { getUserById } from "@/app/data/user";
import { NextResponse } from "next/server";



export async function POST(req: any) {

    try {
        let { email } = await req.json()

        const user = await getUserById(email);

        return NextResponse.json({ user });

    } catch (error) {

        console.log("error");
    }


}