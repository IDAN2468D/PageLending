"use server";
import { Resend } from 'resend';

// Make sure to add RESEND_API_KEY to your .env.local and Render
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Mail Utility using Resend API (Avoids Render SMTP Blocks)
 */
export async function sendEmail({ to, subject, html }) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is missing in environment variables');
        console.log('--- MOCK EMAIL ---');
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log('--- END MOCK ---');
        return { success: true, mock: true };
    }

    try {
        const { data, error } = await resend.emails.send({
            // Note: onboarding@resend.dev can only send to the email you registered with Resend!
            // To send to other addresses (like auto-replies to clients), you must verify your own domain in Resend.
            from: 'FinSmart <onboarding@resend.dev>',
            to,
            subject,
            html,
        });

        if (error) {
            console.error('Resend API error:', error);
            return { success: false, error: error.message };
        }

        console.log('Email sent successfully via Resend:', data);
        return { success: true, messageId: data.id };
    } catch (error) {
        console.error('Unexpected email error:', error);
        return { success: false, error: error.message };
    }
}
