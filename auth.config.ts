import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DatabaseService } from "./app/db";
import bcrypt from 'bcryptjs';

const db = new DatabaseService();

export default {

    providers: [
        CredentialsProvider({
            name: "Credentials",

            async authorize(credentials) {
                try {
                    const { email, password } = credentials;
                    
                    const user = await db.getUserById(email as string);

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