"use server";
import { generateResetPasswordToken } from "@/lib/generateToken";
import { sendEmailToResetPassword } from "@/lib/MAIL";
import prisma from "@/lib/prisma";
import { ActionType, forgetPasswordInputsType, forgetPasswordSchema, resetPasswordInputsType, resetPasswordSchema } from "@/utils/types";
import * as bcrypt from "bcryptjs";


export const ForgetPasswordAction = async (props: forgetPasswordInputsType): Promise<ActionType> => {
    try {
        const validation = forgetPasswordSchema.safeParse(props);
        if (!validation.success)
            return { success: false, message: validation.error.message };
        const { email } = validation.data;
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user)
            return { success: false, message: "User with this email does not exist." };

        const resetToken = await generateResetPasswordToken(email);
        await sendEmailToResetPassword(email, resetToken.token);
        return { success: true, message: "Password reset email sent successfully." }
    }
    catch (error) {
        return { success: false, message: "Something went wrong. Please try again later." };
    }
}


export const ResetPasswordAction = async (props: resetPasswordInputsType, token: string): Promise<ActionType> => {
    try {
        const validation = resetPasswordSchema.safeParse(props);
        if (!validation.success)
            return { success: false, message: validation.error.message };
        const { password } = validation.data;
        const resetToken = await prisma.resetPasswordToken.findUnique({
            where: { token }
        })
        if (!resetToken)
            return { success: false, message: "Invalid or expired reset token." };
        const isExpired = new Date(resetToken.expires) < new Date();
        if (isExpired)
            return { success: false, message: "Reset token has expired." };

        const user = await prisma.user.findUnique({
            where: { email: resetToken.email }
        })
        if (!user)
            return { success: false, message: "User does not exist." };
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        await prisma.user.update({
            where: { email: resetToken.email },
            data: { password: hashedPassword }
        });
        await prisma.resetPasswordToken.deleteMany({
            where: { email: resetToken.email }
        })
        return { success: true, message: "Password has been reset successfully." }

    } catch (error) {
        return { success: false, message: "Something went wrong. Please try again later." };
    }
}