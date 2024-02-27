"use server"
import { db } from "../lib/db";
import { getUserByEmail } from "../data/user";
import { getVerificationToken } from "../data/verification-token";


export const newVerification = async (token: string) => {

    const existingToken = await getVerificationToken(token);

    if (!existingToken) {
        return { error: 'Nu exista token!' };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();


    if (hasExpired) {
        return { error: 'Token-ul a expirat!' }
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Adresa de email nu exista!" }
    }

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await db.verificationToken.delete({
        where: { id: existingToken.id }
    });


    return { succes: 'Email verificat!' };

}