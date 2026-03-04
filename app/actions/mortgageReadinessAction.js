"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function planMortgage(equity, income) {
    if (!equity || !income) return { error: "חסרים נתונים לחישוב." };
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return mockResponse();

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `
אתה יועץ משכנתאות של FinSmart שמכין לקוחות לקבלת אישור עקרוני למשכנתא בעוד שנתיים (24 חודשים).
ללקוח יש הון עצמי התחלתי של ${equity} ש"ח, ופנוי חודשי לחיסכון של ${income} ש"ח.
תחשב ותחזיר JSON עם הנתונים הבאים (ללא markdown):
{
  "projected_equity": "ההון העצמי שיהיה לו בעוד 24 חודשים (עם מעט תשואה סולידית 4% בשנה)",
  "max_property_value": "שווי נכס מקסימלי שהוא יוכל לקנות אז (בהנחת 25% הון עצמי מינימלי)",
  "monthly_milestones": ["חודש 1-6:...", "חודש 7-12:...", "שנה שניה: ..."],
  "advice": "שיטה/טיפ להתייעלות והגדלת החיסכון החודשי"
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
            projected_equity: "350,000",
            max_property_value: "1,400,000",
            monthly_milestones: [
                "חודשים 1-6: הגדלת החיסכון ב-10% נוספים על ידי קיצוץ קל בהוצאות",
                "חודשים 7-12: השקעת הכספים במספר אפיקים סולידיים",
                "שנה שניה: שמירה על אשראי נקי בבנק והכנת תלושי שכר"
            ],
            advice: "אל תחכו לרגע האחרון, שמרו על היסטוריית אשראי נקייה לחלוטין וללא חריגות עמלות."
        }
    }
}
