import { CartProduct } from "../types";
import nodemailer from 'nodemailer';

async function sendEmail(email: string, subject: string, htmlContent: string) {

    try {
      
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.APP_PASSWORD
            }
        });

        const mailOption = {
            from: process.env.USER,
            to: email,
            subject: subject,
            html: htmlContent
        };

        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOption, (err, info) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                resolve(info);
              }
            });
          });

        return true;

    } catch (error) {
        return { json: { message: "Failed to Send Email" }, status: 500 };
    }
}

export const sendTwoFactorEmail = async (email: string, token: string) => {
    const htmlContent = `<p>Your 2FA code: ${token}</p>`;
    return await sendEmail(email, "2FA Code", htmlContent);
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `https://gadgetgrid.ro/auth/new-password?token=${token}`;
    const htmlContent = `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`;
    return await sendEmail(email, "Reset your password", htmlContent);
}

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://gadgetgrid.ro/auth/new-verification?token=${token}`;
    const htmlContent = `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`;
    return await sendEmail(email, "Confirma email-ul", htmlContent);
}

export const sendOrderConfirmation = async (
    data: CartProduct[],
    email: string,
    name: string
) => {
    let htmlContent = `
        <section>
            <h2>Buna ${name},</h2>
            <p>Comanda dumneavoastra a fost comfirmata. </p>
        </section>
    `;

    Object.entries(data).forEach(([key, value]) => {
        htmlContent += `
            <table>
                <caption>Produsele Comandate:</caption>
                <thead>
                    <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">${key}</th>
                        <td>
                            <img src=${value.photo} width=80px height=80px alt=${value.name}>
                            <h3>${value.name}</h3>
                        </td>
                        <td><h2>${value.price}</h2>$</td>
                    </tr>
                </tbody>
            </table>
        `;
    });

    return await sendEmail(email, "Confirm Order", htmlContent);
};

