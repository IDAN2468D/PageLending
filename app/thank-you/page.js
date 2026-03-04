import Link from "next/link";
import { CheckCircle, ArrowLeft, Calendar, Phone } from "lucide-react";

export const metadata = {
    title: "תודה! | FinSmart",
    description: "תודה שפניתם אלינו. נחזור אליכם בהקדם!",
};

export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0c1c44]/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Logo */}
                <Link href="/" className="inline-block text-3xl font-black text-[#0c1c44] tracking-tight">
                    Fin<span className="text-[#d4af37]">Smart</span>
                </Link>

                {/* Success icon */}
                <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping" />
                    <div className="relative w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-16 h-16 text-emerald-500" />
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-4">
                    <h1 className="text-5xl font-black text-[#0c1c44]">קיבלנו!</h1>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                        תודה על פנייתכם. אחד מהיועצים שלנו יצור איתכם קשר תוך <strong className="text-[#0c1c44]">24 שעות</strong> לתיאום שיחת הייעוץ הראשונית.
                    </p>
                </div>

                {/* What's next */}
                <div className="bg-white rounded-3xl p-8 shadow-xl text-right space-y-4">
                    <h2 className="text-2xl font-black text-[#0c1c44] text-center">מה קורה עכשיו?</h2>
                    <div className="space-y-4">
                        {[
                            { icon: <Phone className="w-5 h-5 text-[#d4af37]" />, text: "נתקשר אליכם לתיאום שיחת אבחון קצרה (15-20 דקות)" },
                            { icon: <Calendar className="w-5 h-5 text-[#d4af37]" />, text: "נקבע פגישת ייעוץ ראשונית נוחה לכם — פנים מול פנים או בזום" },
                            { icon: <CheckCircle className="w-5 h-5 text-[#d4af37]" />, text: "נבנה יחד תוכנית פיננסית מותאמת אישית לצרכים שלכם" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                                <div className="w-10 h-10 bg-[#d4af37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    {item.icon}
                                </div>
                                <p className="text-slate-600 font-medium leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Back button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[#0c1c44] font-bold hover:text-[#d4af37] transition-colors text-lg"
                >
                    <ArrowLeft className="w-5 h-5" />
                    חזרה לדף הבית
                </Link>
            </div>
        </div>
    );
}
