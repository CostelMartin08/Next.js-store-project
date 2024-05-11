import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import bcrypt from 'bcryptjs';

import { getUserByEmail} from "./app/data/user";


export default {
    
    providers: [
        Github({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            allowDangerousEmailAccountLinking: false,
            
        }),
        Credentials({
            name: "Credentials",

            async authorize(credentials) {
                try {
                    const { email, password } = credentials;

                    const user = await getUserByEmail(email as string);

                    if (!user || !user.password) {

                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password as string, user.password);

                    if (passwordMatch) {

                        return user;
                    } else {

                        return null;
                    }
                } catch (error) {

                    console.error('Error during authorization:', error);
                    return null;
                }
            }
        })
    ]

} satisfies NextAuthConfig