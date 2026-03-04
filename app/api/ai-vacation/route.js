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
        const { destination, cost, months } = body;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
אתה יועץ פיננסי שיווקי עבור חברת "FinSmart".
הלקוח חולם לטוס לסטטוס / יעד: "${destination}", שעלותו המוערכת היא ₪${cost}, והוא רוצה לטוס בעוד ${months} חודשים.

עליך לבנות לו "תוכנית קיצוצים" ריאלית ומרגשת שמראה לו איך במיקוד קטן הוא חוסך את הסכום הזה, במטרה לשבות את ליבו שיבוא לייעוץ גדול יותר איתנו.
החזר *אך ורק* JSON במבנה הבא (בלי markdown מסביב):
{
  "monthly_saving": "הסכום שהוא צריך לשים בצד כל חודש (מספר)",
  "sacrifice_1": "דבר אחד קטן שאפשר לוותר עליו ביומיום (למשל '2 מנות מוולט')",
  "sacrifice_2": "דבר שני שאפשר לצמצם בקלות",
  "punchline": "משפט סיום מכירתי עוצמתי שקורא לו לתאם פגישה עם FinSmart כדי לתכנן לא רק טיול, אלא חירות כלכלית."
}
`;

        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();
        const cleanJson = textResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();

        const jsonRes = JSON.parse(cleanJson);
        return NextResponse.json(jsonRes);

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
