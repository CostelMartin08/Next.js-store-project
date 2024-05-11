'use server'

import { sendEmailContact } from "../lib/mail";


export const sendEmail = async (name: string, email: string, phone: string, message: string) => {


    await sendEmailContact(name, email, phone, message);

    return { message: "Your message has been sent!" };

}