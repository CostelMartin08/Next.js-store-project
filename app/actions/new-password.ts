"use server"

import { getPasswordResetTokenByToken } from "../data/password-reset-token";
import { getUserByEmail } from "../data/user";
import bcrypt from 'bcryptjs'
import { db } from "../lib/db";


export const newPassword = async (password: string, token: string) => {



    if (!token) {
        return { error: "Missing token!" };
    }

    const existingToken = await getPasswordResetTokenByToken(token);


    if (!existingToken) {
        return { error: "Invalid token!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {

        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);


    if (!existingUser) {
        return { error: 'Email does exist!' };
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword }
    })


    await db.passwordResetToken.delete({
        where: { id: existingToken.id }
    })

    return { success: "Paassword updated!" }

}