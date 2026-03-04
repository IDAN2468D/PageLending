"use client";
import { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const accept = () => {
        localStorage.setItem("cookie-consent", "true");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[110] animate-fade-in">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#d4af37]" />

                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-black text-[#0c1c44] dark:text-white">פרטיות ועוגיות</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            אנחנו משתמשים בעוגיות כדי להבטיח שתקבלו את החוויה הטובה ביותר באתר שלנו. המשך הגלישה מהווה הסכמה לכך.
                        </p>
                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={accept}
                                className="flex-1 py-2.5 bg-[#d4af37] text-[#0c1c44] font-bold rounded-xl hover:bg-[#c29f30] transition-colors text-sm"
                            >
                                אני מסכים
                            </button>
                            <button
                                onClick={() => setVisible(false)}
                                className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
                            >
                                סגור
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
