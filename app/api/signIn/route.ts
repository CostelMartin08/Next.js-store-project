'use server'
import { NextApiResponse } from "next";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { sendVerificationEmail } from "@/app/lib/mail";
import { generateVerificationToken } from "@/app/lib/tokens";
import { getUserByEmail } from "@/app/data/user";


export async function POST(req: any, res: NextApiResponse) {

    const { email, password } = await req.json() as { email: string, password: string };

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return res.status(401).send({ error: "Credențiale invalide" });

    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email,
        );


        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );


        return {
            succes: "Email de confirmare trimis!"
        }
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
                    return res.status(401).send({ error: "Credențiale invalide" });
                default:
                    return res.send({ message: 'Ceva nu amers bine' })
            }
        }

        throw error;
    }

}