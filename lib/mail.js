"use server";
import nodemailer from 'nodemailer';

/**
 * Mail Utility using Nodemailer
 */
export async function sendEmail({ to, subject, html }) {
    // Use Gmail or any other SMTP service
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // Application-specific password for Gmail
        },
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('EMAIL_USER or EMAIL_PASS is missing in .env.local');
        console.log('--- MOCK EMAIL ---');
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log('--- END MOCK ---');
        return { success: true, mock: true };
    }

    const mailOptions = {
        from: `"FinSmart" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Nodemailer error:', error);
        return { success: false, error: error.message };
    }
}
