
"use server"


import { getUserByEmail, getUserById } from "../data/user"
import { currentUser } from "../lib/auth"
import { db } from "../lib/db";
import { sendVerificationEmail } from "../lib/mail";
import { generateVerificationToken } from "../lib/tokens";
import bcrypt from 'bcryptjs';

export const settings = async (
    value: {
        name?: string;
        email?: string;
        password?: string;
        newPassword?: string;
        isTwoFactorEnabled?: boolean;
    }
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized!" };
    }

    const dbUser = await getUserById(user.id as string);

    if (!dbUser) {
        return { error: "Unauthorized!" };
    }

    if (user.isOAuth) {
        value.email = undefined;
        value.password = undefined;
        value.newPassword = undefined;
        value.isTwoFactorEnabled = undefined;

    }


    //Verification email/ Trimiterea email-ului de verificare!!!!!!
    if (value.email && value.email !== user.email) {

        const existingUser = await getUserByEmail(value.email);

        if (existingUser && existingUser.id !== user.id) {
            return { error: 'Email already in used!' };
        }

        const verificationToken = await generateVerificationToken(
            value.email
        );

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        )

        return { success: 'Verification email sent!' };
    }


    if (value.password && value.newPassword && dbUser.password) {

        const passwordMatch = await bcrypt.compare(
            value.password,
            dbUser.password
        );

        if (!passwordMatch) {
            return { error: 'Incorect password!' }
        }

        const hashedPassword = await bcrypt.hash(
            value.newPassword,
            10
        );

        value.password = hashedPassword;
        value.newPassword = undefined;
    }

    const filteredValue = Object.fromEntries(
        Object.entries(value).filter(([key, v]) => key !== value.newPassword && v !== null && v !== undefined)
    );

    await db.user.update({
        where: { id: dbUser.id },
        data: {
            ...filteredValue,
        },
    });

    return { success: 'Settings Updated!' };
};
