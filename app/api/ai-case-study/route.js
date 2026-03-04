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
        const { personaName, personaDesc } = body;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
אתה קופירייטר שיווקי של "FinSmart" שמספק ייעוץ פיננסי.
הלקוח שפנה כרגע מזדהה בתור: "${personaName}" (${personaDesc}).

צור מיד "מקרה בוחן" (Case Study) פיקטיבי אבל ריאליסטי מאוד, המתאר לקוח עבר של FinSmart שהיה בדיוק באותו מצב. 
ההצלחה צריכה להיות הגיונית (למשל סגירת חובות תוך 3 שנים, או קניית דירה, או פרישה מוקדמת).

החזר את התשובה *אך ורק* כ-JSON במבנה הבא (בלי מארקדאון):
{
  "client_name": "שם בדוי כמו 'דנה כהן' או 'גיא ויעל'",
  "before_situation": "משפט אחד לתאר את המצב המלחיץ/תקוע לפני הפנייה ל-FinSmart",
  "action_taken": "משפט אחד על אסטרטגיה כלכלית שהפעלנו",
  "after_situation": "התוצאה (משפט אחד מעורר השראה)"
}
`;

        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();
        const cleanJson = textResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();

        const jsonRes = JSON.parse(cleanJson);
        return NextResponse.json(jsonRes);

    } catch (error) {
        console.error('Case Study API Error:', error);
        return NextResponse.json({ error: 'Failed to generate case study' }, { status: 500 });
    }
}
