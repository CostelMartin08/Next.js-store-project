
"use server"


import { addProduct } from "../data/products";
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

  
    //TEST"
     // addProduct("Televizor LG LED 75UR81003LJ, 189 cm, Smart, 4K Ultra HD, Clasa F (Model 2023)",
      // "https://s13emagst.akamaized.net/products/55734/55733759/images/res_fc2ce4c93213527189468da6a9f8b021.jpg?width=720&height=720&hash=69A7EAF2AD5427758FE6DD5E45DD023A",
     //   50, 470, false, 480, 'tv',)
    //addProduct('Samsung Tablet S8', "https://s13emagst.akamaized.net/products/43178/43177453/images/res_a245367a52ae9e5d6f448d0513c91542.jpg?width=450&height=450&hash=9462D3452E16AA933C512905579280A9", 20, 5000, false, 0, 'tablets',)
    //  addProduct('TV Samsung OLED 80inch', "https://s13emagst.akamaized.net/products/54089/54088254/images/res_5700e7aad050c7a7dcaac19523c9464f.jpg?width=450&height=450&hash=4B7F61FF25A6AA6E359EE5429AB8FBB8", 5, 8000, false, 0, 'tv',)


    //Verification email/ Trimiterea email-ului de verificare!!!!!!
  {/*  if (value.email && value.email !== user.email) {

        const existingUser = await getUserByEmail(value.email);

        if (existingUser && existingUser.id !== user.id) {
            return { error: 'Email already in user!' };
        }

        const verificationToken = await generateVerificationToken(
            value.email
        );

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        )

        return { success: 'Verification email sent!' };


    }*/}

    //Verification password
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
