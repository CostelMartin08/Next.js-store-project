import { Resend } from "resend";
import { CartProduct } from "../types";
import { EmailTemplate } from "./emailTemplate";


const resend = new Resend(process.env.RESEND_API_KEY);
export const sendTwoFactorEmail = async (
    email: string,
    token: string,
) => {
    await resend.emails.send({
        from: "verify@gadgetgrid.ro",
        to: email,
        subject: "2FA Code",
        html: `<h6>Your 2FA code: ${token}</h6>`
    });
};
export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `https://gadgetgrid.ro/auth/new-password?token=${token}`
    await resend.emails.send({
        from: "verify@gadgetgrid.ro",
        to: email,
        subject: "Reset your password",
        html: `<h6>Click <a href="${resetLink}">here</a> to reset password.</h6>`
    })
};
export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `https://gadgetgrid.ro/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from: "verify@gadgetgrid.ro",
        to: email,
        subject: "Email verification",
        html: `<h6>Click <a href="${confirmLink}">here</a> to confirm email.</h6>`,

    });
}


export const sendOrderConfirmation = async (
    data: CartProduct[],
    email: string,
    name: string,
) => {

    console.log(data)

    await resend.emails.send({
        from: "verify@gadgetgrid.ro",
        to: email,
        subject: "Confirm Order",
        html: null,
        react: EmailTemplate({ data,  name }),


    });
}