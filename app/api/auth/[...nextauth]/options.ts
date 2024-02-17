import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Enter username"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter password"
                }
            },
            async authorize(credentials) {
                const user = { id: '42', name: "Ion", password: "nextauth" };

                if ((credentials?.username === user.name) && (credentials?.password === user.password)) {
                    return user;
                } else {
                    return null;
                }
            }
        }),
    ],
};
