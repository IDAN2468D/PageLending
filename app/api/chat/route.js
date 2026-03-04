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
        const { messages } = body; // Array of { role: 'user' | 'model', parts: [{ text: '...' }] }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const systemInstruction = `
אתה "בוט פרימיום" של חברת FinSmart, חברה לייעוץ פיננסי מקצועי, ניהול תקציב והשקעות בישראל.
תפקידך: לענות לשאלות פיננסיות קצרות, להיות מקצועי, אמפתי ומכירתי בצורה אלגנטית.
כלל ברזל 1: התשובות שלך חייבות להיות קצרות מאוד (עד 2-3 משפטים). הלקוחות קוראים בחלון צ'אט קטן.
כלל ברזל 2: תמיד תנסה לכוון את הלקוח להשאיר פרטים או לתאם פגישה (לדוגמה: "אשמח שנעמיק בזה בפגישה, תרצה להשאיר מספר?").
כלל ברזל 3: אל תיתן ייעוץ השקעות פרטני ספציפי (זה לא חוקי בלי רישיון), אלא כוון לבניית אסטרטגיה אישית.
כלל ברזל 4: דבר בלשון זכר/נקבה קריא, או ברבים ("אנחנו נשמח לעזור לך...").
`;

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: "System prompt: " + systemInstruction }] },
                { role: "model", parts: [{ text: "הבנתי. אענה כנציג FinSmart בצורה קצרה, מקצועית ומכוונת פגישה." }] },
                ...messages.slice(0, -1) // All past history
            ],
            generationConfig: {
                maxOutputTokens: 150,
                temperature: 0.7,
            }
        });

        const latestMessage = messages[messages.length - 1].parts[0].text;
        const result = await chat.sendMessage(latestMessage);
        const textResponse = result.response.text();

        return NextResponse.json({ text: textResponse });

    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ error: 'Failed to generate chat response' }, { status: 500 });
    }
}
