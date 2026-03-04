"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function analyzeDebts(debtsText) {
    if (!debtsText || debtsText.trim().length === 0) return { error: "אנא הזן את פירוט החובות שלך." };
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return mockResponse(debtsText);

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `
אתה מומחה פיננסי לאיחוד הלוואות ב-FinSmart.
הלקוח הזין את החובות הבאים שלו: "${debtsText}".
תפקידך להעריך (בהנחה שמרנית) את ההחזר החודשי הנוכחי שלו מכל אלה, ולהציע איחוד להלוואה אחת בתנאים נוחים יותר דרך FinSmart.
החזר רק JSON במבנה הבא (ללא תגיות):
{
  "current_monthly_payment": "ההחזר הנוכחי המשוער (מספר בשקלים)",
  "new_monthly_payment": "ההחזר לאחר איחוד הלוואות (מספר בשקלים, נמוך משמעותית)",
  "monthly_savings": "החיסכון החודשי (מספר בשקלים)",
  "action_plan": [
    "סעיפי פעולה קצרים וברורים"
  ],
  "message": "מסר מעודד שדוחף אותו ליצור קשר עם FinSmart"
}
`;
        const result = await model.generateContent(prompt);
        const cleanJson = result.response.text().replace(/^```[a-z]*\s*/i, '').replace(/\s*```$/, '').trim();
        return { success: true, data: JSON.parse(cleanJson) };
    } catch (e) {
        return mockResponse(debtsText);
    }
}

function mockResponse(debtsText) {
    return {
        success: true,
        data: {
            current_monthly_payment: "3,500",
            new_monthly_payment: "1,800",
            monthly_savings: "1,700",
            action_plan: ["איחוד כל המינוסים וההלוואות", "פריסה מחדש ל-60 תשלומים", "הפחתת הריבית הממוצעת משמעותית"],
            message: "אפשר לנשום לרווחה! נשמח לעזור לך לאחד את ההלוואות כבר מחר."
        }
    }
}
