import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req) {
    if (!genAI) {
        return NextResponse.json({
            success: false,
            error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your .env.local file."
        }, { status: 500 });
    }

    try {
        const body = await req.json();
        const { income, expenses, goalLabel } = body;

        const leftOver = Number(income) - Number(expenses);
        const situation = leftOver > 0
            ? `הלקוח נמצא בפלוס חודשי צפוי של כ-₪${leftOver}.`
            : `הלקוח נמצא בגירעון/מינוס חודשי צפוי של כ-₪${Math.abs(leftOver)}.`;

        const prompt = `
אתה יועץ פיננסי חכם, תמציתי ומקצועי.
לקוח מבקש תוכנית אסטרטגית פיננסית.
הנתונים שלו:
- הכנסה חודשית: ₪${income}
- הוצאות חודשיות ממוצעות: ₪${expenses}
- מצב נוכחי: ${situation}
- מטרה מרכזית: ${goalLabel}

כתוב 3 צעדים קצרים, ממוקדים ומעשיים (bullet points) שיעזרו ללקוח להגיע למטרה שלו לאור הנתונים: "${goalLabel}".
על הצעדים להיראות בצורה הזו (עד משפט או שניים לכל סעיף), לדוגמה:
"שם הפעולה: הסבר קצר על מה צריך לעשות."

תחזיר את תשובתך אך ורק כרשימה של מחרוזות בפורמט JSON בלבד, בלי פתיח ובלי סימן markdown מסביב, במבנה הבא:
[
  "כותרת 1: תוכן הסעיף הראשון",
  "כותרת 2: תוכן הסעיף השני",
  "כותרת 3: תוכן הסעיף השלישי"
]
`;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();

        // Clean markdown block if model accidentally adds ```json ... ```
        const cleanJson = textResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();

        let plan;
        try {
            plan = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Failed to parse Gemini output as JSON", cleanJson);
            plan = [
                "אופטימיזציית תקציב: המודל זיהה צורך בהתערבות אנושית. יש לבחון פערים בהוצאות.",
                "הגנת סיכונים: חשוב לוודא הגנות מספיקות למקרה של אובדן הכנסה.",
                "חישוב מסלול: יש לקבוע פגישה איתנו כדי לבנות מסלול פרטני למטרה."
            ];
        }

        return NextResponse.json({ success: true, plan });

    } catch (error) {
        console.error('Gemini API Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to generate plan' }, { status: 500 });
    }
}
