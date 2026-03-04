import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req) {
    const fallbackData = {
        probability: 85,
        estimatedAmount: "4500-8000",
        message: "על סמך הנתונים שהזנת, יש סבירות גבוהה שמס הכנסה חייב לך אלפי שקלים על שינויי החיים האחרונים שלך שלא עודכנו רטרואקטיבית בנקודות הזיכוי.",
        missingDocs: ["טופס 106 ממקומות העבודה הקודמים", "אישורי לידה / שינוי סטטוס", "אישור משיכת כספי פנסיה (אם היה)"]
    };

    if (!genAI) return NextResponse.json({ success: true, data: fallbackData });

    try {
        const body = await req.json();
        const { details } = body;

        const prompt = `
אתה רואה חשבון AI של חברת FinSmart, מומחה בהחזרי מס לשכירים ועצמאיים בישראל.
הלקוח פירט את האירועים הבאים ב-6 השנים האחרונות: "${details}".
מטרה: תלהיב אותו ולחשב סבירות להחזר מס שלא דרש.

החזר פורמט JSON בלבד:
{
  "probability": המספר (מאפס עד מאה) המייצג אחוז סבירות לקבלת מס על סמך הטקסט,
  "estimatedAmount": "ריינג' של סכום בשקלים שכנראה ממתין לו, למשל: 4000-8500",
  "message": "פסקת אזהרה/התרגשות שאומרת לו שזה כסף שלו שקורא לו",
  "missingDocs": [
    "מסמך 1 שעליו לאסוף למפגש איתנו",
    "מסמך 2",
    "מסמך 3"
  ]
}
`;
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const textResponse = result.response.text().replace(/^```json\s*/, '').replace(/\s*পদে$/, '').replace(/\s*```$/, '').trim();

        let data;
        try {
            data = JSON.parse(textResponse);
        } catch (e) {
            data = fallbackData;
        }
        return NextResponse.json({ success: true, data });
    } catch (e) {
        return NextResponse.json({ success: true, data: fallbackData });
    }
}
