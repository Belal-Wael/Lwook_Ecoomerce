import NextAuth from "next-auth"
import authConfig from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/utils/types";
import prisma from "@/lib/prisma";
import * as bcrypt from 'bcryptjs'
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    session: { strategy: "jwt" },
    adapter: PrismaAdapter(prisma),
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
                const user = await prisma.user.findUnique({
                    where: {
                        id: token.sub
                    }
                })

                if (user) {
                    session.user.role = user.role;
                    session.user.image = user.image;
                    // put isTwoStepEnabled in session
                    session.user.isTwoStepEnabled = user.isTwoStepEnabled;
                }
            }
            return session
        },

        async signIn({ user, account }) {
            if (account?.provider !== 'credentials')
                return true;
            // const userFromDb = await prisma.user.findUnique({
            //     where: {
            //         email: user.email as string
            //     }
            // })
            // if (!userFromDb || !userFromDb?.emailVerified) return false;
            // two step check 
            // if (userFromDb.isTwoStepEnabled) {
            //     const twoStepConfirm = await prisma.twoStepConfirmation.findUnique({
            //         where: {
            //             userId: userFromDb.id
            //         }
            //     });
            //     if (!twoStepConfirm) return false;
            //     await prisma.twoStepConfirmation.delete({ // if confirmed then delete it 
            //         where: { id: twoStepConfirm.id }
            //     })
            // }
            return true;
        }
    },
    providers: [

        Credentials({
            async authorize(data) {
                const validation = loginSchema.safeParse(data);
                if (validation.success) {
                    const { email, password } = validation.data;
                    const user = await prisma.user.findUnique({
                        where: {
                            email
                        }
                    })
                    if (!user || !user.password)
                        return null;
                    const isPasswordMatch = await bcrypt.compare(password, user.password);
                    if (isPasswordMatch) return {
                        id: user.id as string,
                        email: user.email,
                        name: user.name,
                        image: user.image
                    };
                }
                return null;
            }
        }),

        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
})