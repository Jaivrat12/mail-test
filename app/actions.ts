'use server';

import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Email, SendMailResponse } from '@/types';

export async function sendMail(payload: FormData): Promise<SendMailResponse> {

    const email = Object.fromEntries(payload) as unknown as Email;
    console.log(email);

    const transporter = nodemailer.createTransport({
        service: email.smtpServer,
        auth: {
            user: email.from,
            pass: email.password,
        }
    });

    const mailOptions: Mail.Options = {
        to: email.to,
        subject: email.subject,
        text: email.body,
        // attachments: [
        //     {
        //         filename: 'images/profile.JPG',
        //         path: './images/profile.JPG',
        //     },
        // ],
    };

    try {
        const res = await transporter.sendMail(mailOptions);
        console.log(res);
        return {
            success: true,
            // res: { ...res },
        };
    } catch (err) {
        console.log(err);
        const error = err as Error;
        return {
            success: false,
            // error: { ...error },
        };
    }
}