
import { getUserByEmail } from "@/app/data/user";
import { NextResponse } from "next/server";


export async function POST(req: { json: () => PromiseLike<{ email: string; }> | { email: string; }; }) {

    try {

        let { email } = await req.json();

        const user = await getUserByEmail(email);

        return NextResponse.json({ user });

    } catch (error) {

        console.log("Error!");
    }


}