import { randomInt, randomUUID } from "node:crypto";
import prisma from "./prisma";



// Generate a verification token for the given email
export async function generateVerificationToken(email: string) {

    await prisma.verificationToken.deleteMany({
        where: { email }
    });

    const token = await prisma.verificationToken.create({
        data: {
            email,
            token: randomUUID(),
            expires: new Date(new Date().getTime() + 3600 * 1000 * 2)
        }
    })

    return token;
}

// Generate a password reset token for the given email
export async function generateResetPasswordToken(email: string) {

    await prisma.resetPasswordToken.deleteMany({
        where: { email }
    });

    const token = await prisma.resetPasswordToken.create({
        data: {
            email,
            token: randomUUID(),
            expires: new Date(new Date().getTime() + 3600 * 1000 * 2)
        }
    })

    return token;
}


// Generate two step token for the given email
export async function generateTwoStepToken(email: string) {

    await prisma.twoStepToken.deleteMany({
        where: { email }
    });

    const token = await prisma.twoStepToken.create({
        data: {
            email,
            token: randomInt(100000, 1000000).toString(),
            expires: new Date(new Date().getTime() + 3600 * 1000 * 2)
        }
    })

    return token;
}