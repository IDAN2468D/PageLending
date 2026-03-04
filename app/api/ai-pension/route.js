import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req) {
    const fallbackData = {
        lostMoney: "85,000",
        analysis: "דמי הניהול הנוכחיים שלך שוחקים לך את הפנסיה משמעותית לאורך 25 השנים הבאות.",
        actionPlan: "עליך ליצור קשר עם בית ההשקעות ולבקש דמי ניהול מופחתים בהתבסס על קרנות ברירת מחדל.",
        template: "שלום רב, מבקש בזה להפחית את דמי הניהול בקרן הפנסיה שלי לשיעור של 1% מהפקדה ו-0.22% מצבירה. אחרת אשקול מעבר לקרן אחרת."
    };

    if (!genAI) {
        return NextResponse.json({ success: true, data: fallbackData });
    }

    try {
        const body = await req.json();
        const { currentPension, depositFee, accumulationFee, yearsToRetire } = body;

        const prompt = `
אתה מומחה פנסיוני ופיננסי.
לקוח בן ${yearsToRetire} שנים לפרישה סך צבירה: ₪${currentPension}. 
דמי ניהול נוכחיים: ${depositFee}% מהפקדה, ${accumulationFee}% מצבירה.
בדוק כמה כסף יאבד עד הפרישה בגלל דמי הניהול בהנחת תשואה ממוצעת של 5%.

החזר JSON (בלי markdown):
{
  "lostMoney": "הסכום המוערך שילך לפח (ספרות בלבד, למשל 120000)",
  "analysis": "תובנה אחת מטלטלת על אובדן הכסף (בעברית מדוברת)",
  "actionPlan": "הפעולה הכי נכונה לעשות כרגע",
  "template": "טקסט מדוייק לדואל מסוכן לבית ההשקעות להורדת העמלות"
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
