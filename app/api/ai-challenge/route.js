import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req) {
    const fallbackData = {
        days: [
            { day: 1, title: "ביטול הוצאה מיותרת", task: "מצאו מנוי שאינו בשימוש ובטלו אותו מיד.", rule: "לנתק אשראי רדום" },
            { day: 2, title: "יום ללא קניות", task: "המטרה המסורתית: אל תוציאו שקל אחד היום. כן, כולל קפה.", rule: "הקפאת הוצאות ל-24 שעות" },
            { day: 3, title: "שעה של השוואת מחירים", task: "בחרו ספק שירות והשוו את המחיר שאתם מקבלים, תמיד יש מבצע הולך.", rule: "לחתוך עמלות" },
            { day: 4, title: "מיפוי חיובים אוטומטיים", task: "עברו על פירוט האשראי וסמנו כל חיוב שרירותי שיורד.", rule: "לראות לאן הולך הכסף" },
            { day: 5, title: "העברה להשקעה", task: "העבירו את כל הכסף שחסכתם בימים הקודמים לקופת השקעה.", rule: "פעולה אקטיבית ליעד" }
        ]
    };

    if (!genAI) {
        return NextResponse.json({ success: true, data: fallbackData });
    }

    try {
        const body = await req.json();
        const { target, amount } = body;

        const prompt = `
הלקוח רוצה לחסוך ₪${amount} לטובת המטרה הבאה: "${target}" תוך 30 ימים. 
תייצר עבורו אתגר יומי מרתק בסגנון משחקי ופסיכולוגי.
תן לי רק את 5 הימים הראשונים שיהוו דוגמה עוצמתית.
החזר פורמט JSON בלבד המכיל שדה 'days' עם מערך של 5 אובייקטים:
{
   "days": [
     { "day": 1, "title": "כותרת קליטה", "task": "המשימה בפירוט משפט קצר", "rule": "חוק זהב ליום זה" }
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
    } catch (error) {
        return NextResponse.json({ success: true, data: fallbackData });
    }
}
