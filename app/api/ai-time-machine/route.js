import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req) {
    if (!genAI) {
        return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
    }

    try {
        const body = await req.json();
        const { money, age, dream } = body;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
אתה מתכנן פיננסי חכם שמתמחה ב"מכונת זמן פיננסית" (אפקט הריבית דריבית).
הלקוח פנה אליך בנתונים הבאים:
הלקוח בן: ${age}.
הוא מתחיל עכשיו עם חיסכון פנוי של: ₪${money}.
החלום שלו מוגדר כ: "${dream}".

עליך לייצר עבור הלקוח 2 תסריטים מרתקים:
1. תסריט א' (אם לא יעשה כלום): תסריט פסימי שמראה שחיקת אינפלציה במשך 10 שנים למשל.
2. תסריט ב' (אם ישקיע איתנו): מצב בו הכסף מושקע בתשואה ממוצעת של 7%-8% שנתית כחלק מאסטרטגיה מותאמת אישית ל-10 שנים או עד להגשמת החלום.

החזר את התשובה שלך אך ורק בפורמט JSON בלבד, שבו אני יכול לקרוא:
{
  "scenarioA_title": "תסריט א': הולכים לישון",
  "scenarioA_desc": "הסבר פסימי קצר ומספר מוערך",
  "scenarioA_number": "מספר שלילי או קטן",
  "scenarioB_title": "תסריט ב': הכסף עובד",
  "scenarioB_desc": "הסבר אופטימי עם ריבית דריבית",
  "scenarioB_number": "מספר אופטימי גדול יותר"
}
חשוב מאוד לא להוסיף הערות מחוץ ל-JSON. דאג שהמספרים יראו כמו ₪X,XXX.
`;

        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();
        const cleanJson = textResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();

        const jsonRes = JSON.parse(cleanJson);
        return NextResponse.json(jsonRes);

    } catch (error) {
        console.error('Time Machine Error:', error);
        return NextResponse.json({ error: 'Failed to generate simulation' }, { status: 500 });
    }
}
