import Link from "next/link";
import { ArrowLeft, Clock, TrendingUp, BookOpen } from "lucide-react";

const posts = [
    {
        slug: "10-mistakes-families-make",
        title: "10 טעויות כספיות שכל משפחה עושה (ואיך להימנע מהן)",
        excerpt: "רוב המשפחות בישראל חוזרות על אותן טעויות שעולות להן אלפי שקלים בשנה. הנה כיצד לזהות אותן ולתקן אותן.",
        readTime: "5 דקות",
        category: "ניהול תקציב",
        icon: <TrendingUp className="w-5 h-5" />,
    },
    {
        slug: "pension-guide-employees",
        title: "מדריך פנסיה מלא לשכיר: כל מה שצריך לדעת",
        excerpt: "הפנסיה שלכם מושפעת ממאות החלטות קטנות. מדריך זה יעזור לכם לקבל את ההחלטות הנכונות בזמן הנכון.",
        readTime: "8 דקות",
        category: "פנסיה",
        icon: <BookOpen className="w-5 h-5" />,
    },
    {
        slug: "tax-refund-guide",
        title: "איך לקבל את העודף ממס הכנסה: מדריך שלב אחר שלב",
        excerpt: "9 מתוך 10 שכירים זכאים להחזר מס אך לא יודעים על כך. למדו כיצד לתבוע את הכסף שמגיע לכם.",
        readTime: "6 דקות",
        category: "מיסוי",
        icon: <TrendingUp className="w-5 h-5" />,
    },
];

export const metadata = {
    title: "בלוג פיננסי | FinSmart",
    description: "מאמרים, טיפים ומדריכים מקצועיים לניהול כסף חכם ממוחות הכלכלה של FinSmart.",
};

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-[#0c1c44] pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c1c44] to-[#1e3a8a]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-[100px]" />
                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37]/20 text-[#d4af37] font-bold rounded-full text-sm">
                        <BookOpen className="w-4 h-4" />
                        ידע פיננסי מקצועי
                    </span>
                    <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
                        בלוג <span className="text-[#d4af37]">FinSmart</span>
                    </h1>
                    <p className="text-white/70 text-xl font-medium max-w-2xl mx-auto">
                        מאמרים, טיפים ומדריכים מקצועיים שיעזרו לכם לנהל את הכסף שלכם בחכמה
                    </p>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="max-w-5xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article
                            key={post.slug}
                            className="bg-white rounded-3xl shadow-lg overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                        >
                            {/* Colored top bar */}
                            <div className="h-2 bg-gradient-to-r from-[#0c1c44] to-[#1e3a8a]" />

                            <div className="p-8 space-y-5">
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#d4af37]/10 text-[#8b6d13] text-xs font-bold rounded-full">
                                        {post.icon}
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-slate-400 text-xs font-medium mr-auto">
                                        <Clock className="w-3 h-3" />
                                        {post.readTime} קריאה
                                    </span>
                                </div>

                                <h2 className="text-xl font-black text-[#0c1c44] leading-snug group-hover:text-[#d4af37] transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                    {post.excerpt}
                                </p>

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-flex items-center gap-2 text-[#0c1c44] font-bold hover:text-[#d4af37] transition-colors text-sm"
                                >
                                    קרא עוד
                                    <ArrowLeft className="w-4 h-4" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[#0c1c44] font-bold hover:text-[#d4af37] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        חזרה לדף הבית
                    </Link>
                </div>
            </div>
        </div>
    );
}
