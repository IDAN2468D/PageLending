import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req) {
    const fallbackData = {
        compromise: "ההמלצה שלנו: הקצאת תקציב קבוע לפינוקים מבלי לפגוע ביעדי החיסכון ארוכי הטווח שלכם.",
        savingsGoal: "תקציב משותף שיאזן בין ההווה לעתיד.",
        actionItems: [
            "קביעת פגישה משותפת חודשית (דייט פיננסי) למעבר על התקציב.",
            "הזדהות עם היעדים של כל אחד מבני הזוג ויצירת 'קופת חלומות'.",
            "חלוקת החשבונות בצורה פרופורציונאלית להכנסות."
        ]
    };

    if (!genAI) {
        return NextResponse.json({ success: true, data: fallbackData });
    }

    try {
        const body = await req.json();
        const { partner1, partner2 } = body;

        const prompt = `
אתה פסיכולוג פיננסי ויועץ זוגי.
בן זוג 1 מתאר את עצמו בקצרה: "${partner1}"
בן זוג 2 מתאר את עצמו בקצרה: "${partner2}" 
הם חלוקים על התנהלות כלכלית.

החזר JSON בלבד:
{
  "compromise": "פסקת גישור אוהדת שמוצאת את העמק השווה ביניהם",
  "savingsGoal": "קונספט יעד משותף חדש שמחבר אותם",
  "actionItems": [
     "צעד 1 לביצוע",
     "צעד 2 לביצוע",
     "צעד 3 לביצוע"
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
