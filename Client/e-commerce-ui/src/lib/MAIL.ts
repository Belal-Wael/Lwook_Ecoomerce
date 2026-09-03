import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);


// Send an email verification link to the specified email address
export const sendEmailVerification = async (email: string, token: string) => {

    const link = `${process.env.DOMAIN}/verify-email?token=${token}&email=${email}`;

    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verify your email',
            html: `
            please click the link below to verify your email address:
            <a href="${link}">Verify Email</a>
          `,
        });
    }
    catch (err) {
        console.log('Error sending email verification:', err);
    }
}

// Send a password reset link to the specified email address
export const sendEmailToConfirmTwoStep = async (email: string, token: string) => {

    const link = `${process.env.DOMAIN}/confirm-two-step?token=${token}`;

    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Confirm Two-Factor Authentication',
            html: `
            please click the link below to confirm your two-factor authentication:
            <a href="${link}">Confirm Two-Step</a>
          `,
        });
    }
    catch (err) {
        console.log('Error sending confirm two-step email:', err);
    }
}

// Send a password reset link to the specified email address

export const sendEmailToResetPassword = async (email: string, token: string) => {

    const link = `${process.env.DOMAIN}/reset-password?token=${token}`;

    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'reset your password',
            html: `
            please click the link below to reset your password:
            <a href="${link}">Reset Password</a>
          `,
        });
    }
    catch (err) {
        console.log('Error sending reset Password email:', err);
    }
}