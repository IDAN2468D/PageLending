"use server";
import nodemailer from 'nodemailer';
import dns from 'dns';

// Fix ENETUNREACH: Force Node.js DNS to prefer IPv4 instead of IPv6 (Solves Windows Nodemailer bug)
if (dns && dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}

/**
 * Mail Utility using Nodemailer
 */
export async function sendEmail({ to, subject, html }) {
    // Explicit SMTP configuration to fix Render ETIMEDOUT blocks
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // false for port 587 (uses STARTTLS)
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // Application-specific password for Gmail
        },
        tls: {
            // Do not fail on invalid certs in some restricted cloud environments
            rejectUnauthorized: false
        },
        // Increase timeouts (Render's outbound might be slow)
        connectionTimeout: 20000,
        greetingTimeout: 20000,
        socketTimeout: 20000,
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
