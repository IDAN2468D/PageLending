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
        const { text } = body;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
הלקוח פנה לאתר שלנו בהודעה והוא פורק את הצרות הפיננסיות שלו. הטקסט: "${text}".
נתח את מה שהוא אמר, והחזר JSON במבנה הבא בלבד:
{
  "empathy_msg": "משפט אחד קצר של אמפתיה והבנה בגובה העיניים",
  "task_1": "משימה אופרטיבית ראשונה שחייב לעשות כעת כדי לעצור את הדימום הכלכלי",
  "task_2": "משימה שנייה להמשך הייצוב",
  "action_call": "משפט שמניע לפגישת ייעוץ איתנו."
}
`;

        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();
        const cleanJson = textResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();

        const jsonRes = JSON.parse(cleanJson);
        return NextResponse.json(jsonRes);

    } catch (error) {
        console.error('Voice Budget API Error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
