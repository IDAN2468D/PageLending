import Link from "next/link";
import { CheckCircle, ArrowLeft, ShieldCheck, Zap, Award, Sparkles, TrendingUp, Gem } from "lucide-react";

export const metadata = {
    title: "חבילות ייעוץ | FinSmart",
    description: "בחרו את מסלול הליווי הפיננסי שמתאים בדיוק עבורכם.",
};

const plans = [
    {
        name: "מסלול ESSENTIAL",
        price: "₪1,450",
        period: "חד פעמי",
        desc: "אבחון ומיפוי כלכלי מקיף לבניית היסודות.",
        features: [
            "שיחת אבחון עומק (75 דקות)",
            "מיפוי הכנסות והוצאות מלא",
            "דוח המלצות מותאם אישית",
            "צ'קליסט פעולה ל-30 יום"
        ],
        icon: <ShieldCheck className="w-10 h-10 text-slate-400" />,
        cta: "התחילו עכשיו",
        popular: false,
        theme: "light"
    },
    {
        name: "מסלול ELITE",
        price: "₪850",
        period: "לחודש (3 חודשים)",
        desc: "ליווי אישי צמוד לשינוי הרגלים ויצירת הון.",
        features: [
            "פגישה חודשית פנים מול פנים",
            "זמינות מנטור בוואטסאפ",
            "בניית תיק השקעות",
            "טיפול מלא בהחזרי מס",
            "אופטימיזציה פנסיונית"
        ],
        icon: <Gem className="w-10 h-10 text-[#d4af37]" />,
        cta: "הצטרפו לנבחרת",
        popular: true,
        theme: "gold"
    },
    {
        name: "מסלול VIP WEALTH",
        price: "₪1,200",
        period: "לחודש (שנתי)",
        desc: "ניהול עושר משפחתי מלא במעטפת 360 מעלות.",
        features: [
            "זמינות סרביס מלאה 24/7",
            "תכנון מס שנתי מתקדם",
            "ניהול נכסי נדל\"ן והשקעות",
            "ליווי פיננסי בכל החלטה",
            "העברה בין-דורית של הון"
        ],
        icon: <Sparkles className="w-10 h-10 text-blue-500" />,
        cta: "תיאום פגישת VIP",
        popular: false,
        theme: "dark"
    }
];

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden mesh-gradient">
            {/* Header */}
            <header className="pt-40 pb-20 px-8 text-center relative z-10">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-xs font-black uppercase tracking-[0.3em]">
                        PRICING PLANS
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-[#0c1c44] dark:text-white leading-tight tracking-tighter">
                        השקעה בעתיד <br />
                        <span className="text-[#d4af37]">שמתחילה היום.</span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
                        אנחנו לא מוכרים חבילות, אנחנו בונים מסלולי הצלחה. בחרו את המסלול שמדויק לשלב הכלכלי בו אתם נמצאים.
                    </p>
                </div>
            </header>

            {/* Pricing Grid */}
            <main className="max-w-7xl mx-auto px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`relative premium-glass rounded-[4rem] p-12 flex flex-col transition-all duration-700 hover:-translate-y-4 shadow-2xl border-white/20 dark:border-white/5 ${plan.popular ? 'border-[#d4af37] ring-2 ring-[#d4af37]/20 scale-105 z-20' : ''
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0c1c44] text-[10px] font-black px-8 py-2 rounded-full uppercase tracking-widest shadow-xl glow-gold">
                                    MOST ADVANCED
                                </div>
                            )}

                            <div className="mb-10 text-right">
                                <div className="p-4 w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-8 shadow-sm">
                                    {plan.icon}
                                </div>
                                <h3 className="text-3xl font-black text-[#0c1c44] dark:text-white mb-3 tracking-tight">{plan.name}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{plan.desc}</p>
                            </div>

                            <div className="mb-12 text-right">
                                <div className="flex items-baseline gap-2 justify-end">
                                    <span className="text-6xl font-black text-[#0c1c44] dark:text-white">{plan.price}</span>
                                    <span className="text-slate-400 text-sm font-bold">{plan.period}</span>
                                </div>
                            </div>

                            <div className="space-y-6 mb-12 flex-grow text-right">
                                {plan.features.map((feat, j) => (
                                    <div key={j} className="flex items-center gap-4 justify-end">
                                        <span className="text-slate-600 dark:text-slate-400 font-bold text-sm tracking-tight">{feat}</span>
                                        <div className="w-6 h-6 rounded-full bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                                            <CheckCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/#contact"
                                className={`btn-gold !py-6 text-xl ${plan.popular ? '' : 'bg-slate-900 !text-white dark:bg-slate-800 dark:!text-white'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-32 text-center premium-glass p-12 rounded-[3.5rem] max-w-4xl mx-auto border-dashed">
                    <p className="text-2xl font-black text-[#0c1c44] dark:text-white mb-6">לא מצאתם את מה שחיפשתם?</p>
                    <p className="text-slate-500 mb-8 font-medium">אנחנו יודעים לתפור פתרונות אישיים למקרים מורכבים במיוחד. דברו איתנו.</p>
                    <Link href="/#contact" className="inline-flex items-center gap-4 text-[#d4af37] font-black group text-lg">
                        <ArrowLeft className="w-6 h-6 rtl-flip group-hover:-translate-x-2 transition-transform" />
                        תיאום שיחת ייעוץ אישית ללא התחייבות
                    </Link>
                </div>
            </main>

            <footer className="py-20 px-8 opacity-50">
                <p className="text-center text-slate-400 text-xs font-black uppercase tracking-widest">© FINSMART ELITE GROUP. ALL PLANS ARE SUBJECT TO TERMS AND CONDITIONS.</p>
            </footer>
        </div>
    );
}
