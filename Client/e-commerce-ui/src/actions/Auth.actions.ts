"use server"
import { signIn, signOut } from "@/lib/auth";
import { generateTwoStepToken, generateVerificationToken } from "@/lib/generateToken";
import { sendEmailToResetPassword, sendEmailVerification } from "@/lib/MAIL";
import prisma from "@/lib/prisma";
import { ActionType, LoginActionType, loginInputsType, loginSchema, registerInputsType, registerSchema } from "@/utils/types";
import * as bcrypt from 'bcryptjs'
import { AuthError } from "next-auth";


// SignIn
export const loginAction = async (data: loginInputsType): Promise<LoginActionType> => {
    const validation = loginSchema.safeParse(data);
    if (!validation.success)
        return { success: false, message: "Invalid Credentials" }
    const { email, password, code } = validation.data
    try {
        //--------------- Check if Email Verified or Not-----------------//
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (!user || !user.password || !user.email) {
            return { success: false, message: "Invalid Credentials" }
        }
        // if (!user.emailVerified) {
        //     // generate email verification token
        //     const verificationToken = await generateVerificationToken(data.email);
        //     // here send email to user 
        //     await sendEmailVerification(user.email, verificationToken.token)

        //     return { success: false, message: "Please verify your email to login" }
        // }
        //----------------------------------------------------------------------//
        //------------- Check if two factor enable and confirm---------------//
        // if (user.isTwoStepEnabled && user.email) {
        //     if (code) {
        //         const twoStepTokenFromDb = await prisma.twoStepToken.findFirst({
        //             where: { email }
        //         })
        //         if (!twoStepTokenFromDb)
        //             return { success: false, message: "No token provided" }
        //         if (twoStepTokenFromDb.token != code)
        //             return { success: false, message: "Invalid Code" }
        //         const isExpired = new Date(twoStepTokenFromDb.expires) < new Date()
        //         if (isExpired)
        //             return { success: false, message: "Token Is Expired" }
        //         await prisma.twoStepToken.delete({
        //             where: { id: twoStepTokenFromDb.id }
        //         })
        //         await prisma.twoStepConfirmation.create({
        //             data: { userId: user.id }
        //         })
        //         // After verifying the code, proceed with sign in
        //         await signIn("credentials", { email, password, redirectTo: "/Profile" })
        //         return { success: true, message: "Logged In Successfully" }
        //     } else {
        //         const twoStepToken = await generateTwoStepToken(email);
        //         await sendEmailToResetPassword(email, twoStepToken.token);
        //         return { success: true, message: "Confirmation Code Send to Your Email", twoStep: true }
        //     }
        // }
        //----------------------------------------------------------------------//


        await signIn("credentials", { email, password, redirectTo: '/Profile' })

    } catch (error) {

        if (error instanceof AuthError) {

            switch (error.type) {
                case "CredentialsSignin":
                    return { success: false, message: "Invalid Email or Password" }
                default:
                    return { success: false, message: "Something went Wrong" }
            }
        }
        throw error;
    }
    return { success: true, message: "Logged In Successfully" }
}

// SignUp
export const registerAction = async (data: registerInputsType): Promise<ActionType> => {
    const validation = registerSchema.safeParse(data);
    if (!validation)
        return { success: false, message: "Invalid Credentials" }
    const isExist = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })
    if (isExist) {
        return { success: false, message: "this user already exist!" }
    }

    // generate verification token and send email
    const verificationToken = await generateVerificationToken(data.email);
    await sendEmailVerification(data.email, verificationToken.token);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt)
    await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            password: hashedPassword
        }
    })

    return { success: true, message: "Registered Successfully, please check your email to confirm" }
}

// SignOut
export const logOutAction = async (): Promise<void> => {
    await signOut();
}


// enable twoStep or Disable
export const toggleTwoStep = async (userId: string, enable: boolean): Promise<ActionType> => {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { isTwoStepEnabled: enable }
        })
        return { success: true, message: "Two-Step Verification Updated Successfully" }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Something went Wrong" }
    }
}