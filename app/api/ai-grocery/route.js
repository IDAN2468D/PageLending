import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req) {
    const fallbackData = {
        analysis: "התקציב הזה דורש ניהול מהודק אם אתם קונים גם מותגים. הסוד הוא העברת 30% מהקנייה למוצרי מותג פרטי.",
        savingStrategy: "רכזו את הקניות הענקיות פעם בחודש. קניות 'השלמה' בפיצוצייה גוזלות לכם 400 שקלים מהתקציב באזור חיוג לא מורגש.",
        rules: [
            "לעולם לא הולכים לסופר רעבים.",
            "משווים מחירים לפי 100 גרם, לא לפי גודל האריזה.",
            "בסיס כל ארוחה: בישול מראש שמקפיא שאריות ולא נזרק לפח."
        ]
    };

    if (!genAI) return NextResponse.json({ success: true, data: fallbackData });

    try {
        const body = await req.json();
        const { budget, people } = body;

        const prompt = `
אתה מומחה כלכלת בית של FinSmart.
משפחה של ${people} נפשות מוציאה ₪${budget} בחודש על רשתות שיווק ומזון.
המטרה: להנחית אסטרטגיה שתצמצם את בזבוז הכסף (Food waste וקניית אימפולסיבית).

החזר פורמט JSON בלבד:
{
  "analysis": "שקף את המצב להם: האם הם מבזבזים מדי עבור משפחה בגודל כזה? (משפט וחצי)",
  "savingStrategy": "אסטרטגיה חדה כמו תער לניהול הסופר ולחיסכון בסכום משמעותי בחודש",
  "rules": [
    "חוק ברזל 1 לסיבוב בסופר",
    "חוק ברזל 2 לסיבוב בסופר",
    "חוק ברזל 3 לגבי תכנון האופרציה במטבח"
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
