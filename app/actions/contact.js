"use server";

import dbConnect from "../../lib/mongodb";
import Lead from "../../models/Lead";
import { sendEmail } from "../../lib/mail";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function submitLead(formData) {
  try {
    await dbConnect();

    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message") || "",
      source: formData.get("source") || "contact_form",
    };

    // 1. Save to MongoDB
    const lead = await Lead.create(data);

    // AI LEAD SCORING
    let aiInsightsHtml = "";
    if (data.message && data.message.length > 10 && process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `נתח את פניית הלקוח הבאה: "${data.message}". 
הלקוח פנה לחברת "PageLending" שמייעצת פיננסית.
קבע ציון קושי או פוטנציאל עסקי בין 1-10 (איפה 10 זה לקוח בשל ורווחי מאוד).
תמצת בחצי משפט 2 טיפים לאיך כדאי לדבר איתו בטלפון (למשל: לדבר על סיכונים, להרגיע אותו, וכו'). 
החזר HTML בלבד (בלי תגיות \`\`\`html) עם עיצוב כזה:
<div style="background:#fef3c7; color:#92400e; padding:15px; border-radius:8px; border:1px solid #fcd34d;">
  <p><strong>🧠 ניתוח מכירות AI:</strong></p>
  <p>ציון כיס: [הכנס...]</p>
  <p>זווית מכירה מומלצת: [הכנס...]</p>
</div>`;
        const aiResult = await model.generateContent(prompt);
        aiInsightsHtml = aiResult.response.text().replace(/^```html\s*/, '').replace(/\s*```$/, '').trim();
      } catch (err) {
        console.error("AI Insights Error:", err);
      }
    }

    // 2. Send Notification Email to Admin
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `ליד חדש באתר: ${data.name}`,
      html: `
        <div dir="rtl" style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #0c1c44;">התקבל ליד חדש ב-PageLending!</h2>
          ${aiInsightsHtml}
          <p><strong>שם:</strong> ${data.name}</p>
          <p><strong>טלפון:</strong> ${data.phone}</p>
          <p><strong>אימייל:</strong> ${data.email}</p>
          <p><strong>הודעה:</strong> ${data.message}</p>
          <p><strong>מקור:</strong> ${data.source}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">נוצר ב-${new Date().toLocaleString('he-IL')}</p>
        </div>
      `,
    });

    // 3. Send Confirmation Email to Client
    await sendEmail({
      to: data.email,
      subject: `תודה שפנית ל-PageLending!`,
      html: `
        <div dir="rtl" style="font-family: sans-serif; padding: 20px; text-align: right;">
          <h1 style="color: #0c1c44;">שלום ${data.name},</h1>
          <p>תודה שפנית אלינו. קיבלנו את פרטיך ויועץ פיננסי יחזור אליך תוך 24 שעות.</p>
          <p>בינתיים, אתה מוזמן לקרוא את המאמרים האחרונים שלנו בבלוג כדי להתחיל לקבל כלים כבר עכשיו.</p>
          <br />
          <p>בברכה,</p>
          <p><strong>צוות PageLending</strong></p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Submission error:", error);
    return { success: false, error: error.message };
  }
}
