import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req) {
    const fallbackData = {
        winner: "קנייה במימון",
        explanation: "בהתחשב בתקציב החודשי שהזנת ובשחיקת הערך הממוצעת של הרכב, רכישת יד שניה במימון אישי משתלמת יותר בטווח של 3 שנים וישאיר אצלך נכס בסוף התקופה.",
        savings: "15,000",
        tips: ["רכוש רכב בן 3 עד 4 שנים כדי שספיגת ירידת הערך תהיה מתונה", "השווה עלויות ביטוח מקיף לליסינג מול פרטי", "תמיד בדוק אפשרות למימון ישיר מהבנק ולא דרך המגרש"]
    };

    if (!genAI) return NextResponse.json({ success: true, data: fallbackData });

    try {
        const body = await req.json();
        const { carPrice, monthlyBudget } = body;

        const prompt = `
אתה יועץ פיננסי חכם של FinSmart.
לקוח מתלבט אם לקנות רכב בשווי ₪${carPrice} או לקחת עסקת ליסינג, כשיש לו תקציב חודשי פנוי להחזר על הרכב (כולל הכל) של ₪${monthlyBudget}.
המטרה: החלט מה עדיף לו (קנייה מול ליסינג) לתקופה של 3 שנים. התחשב בירידת ערך, ריביות ואובדן אלטרנטיבה להשקעה.

החזר אך ורק פורמט JSON תקני:
{
  "winner": "ליסינג פרטי / קנייה בהלוואה / קנייה במזומן",
  "explanation": "פסקת ניתוק מוחצת שמסבירה למה זה משתלם יותר (עד 3 משפטים)",
  "savings": "סכום הכסף המשוער בשקלים שהוא יחסוך ב-3 שנים לעומת החלופה (למשל: 12000)",
  "tips": [
    "טיפ זהב 1",
    "טיפ זהב 2",
    "טיפ זהב 3"
  ]
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
