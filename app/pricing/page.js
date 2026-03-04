import Link from "next/link";
import { CheckCircle, ArrowLeft, ShieldCheck, Zap, Award } from "lucide-react";

export const metadata = {
    title: "חבילות ייעוץ | PageLending",
    description: "בחרו את מסלול הליווי הפיננסי שמתאים בדיוק עבורכם.",
};

const plans = [
    {
        name: "בסיסי",
        price: "₪1,450",
        period: "חד פעמי",
        desc: "אבחון ומיפוי כלכלי ראשוני להתחלת הדרך.",
        features: ["שיחת אבחון מעמיקה (60 דקות)", "דוח מיפוי הכנסות והוצאות", "המלצות ראשוניות לחיסכון", "צ'קליסט ליציאה לדרך"],
        icon: <ShieldCheck className="w-8 h-8 text-slate-400" />,
        cta: "הזמן עכשיו",
        popular: false
    },
    {
        name: "פרימיום",
        price: "₪850",
        period: "לחודש (3 חודשים)",
        desc: "ליווי צמוד לשינוי הרגלים והשגת יעדים.",
        features: ["פגישה חודשית פנים מול פנים", "מעקב שבועי בוואטסאפ", "בניית תיק השקעות", "טיפול מלא בהחזרי מס", "תכנון פנסיוני מקיף"],
        icon: <Award className="w-8 h-8 text-[#d4af37]" />,
        cta: "התחל ליווי",
        popular: true
    },
    {
        name: "VIP",
        price: "₪1,200",
        period: "לחודש (שנתי)",
        desc: "ניהול עושר משפחתי מלא ומעטפת פיננסית אישית.",
        features: ["זמינות 24/7", "פגישות רבעוניות לתכנון מס", "ניהול נכסי נדל\"ן", "תכנון פרישה מתקדם", "ליווי בקניית נכסים"],
        icon: <Zap className="w-8 h-8 text-blue-500" />,
        cta: "צור קשר לפרטים",
        popular: false
    }
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Header */}
            <div className="bg-[#0c1c44] pt-32 pb-20 px-6 text-center text-white">
                <h1 className="text-5xl font-black mb-6">חבילות <span className="text-[#d4af37]">ליווי</span></h1>
                <p className="text-white/60 text-xl max-w-2xl mx-auto">
                    ההשקעה הטובה ביותר שתוכלו לעשות היא בעתיד הכלכלי שלכם. בחרו את המסלול הנכון לכם.
                </p>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`relative bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl border-2 transition-all hover:-translate-y-2 ${plan.popular ? 'border-[#d4af37]' : 'border-transparent'}`}
                        >
                            {plan.popular && (
                                <span className="absolute -top-4 right-1/2 translate-x-1/2 bg-[#d4af37] text-[#0c1c44] text-xs font-black px-4 py-1.5 rounded-full uppercase">
                                    הנבחר ביותר
                                </span>
                            )}

                            <div className="mb-8">
                                <div className="mb-4">{plan.icon}</div>
                                <h3 className="text-2xl font-black text-[#0c1c44] dark:text-white">{plan.name}</h3>
                                <p className="text-slate-500 text-sm mt-2">{plan.desc}</p>
                            </div>

                            <div className="mb-8">
                                <span className="text-5xl font-black text-[#0c1c44] dark:text-white">{plan.price}</span>
                                <span className="text-slate-400 text-sm mr-2">{plan.period}</span>
                            </div>

                            <div className="space-y-4 mb-10">
                                {plan.features.map((feat, j) => (
                                    <div key={j} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-400 font-medium">{feat}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/#contact"
                                className={`w-full py-4 rounded-xl font-black text-center block transition-all ${plan.popular ? 'bg-[#d4af37] text-[#0c1c44] hover:bg-[#c29f30]' : 'bg-slate-100 dark:bg-slate-800 text-[#0c1c44] dark:text-white hover:bg-slate-200'}`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-slate-500 mb-6">לא בטוחים מה מתאים לכם? נשמח לעזור.</p>
                    <Link href="/#contact" className="inline-flex items-center gap-2 text-[#0c1c44] dark:text-[#d4af37] font-black hover:underline">
                        תיאום שיחת ייעוץ חינם
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
