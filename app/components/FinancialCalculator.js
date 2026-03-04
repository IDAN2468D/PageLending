"use client";
import { useState, useMemo } from "react";
import { Calculator, TrendingUp, ArrowLeft } from "lucide-react";

export default function FinancialCalculator() {
    const [income, setIncome] = useState(18000);
    const [expenses, setExpenses] = useState(14000);

    const result = useMemo(() => {
        const current = Math.max(0, income - expenses);
        const optimized = Math.round(current * 1.35); // 35% improvement with advisory
        const annual = optimized * 12;
        const fiveYear = Math.round(annual * 5 * 1.08); // 8% avg return over 5 years
        return { current, optimized, annual, fiveYear };
    }, [income, expenses]);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c1c44]/3 to-transparent" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-[#0c1c44]">מחשבון חיסכון</h2>
                    <div className="w-20 h-1.5 bg-[#d4af37] mx-auto rounded-full" />
                    <p className="text-slate-500 font-medium max-w-xl mx-auto">
                        כמה כסף אתם יכולים לחסוך בעזרת ייעוץ מקצועי? הזינו את הנתונים שלכם:
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Inputs */}
                    <div className="glass-card p-8 space-y-8">
                        <h3 className="text-2xl font-black text-[#0c1c44] flex items-center gap-3">
                            <Calculator className="w-7 h-7 text-[#d4af37]" />
                            הנתונים שלי
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="font-bold text-[#0c1c44]">הכנסה חודשית נטו</label>
                                    <span className="font-black text-[#d4af37] text-xl">₪{income.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="5000"
                                    max="60000"
                                    step="500"
                                    value={income}
                                    onChange={(e) => setIncome(+e.target.value)}
                                    className="w-full h-3 rounded-full appearance-none cursor-pointer accent-[#d4af37]"
                                    style={{ direction: "ltr" }}
                                />
                                <div className="flex justify-between text-xs text-slate-400 mt-1">
                                    <span>₪5,000</span>
                                    <span>₪60,000</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="font-bold text-[#0c1c44]">הוצאות חודשיות</label>
                                    <span className="font-black text-[#d4af37] text-xl">₪{expenses.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="3000"
                                    max="55000"
                                    step="500"
                                    value={expenses}
                                    onChange={(e) => setExpenses(+e.target.value)}
                                    className="w-full h-3 rounded-full appearance-none cursor-pointer accent-[#d4af37]"
                                    style={{ direction: "ltr" }}
                                />
                                <div className="flex justify-between text-xs text-slate-400 mt-1">
                                    <span>₪3,000</span>
                                    <span>₪55,000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="space-y-6">
                        <div className="glass-card p-8 bg-[#0c1c44] border-0 text-white">
                            <p className="text-white/60 font-bold text-sm uppercase tracking-wider mb-2">חיסכון עכשיו</p>
                            <p className={`text-5xl font-black ${result.current <= 0 ? "text-red-400" : "text-white"}`}>
                                ₪{result.current.toLocaleString()}
                                <span className="text-xl font-medium text-white/50"> / חודש</span>
                            </p>
                            {result.current <= 0 && (
                                <p className="text-red-300 text-sm font-bold mt-2">⚠️ יש מינוס — זה בדיוק מה שאנחנו פותרים</p>
                            )}
                        </div>

                        <div className="glass-card p-8 border-2 border-[#d4af37]/40">
                            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mb-2">עם ייעוץ PageLending</p>
                            <p className="text-5xl font-black text-[#d4af37]">
                                ₪{result.optimized.toLocaleString()}
                                <span className="text-xl font-medium text-slate-400"> / חודש</span>
                            </p>
                            <p className="text-emerald-600 font-bold text-sm mt-2">+35% שיפור ממוצע בתזרים</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="glass-card p-6 text-center">
                                <p className="text-xs text-slate-400 font-bold uppercase mb-1">תוך שנה</p>
                                <p className="text-2xl font-black text-[#0c1c44]">₪{result.annual.toLocaleString()}</p>
                            </div>
                            <div className="glass-card p-6 text-center">
                                <p className="text-xs text-slate-400 font-bold uppercase mb-1">5 שנים + תשואה</p>
                                <p className="text-2xl font-black text-[#0c1c44]">₪{result.fiveYear.toLocaleString()}</p>
                            </div>
                        </div>

                        <a
                            href="#contact"
                            className="w-full py-5 bg-[#d4af37] text-[#0c1c44] font-black text-lg rounded-2xl hover:bg-[#c29f30] transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                            <TrendingUp className="w-5 h-5" />
                            רוצה להגיע לזה — קבע שיחה
                            <ArrowLeft className="w-5 h-5 rtl:scale-x-[-1]" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
