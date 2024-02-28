"use server"

import { getUserByEmail } from "../data/user";
import { sendPasswordResetEmail } from "../lib/mail";
import { generatePasswordResetToken } from "../lib/tokens";

export const reset = async (email: string) => {

    if (!email) {
        return { error: "Invalid Email!" };

    }

    const existingUser = await getUserByEmail(email);


    if (!existingUser) {
        return { error: 'Email not found!' }

    }


    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    );


    return { success: 'Reset email send' };


}