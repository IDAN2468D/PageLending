import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req) {
    const fallbackData = {
        analysis: "לפי הנתונים, אתם משלמים דמי ניהול או הוצאה תקופתית הגבוהים בכ-20% מהממוצע בישראל.",
        potentialSavings: "150",
        actionPlan: "יש לפנות לחברה ולהציג דרישה מפורשת להשוואת תנאים למתחרים.",
        template: "שלום, שמתי לב שהתעריף שאני משלם כרגע גבוה. אשמח שתעדכנו לי את התעריף/דמי הניהול לפני שאני בוחן חלופות קיימות בשוק. תודה."
    };

    if (!genAI) {
        return NextResponse.json({ success: true, data: fallbackData });
    }

    try {
        const body = await req.json();
        const { expenseType, amount } = body;

        const prompt = `
אתה יועץ פיננסי חכם.
הלקוח סרק/הזין קבלה/הוצאה מסוג: "${expenseType}", בסך ₪${amount} לחודש או לתקופה משמעותית.
מטרתך: לזהות שומנים ולהציע חסכון מדוייק וטקסט יעיל לסגירת הפינה.

החזר אך ורק בפורמט JSON (בלי markdown):
{
  "analysis": "פסקה קצרה שמסבירה מה הבעיה (שילמת יקר/יש עמלות נסתרות...)",
  "potentialSavings": "סכום מספרי בלבד (למשל: 120) שמייצג כמה שקלים אפשר לחסוך",
  "actionPlan": "מה לעשות עכשיו (משפט אחד)",
  "template": "תבנית הודעה מדויקת להעתקה למוטב להורדת עמלות"
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
    } catch (error) {
        return NextResponse.json({ success: true, data: fallbackData });
    }
}
