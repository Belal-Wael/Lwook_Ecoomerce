"use server"

import prisma from "@/lib/prisma"
import { ActionType } from "@/utils/types"

export async function verifyEmail(token: string, email: string): Promise<ActionType> {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: {
                email
            }
        })
        if (!verificationToken)
            return { success: false, message: "Invalid token" }
        const isExpired = verificationToken.expires < new Date()
        if (isExpired)
            return { success: false, message: "Token expired" }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user)
            return { success: false, message: "User not found" }

        // Token is valid, verify the user's email
        await prisma.user.update({
            where: {
                email
            },
            data: {
                emailVerified: new Date()
            }
        })

        // delete the used token
        await prisma.verificationToken.deleteMany({
            where: {
                email
            }
        });

        return { success: true, message: "Email verified successfully" }
    } catch (error) {
        return { success: false, message: "An error occurred" }
    }
}