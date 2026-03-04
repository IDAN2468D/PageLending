import Link from "next/link";
import { ArrowLeft, LinkedIn, Mail, Phone, MapPin, Award, CheckCircle, ShieldCheck, Users, Briefcase } from "lucide-react";

export const metadata = {
    title: "אודות היועץ | FinSmart",
    description: "הכירו את הצוות שמאחורי FinSmart — הניסיון והחזון שלנו.",
};

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden mesh-gradient">
            {/* Hero Section */}
            <header className="relative pt-40 pb-20 md:pt-64 md:pb-40 px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10 text-center lg:text-right relative z-10">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/50 dark:bg-white/10 premium-glass border-white/40 text-sm font-black text-[#d4af37] tracking-widest uppercase md:mx-0 mx-auto">
                            <ShieldCheck className="w-5 h-5 rtl-flip" />
                            המקצוענים שמאחורי הכסף שלכם
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-[#0c1c44] dark:text-white leading-[1] tracking-tighter">
                            מצוינות פיננסית <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f0cc60] drop-shadow-2xl">עם פנים אנושיות.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            נעים להכיר, אני חיים כהן. מעל 15 שנה שאני מלווה משפחות ועסקים לבניית אימפריה כלכלית יציבה, שקופה ומנצחת.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 justify-center lg:justify-start">
                            <Link href="/#contact" className="btn-gold text-lg w-full sm:w-auto px-12">
                                קבעו שיחת הכרות
                                <ArrowLeft className="w-6 h-6 rtl-flip" />
                            </Link>
                        </div>
                    </div>

                    <div className="relative group hidden lg:block">
                        <div className="relative z-10 animate-float">
                            <div className="premium-glass p-2 rounded-[3.5rem] overflow-hidden -rotate-2 group-hover:rotate-0 transition-all duration-1000 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1974"
                                    alt="Chaim Cohen - Financial Specialist"
                                    className="rounded-[3rem] w-full aspect-square object-cover"
                                />
                            </div>

                            <div className="absolute -bottom-10 -right-10 premium-glass p-8 rounded-3xl z-20 shadow-2xl glow-gold border-white/50 text-right">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#f0cc60] flex items-center justify-center shadow-lg">
                                        <Award className="w-8 h-8 text-[#0c1c44]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">שנות ניסיון במקצוע</p>
                                        <p className="text-3xl font-black text-[#0c1c44] dark:text-white">15+</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#d4af37]/5 rounded-full blur-[120px] -z-10" />
                    </div>
                </div>
            </header>

            {/* Content Section */}
            <section className="py-32 px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                        <div className="lg:col-span-2 space-y-16 text-right">
                            <div className="space-y-6">
                                <h2 className="text-4xl md:text-5xl font-black text-[#0c1c44] dark:text-white">החזון והאמנה שלי</h2>
                                <div className="w-20 h-1.5 bg-[#d4af37] rounded-full" />
                                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    האמונה שלי פשוטה: חופש כלכלי הוא לא מילה גסה, הוא זכות בסיסית של כל משפחה בישראל שעובדת קשה.&rlm; הגישה שלי משלבת בין ניתוח מספרים קר לבין הבנה עמוקה של הצרכים האנושיים שלכם. אני כאן כדי להפוך את המורכבות הפיננסית לשקט נפשי.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                                {[
                                    { t: "יושרה ללא פשרות", d: "אנחנו תמיד לצדכם, ללא אינטרסים זרים." },
                                    { t: "חדשנות טכנולוגית", d: "שימוש בכלים המתקדמים ביותר בשוק לניהול כסף." },
                                    { t: "ליווי הוליסטי", d: "אנחנו רואים את כל התמונה—מנדל\"ן ועד פנסיה." },
                                    { t: "תוצאות מוכחות", d: "אלפי משפחות שכבר הגיעו ליציבות וצמיחה." }
                                ].map((item, i) => (
                                    <div key={i} className="premium-glass p-10 rounded-[2.5rem] border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform">
                                        <h4 className="text-2xl font-black text-[#0c1c44] dark:text-white mb-4">{item.t}</h4>
                                        <p className="text-slate-500 font-medium">{item.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="premium-glass p-12 rounded-[3.5rem] sticky top-32 space-y-10 border-slate-200 dark:border-slate-800 shadow-2xl">
                                <h3 className="text-3xl font-black text-[#0c1c44] dark:text-white text-right">צרו קשר ישיר</h3>
                                <div className="space-y-8">
                                    {[
                                        { i: Phone, t: "טלפון אישי", v: "050-1234567" },
                                        { i: Mail, t: "אימייל", v: "chaim@finsmart.io" },
                                        { i: MapPin, t: "משרדים", v: "תל אביב / זום" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-6 group justify-end">
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.t}</p>
                                                <p className="text-xl font-black text-[#0c1c44] dark:text-white">{item.v}</p>
                                            </div>
                                            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center text-[#d4af37]">
                                                <item.i className="w-7 h-7 rtl-flip" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-10 border-t border-slate-100 dark:border-slate-800">
                                    <Link href="/#contact" className="btn-gold w-full text-lg">
                                        הזמן פגישה עכשיו
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-20 px-8 border-t border-slate-200 dark:border-slate-800/50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-2">
                        <span className="text-3xl font-black text-[#0c1c44] dark:text-white tracking-tighter">
                            Fin<span className="text-[#d4af37]">Smart</span>
                        </span>
                    </div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">© {new Date().getFullYear()} FINSMART GLOBAL. ELITE ADVISORY.</p>
                </div>
            </footer>
        </div>
    );
}
