"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function balanceFreelance(incomeText) {
    if (!incomeText) return { error: "חסרים נתוני הכנסות." };
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return mockResponse();

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `
אתה יועץ פיננסי לעצמאיים. העצמאי הזין את נתוני ההכנסות שלו מחצי השנה האחרונה: "${incomeText}".
המטרה היא לעזור לו לייצב את העסק ולהתנהל כ"שכיר של עצמו".
נתח את התנודתיות, קבע לו "משכורת" חודשית יציבה ובטוחה שעליו למשוך ברזל, וחשב כמה כסף הוא צריך להשאיר ככרית ביטחון בחשבון העסקי.
החזר JSON (ללא markdown):
{
  "safe_salary": "המשכורת הקבועה למשיכה בכל ה-1 לחודש (מספר)",
  "safety_cushion": "כרית המבטח שחובה להשאיר קבוע (מספר)",
  "volatility_score": "ציון תנודתיות מההכנסות מ-1 עד 10",
  "rules": ["כלל 1", "כלל 2", "כלל 3"]
}
`;
        const result = await model.generateContent(prompt);
        const cleanJson = result.response.text().replace(/^```[a-z]*\s*/i, '').replace(/\s*```$/, '').trim();
        return { success: true, data: JSON.parse(cleanJson) };
    } catch (e) {
        return mockResponse();
    }
}

function mockResponse() {
    return {
        success: true,
        data: {
            safe_salary: "8,500",
            safety_cushion: "25,000",
            volatility_score: "7",
            rules: [
                "מעבר של כל ההכנסות לחשבון עסקי בלבד",
                "הגדרת הוראת קבע ב-1 לחודש של המשכורת הבטוחה לעובר ושב",
                "שמירת המע\"מ ומס הכנסה בפקדון מטרה נפרד אוטומטית"
            ]
        }
    }
}
