import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req) {
    const fallbackData = {
        contractTitle: "הסכם שר האוצר הצעיר",
        rules: ["דמי כיס בגובה קבוע שיינתן ביום ה' כנגד המטלות המוסכמות.", "40% הולכים לקופת חיסכון 'אופניים'.", "עזרה להורים שווה 'נקודות זכות' לממתקים בשעת הצורך."],
        savingsSplit: "30% חיסכון / 70% בזבוז",
        message: "על ידי יצירת מחויבות לקופה עצמית, הילד שלכם לומר לדחות סיפוק ולהעריך כסף הרבה לפני כניסתו לצבא."
    };

    if (!genAI) return NextResponse.json({ success: true, data: fallbackData });

    try {
        const body = await req.json();
        const { ages, behaviors } = body;

        const prompt = `
אתה מחנך פיננסי לילדים ונוער מטעם חברת FinSmart.
ההורה מוסר בגאווה על ילדיו:
גילים: ${ages}
דברים שגוזלים תקציב מיותר: "${behaviors}".
המטרה: לבנות להם "חוזה עסקי מול ההורים" פשוט ומרגש לקבלת דמי כיס שיוצר עצמאות והבנה כלכלית מוקדמת.

החזר פורמט JSON בלבד:
{
  "contractTitle": "שם מפוצץ לחוזה דמי הכיס",
  "rules": [
    "סעיף 1. אחריות אישית (מה הוא חייב לעשות כדי לקבל את הסכום)",
    "סעיף 2. מנגנון הבזבוזים השוטף",
    "סעיף 3. מה קורה אם נגמר לו הכסף לפני יום ה'"
  ],
  "savingsSplit": "חלוקת דמי הכיס באחוזים (למשל: 50/50)",
  "message": "פסקת חיזוק להורים למה חתימה משותפת איתו עכשיו תשנה להם ולו את החיים הכלכליים."
}
`;
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const textResponse = result.response.text().replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();

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
