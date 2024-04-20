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

    const awaitConfirmation = await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    );

    if (awaitConfirmation) {

        return { success: 'Reset email send!' };
    }

}