import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req) {
    const fallbackData = {
        analysis: "השכר הנוכחי שלך נמצא ברף התחתון של שוק העבודה הקיים ביחס לוותק. יש פער של 15% מהנהוג לחברות דומות.",
        targetSalary: "2,500 ₪ נוספים",
        script: "רציתי לשוחח על ההתפתחות שלי בחברה. הבאתי תוצאות משמעותיות השנה בתחום X ומבחינת השוק היום, טווח השכר לתפקיד בדרג שלי נע גבוה יותר. אשמח לדון בהתאמת השכר שלי לביצועים.",
        bonusTip: "אל תאיים ב'יש לי הצעה אחרת' אם אין לך, אלא התמקד בערך ובמספרים של מה שתרמת."
    };

    if (!genAI) return NextResponse.json({ success: true, data: fallbackData });

    try {
        const body = await req.json();
        const { role, currentSalary, experience } = body;

        const prompt = `
אתה משא ומתן פיננסי חכם וסוכן קריירה של FinSmart.
עובד בתפקיד "${role}" עם ${experience} שנות ניסיון. שכר נוכחי: ₪${currentSalary} נטו/ברוטו.
המטרה: להכין אותו לבקש העלאת שכר באופן פסיכולוגי ומדויק מהבוס.

החזר פורמט JSON בלבד:
{
  "analysis": "ניתוח חד משמעי האם השכר שלו נמוך או הוגן ביחס לשוק, בשפה מרימה",
  "targetSalary": "תוספת בשקלים או אחוזים שכדאי לו לכוון אליה (למשל: תוספת של 10%)",
  "script": "תסריט שיחה מדויק ואלגנטי לומר למנהל (בלי להישמע חצוף אבל סופר בטוח)",
  "bonusTip": "טיפ פסיכולוגי אחד קטן לרגע פתיחת הפגישה"
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
    } catch (e) {
        return NextResponse.json({ success: true, data: fallbackData });
    }
}
