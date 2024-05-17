
import { getUserByEmail } from "@/app/data/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        const user = await getUserByEmail(email);

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error!", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
