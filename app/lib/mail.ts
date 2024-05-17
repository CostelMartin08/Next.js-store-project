import { Resend } from "resend";
import { CartProduct } from "../types";
import { EmailTemplate } from "./emailTemplate";


const resend = new Resend(process.env.RESEND_API_KEY);


export const sendTwoFactorEmail = async (
    name: string,
    email: string,
    token: string,
) => {
    await resend.emails.send({
        from: "2FA@gadgetgrid.ro",
        to: email,
        subject: "Your two-step authentication (2FA) code",
        html: `
        <div>
            <h1 style="text-align:center"; font-weight: bold;>GadgetGrid</h1>
             <div style="disply:block; font-size:larger">
              <p style="margin-bottom: 10px;">Dear ${name},</p>
              <p style="margin-bottom: 5px;">You have requested a two-factor authentication (2FA) code for your account</p>
              <p style="margin-bottom: 5px;">Your two-factor authentication (2FA) code is: <span style="text-decoration: underline; font-weight: bold;">${token}</span></p>
              <p style="margin-bottom: 5px;">Please enter this code into the appropriate field to complete the authentication process.</p>
              <p style="margin-bottom: 5px;">If you did not request this code, please disregard this message.</p>
              <p style="margin:0">Best regards,</p>
              <p style="margin-bottom: 10px;">GadgetGrid Team</p>
             </div>
        </div>`
    });
};

export const sendPasswordResetEmail = async (
    name: string,
    email: string,
    token: string,
) => {
    const resetLink = `https://gadgetgrid.ro/auth/new-password?token=${token}`
    try {
        await resend.emails.send({
            from: "reset@gadgetgrid.ro",
            to: email,
            subject: "Password Reset: Reset Link",
            html:
                `
                <div>
                   <h1 style="text-align:center"; font-weight: bold;>GadgetGrid</h1>
                     <div style="disply:block; font-size:larger">

                      <p style="margin-bottom: 10px;">Dear ${name},</p>
                      <p style="margin-bottom: 5px;">You recently requested to reset the password for your account.</p>
                      <p style="margin-bottom: 10px;">To reset your password, please access the following link and follow the instructions provided there:</p>
                      <a style="margin-bottom: 5px;" href='${resetLink}'>${resetLink}</a>
                      <p style="margin-bottom: 5px;">If you did not request a password reset, please ignore this message.</p>
                      <p style="margin:0">Best regards,</p>                    
                      <p style="margin-bottom: 5px;"> GadgetGrid Team</p>

                     </div>
                </div>
                `
        })

        return true;

    } catch (error) {

        return false;
    }

};

export const sendVerificationEmail = async (
    name: string,
    email: string,
    token: string
) => {
    const confirmLink = `https://gadgetgrid.ro/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from: "verify@gadgetgrid.ro",
        to: email,
        subject: "Email Verification: Verification Link",
        html:
            `
         <div>
              <h1 style="text-align:center"; font-weight: bold;>GadgetGrid</h1>
                <div style="disply:block; font-size:larger">

                  <p style="margin-bottom: 10px;">Dear ${name},</p>
                  <p style="margin-bottom: 5px;">Thank you for registering</p>
                  <p style="margin-bottom: 10px;">To verify your email address and activate your account, please click on the following link:</p>
                  <a style="margin-bottom: 5px;" href='${confirmLink}'>${confirmLink}</a>
                  <p style="margin-bottom: 5px;">If you did not sign up for an account with us, you can safely ignore this email.</p>
                  <p style="margin:0">Best regards,</p>                    
                  <p style="margin-bottom: 5px;"> GadgetGrid Team</p>

            </div>
         </div>
        `,

    });
}


export const sendOrderConfirmation = async (
    data: CartProduct[],
    email: string,
    name: string,
) => {

    console.log(data)

    await resend.emails.send({
        from: "confirm-order@gadgetgrid.ro",
        to: email,
        subject: "Order Confirmation",
        html: '',
        react: EmailTemplate({ data, name }),


    });
}


export const sendEmailContact = async (
    name: string,
    email: string,
    phone: string,
    message: string
) => {

    await resend.emails.send({
        from: "website@gadgetgrid.ro",
        to: 'costelmartinescu2000@gmail.com',
        subject: "Mesaj de la GadgetGrid",
        html: `
        <div>

        <h1 style="text-align:center"; font-weight: bold;>GadgetGrid</h1>
        <h4>Salut Constantin! Aveti un mesaj de la ${name}: " ${message} ". Numar de telefon: ${phone}, Email: ${email} </h4>
        
        </div>
        `,

    });

}