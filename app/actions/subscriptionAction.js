"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function analyzeSubscriptions(expensesText) {
    if (!expensesText || expensesText.trim().length === 0) {
        return { error: "אנא הזן את פירוט ההוצאות שלך." };
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.warn("Gemini API key is missing. Using mocked response.");
            return mockResponse(expensesText);
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
אתה יועץ כלכלי חסר רחמים שמתמחה ב"ציד מנויים" והוצאות כפולות או מיותרות.
הלקוח סיפק את רשימת ההוצאות החודשיות הבאה:
"${expensesText}"

התפקיד שלך הוא:
1. לזהות מנויים כפולים או הוצאות מיותרות שדורשות ביטול מידי.
2. לחשב בשקלים ממוצע את ההוצאה המיותרת החודשית.
3. לחשב כמה המנויים האלו יעלו לו בעשור הקרוב (10 שנים), עם ריבית דריבית מציאותית של 7% הפסד אלטרנטיבי בממוצע.
4. לכתוב תבנית אימייל אסרטיבית מנוסחת היטב בעברית לביטול המנויים האלו מול החברות.

החזר את התשובה *אך ורק* במבנה JSON הבא (ללא תגיות markdown מסביב וללא קוד בלוק):
{
  "wasteful_items": [
    "שם ההוצאה והסיבה (למשל: 'נטפליקס - מיותר כשיש דיסני+')"
  ],
  "monthly_waste": "סכום הבזבוז החודשי (מספר בשקלים)",
  "ten_year_drain": "הסכום שהלקוח יפסיד בעשור הקרוב עם אובדן ריבית (מספר)",
  "cancellation_email": "תבנית המייל הקרה לביטול (עם מקומות להשלמת פרטים)"
}
`;

        const result = await model.generateContent(prompt);
        const textResponse = result.response.text();
        const cleanJson = textResponse.replace(/^```[a-z]*\s*/i, '').replace(/\s*```$/, '').trim();

        const jsonRes = JSON.parse(cleanJson);
        return { success: true, data: jsonRes };

    } catch (error) {
        console.error("AiSubscriptionKiller API Error:", error);
        return mockResponse(expensesText);
    }
}

function mockResponse(expensesText) {
    // Fallback Mock Logic as requested
    return {
        success: true,
        data: {
            wasteful_items: [
                "זיהינו מנויים מרובים למשלוחים או מוזיקה שכדאי לאחד.",
                "חדר כושר - האם אתה באמת הולך כל שבוע?"
            ],
            monthly_waste: "250",
            ten_year_drain: "43,000",
            cancellation_email: `שלום רב,
אבקש לבטל באופן מיידי את המנוי שלי בחברתכם.
שם: [הכנס שם]
ת.ז: [הכנס ת.ז]
נא לשלוח אישור ביטול במייל חוזר.
תודה.`
        }
    };
}
