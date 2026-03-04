import Link from "next/link";
import { ArrowLeft, LinkedIn, Mail, Phone, MapPin, Award, CheckCircle } from "lucide-react";

export const metadata = {
    title: "אודות היועץ | PageLending",
    description: "הכירו את הצוות שמאחורי PageLending — הניסיון והחזון שלנו.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-6 bg-[#0c1c44] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c1c44] to-[#1e3a8a] opacity-90" />
                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <span className="inline-block px-4 py-1.5 bg-[#d4af37]/20 text-[#d4af37] text-sm font-bold rounded-full">נעים להכיר</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">חיים <span className="text-[#d4af37]">כהן</span></h1>
                        <p className="text-white/70 text-xl font-medium leading-relaxed">
                            מומחה לכלכלת המשפחה ומתכנן פיננסי בעל 15 שנות ניסיון. ליוויתי מעל 5,000 משפחות ליציאה מהמינוס ובניית הון עצמי.
                        </p>
                        <div className="flex gap-4">
                            <a href="#contact" className="px-8 py-4 bg-[#d4af37] text-[#0c1c44] font-black rounded-xl hover:scale-105 transition-transform">קבע שיחה אישית</a>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-slate-200 rounded-3xl overflow-hidden shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-700">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1974" alt="Chaim Cohen" className="object-cover w-full h-full" />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-[#d4af37] p-6 rounded-2xl shadow-xl flex items-center gap-4">
                            <Award className="w-10 h-10 text-[#0c1c44]" />
                            <div>
                                <p className="text-[#0c1c44] font-black text-2xl">15+</p>
                                <p className="text-[#0c1c44]/70 text-xs font-bold uppercase">שנות מצוינות</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-10">
                        <section className="space-y-6 text-right">
                            <h2 className="text-3xl font-black text-[#0c1c44] dark:text-white">החזון שלי</h2>
                            <div className="w-16 h-1 bg-[#d4af37] rounded-full" />
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                האמנה שלי פשוטה: כל משפחה בישראל יכולה לחיות ברווחה כלכלית אם היא רק תקבל את הכלים הנכונים. אני לא רק עובר על המספרים — אני עוזר לכם לשנות את הגישה לכסף, לנהל משא ומתן עם הבנקים, ולמקסם את הזכויות שלכם מול המדינה.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-3xl font-black text-[#0c1c44] dark:text-white text-right">תחומי התמחות</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "מינוף הון וניהול השקעות",
                                    "תכנון פרישה ומשכנתאות",
                                    "אופטימיזציה של מיסוי וביטוחים",
                                    "יציאה מחובות וניהול תזרים",
                                    "ליווי לעצמאיים ובעלי עסקים",
                                    "העברה בין-דורית של הון"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                                        <CheckCircle className="w-5 h-5 text-[#d4af37]" />
                                        <span className="font-bold text-[#0c1c44] dark:text-slate-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 space-y-6 sticky top-32 border border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-black text-[#0c1c44] dark:text-white">צרו קשר ישיר</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Phone className="w-5 h-5 text-[#d4af37]" />
                                    <span className="font-medium">050-1234567</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Mail className="w-5 h-5 text-[#d4af37]" />
                                    <span className="font-medium">chaim@pagelending.co.il</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <MapPin className="w-5 h-5 text-[#d4af37]" />
                                    <span className="font-medium">תל אביב / זום</span>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                                <Link href="/#contact" className="w-full py-4 bg-[#0c1c44] text-white font-black rounded-xl text-center block hover:bg-slate-800 transition-colors">
                                    הזמן פגישה עכשיו
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
