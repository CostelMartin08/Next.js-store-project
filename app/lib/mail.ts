import { Resend } from "resend";
import { CartProduct } from "../types";


const resend = new Resend(process.env.RESEND_API_KEY);
export const sendTwoFactorEmail = async (
    email: string,
    token: string,
) => {
    await resend.emails.send({
        from: "verify@gadgetgrid.ro",
        to: email,
        subject: "2FA Code",
        html: `<p>Your 2FA code: ${token}</p>`
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
        html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
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
        subject: "Confirma email-ul",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    });
}


export const sendOrderConfirmation = async (
    data: CartProduct[],
    email: string,
    name: string,
) => {

    let htmlContent =
        `
    <section>
    <h2>Buna ${name},</h2>
    <p>Comanda dumneavoastra a fost comfirmata. </p>
    </section>   
    
    `


    Object.entries(data).forEach(([key, value]) => {
        htmlContent +=
            `
            <table>
  <caption>
    Produsele Comandate:
  </caption>
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


    await resend.emails.send({
        from: "verify@gadgetgrid.ro",
        to: email,
        subject: "Confirm Order",
        html: htmlContent

    });
}