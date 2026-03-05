"use client";

import React, { useState } from "react";
import { Coffee, Pizza, Tv, Plane, Car, Home, Camera, Sparkles, ChevronLeft, Target } from "lucide-react";

export default function AiDreamFunder() {
    const [step, setStep] = useState(1);
    const [dreamTarget, setDreamTarget] = useState({ name: "חופשה במלדיביים", cost: 15000, icon: Plane });
    const [timeframeMonths, setTimeframeMonths] = useState(12);
    const [isCalculating, setIsCalculating] = useState(false);

    const predefinedDreams = [
        { name: "חופשה משפחתית", cost: 15000, icon: Plane },
        { name: "שדרוג רכב מקיף", cost: 40000, icon: Car },
        { name: "עיצוב בית מחדש", cost: 25000, icon: Home },
        { name: "מצלמה וציוד מקצועי", cost: 8000, icon: Camera }
    ];

    const calculateSacrifices = () => {
        setIsCalculating(true);
        setTimeout(() => {
            setStep(3);
            setIsCalculating(false);
        }, 2000);
    };

    const getMonthlySavings = () => Math.ceil(dreamTarget.cost / timeframeMonths);
    const getWeeklySavings = () => Math.ceil(getMonthlySavings() / 4.33);

    const weeklyTarget = getWeeklySavings();

    const getSacrificePlan = () => {
        let remaining = weeklyTarget;
        const plan = [];

        // Coffee - 15 NIS each
        if (remaining > 30) {
            const coffees = Math.min(Math.floor(remaining / 15), 5);
            plan.push({ icon: Coffee, title: "כוסות קפה בחוץ", count: coffees, savings: coffees * 15 });
            remaining -= coffees * 15;
        }

        // Takeout - 100 NIS each
        if (remaining > 50) {
            const takeouts = Math.min(Math.floor(remaining / 100), 2);
            if (takeouts > 0) {
                plan.push({ icon: Pizza, title: "הזמנות וולט מיותרות", count: takeouts, savings: takeouts * 100 });
                remaining -= takeouts * 100;
            }
        }

        // Subscriptions - 40 NIS / week approx (160/month)
        if (remaining > 20) {
            plan.push({ icon: Tv, title: "מנוי שלא בשימוש", count: 1, savings: 40 });
            remaining -= 40;
        }

        const unallocated = Math.max(0, remaining);

        return { plan, unallocated };
    };

    const planData = getSacrificePlan();

    return (
        <div className="premium-glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] relative overflow-hidden group text-right dir-rtl" dir="rtl">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-purple-900/5 to-transparent -z-0" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-[80px]" />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#f0cc60] flex items-center justify-center shadow-lg transform -rotate-6">
                        <Sparkles className="w-8 h-8 text-[#0c1c44] rtl-flip" />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-[#0c1c44] dark:text-white tracking-tighter">מגשים החלומות החכם</h2>
                        <p className="text-slate-500 font-medium mt-1">בואו נבין בדיוק על מה לוותר כדי להשיג את הפנטזיה הבאה שלכם</p>
                    </div>
                </div>

                {/* Step 1: Select Dream */}
                {step === 1 && (
                    <div className="space-y-8 animate-in mt-8">
                        <h3 className="text-xl font-bold text-[#0c1c44] dark:text-white text-center mb-6">מה החלום הגדול הבא שלכם?</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {predefinedDreams.map((dream, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setDreamTarget(dream); setStep(2); }}
                                    className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 text-center hover:border-[#d4af37] hover:bg-[#d4af37]/5 transition-all group"
                                >
                                    <dream.icon className="w-10 h-10 mx-auto text-slate-400 group-hover:text-[#d4af37] transition-colors mb-4 rtl-flip" />
                                    <p className="font-black text-[#0c1c44] dark:text-white text-sm lg:text-base">{dream.name}</p>
                                    <p className="text-xs font-bold text-[#d4af37] mt-2">₪{dream.cost.toLocaleString()}</p>
                                </button>
                            ))}
                        </div>

                        <div className="text-center pt-8">
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">— או חלום אישי —</p>
                            <div className="max-w-md mx-auto flex items-center gap-4">
                                <input
                                    type="text"
                                    value={dreamTarget.name}
                                    onChange={e => setDreamTarget({ ...dreamTarget, name: e.target.value })}
                                    placeholder="הזן מטרה אישית..."
                                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 font-bold text-base focus:ring-[#d4af37]"
                                />
                                <input
                                    type="number"
                                    value={dreamTarget.cost}
                                    onChange={e => setDreamTarget({ ...dreamTarget, cost: Number(e.target.value) })}
                                    placeholder="עלות ב-₪"
                                    className="w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 font-bold text-base focus:ring-[#d4af37]"
                                />
                            </div>
                            <button
                                onClick={() => setStep(2)}
                                className="mt-6 px-10 py-3 bg-[#0c1c44] text-white font-black rounded-xl hover:bg-[#d4af37] transition-all"
                            >
                                המשך לשלב הבא
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Timeframe */}
                {step === 2 && (
                    <div className="space-y-8 animate-in mt-8 max-w-xl mx-auto text-center">
                        <h3 className="text-xl font-bold text-[#0c1c44] dark:text-white">תוך כמה זמן תרצו להגשים את החלום?</h3>
                        <p className="text-3xl font-black text-[#d4af37]">"{dreamTarget.name}" • ₪{dreamTarget.cost.toLocaleString()}</p>

                        <div className="py-10">
                            <input
                                type="range"
                                min="3"
                                max="60"
                                value={timeframeMonths}
                                onChange={(e) => setTimeframeMonths(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                            />
                            <div className="mt-6 text-2xl font-black text-[#0c1c44] dark:text-white">
                                {timeframeMonths} חודשים
                                <span className="text-sm text-slate-500 font-medium block mt-1">
                                    (זה אומר לחסוך ₪{getMonthlySavings().toLocaleString()} בכל חודש)
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setStep(1)} className="px-6 py-4 font-black text-slate-500 bg-white dark:bg-slate-900 rounded-2xl">חזור</button>
                            <button disabled={isCalculating} onClick={calculateSacrifices} className="flex-1 btn-gold !py-4 text-xl">
                                {isCalculating ? "מפענח חתכים תקציביים..." : "איך מגיעים לזה תכלס?"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Action Plan */}
                {step === 3 && (
                    <div className="space-y-10 animate-in mt-8">
                        <div className="text-center max-w-2xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 mb-6">
                                <Target className="w-4 h-4" />
                                תוכנית פעולה מיקרו-פיננסית מופעלת
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-[#0c1c44] dark:text-white leading-[1.2]">
                                כדי לממן "{dreamTarget.name}", עליכם לחתוך <span className="text-[#d4af37]">₪{weeklyTarget.toLocaleString()}</span> בשבוע בלבד.
                            </h3>
                            <p className="text-slate-500 mt-4 text-lg">וזה הרבה יותר קל ממה שאתם חושבים, הנה תוכנית הקיצוצים השבועית שלכם:</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                            {planData.plan.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-[#d4af37] transition-colors group">
                                    <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                        <item.icon className="w-7 h-7 text-slate-400 group-hover:text-[#d4af37] transition-colors" />
                                    </div>
                                    <div className="flex-1 text-right">
                                        <h4 className="font-black text-[#0c1c44] dark:text-white text-lg">וותרו על {item.count} {item.title}</h4>
                                        <p className="text-sm font-bold text-green-500">+ ₪{item.savings} חיסכון שבועי</p>
                                    </div>
                                </div>
                            ))}
                            {planData.unallocated > 0 && (
                                <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-[#d4af37] transition-colors group">
                                    <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                        <span className="text-xl">💰</span>
                                    </div>
                                    <div className="flex-1 text-right">
                                        <h4 className="font-black text-[#0c1c44] dark:text-white text-lg">חיסכון חופשי נוסף</h4>
                                        <p className="text-sm font-bold text-green-500">+ ₪{planData.unallocated.toLocaleString()} חיסכון שבועי מדברים שוליים</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="text-center pt-8">
                            <button className="btn-gold !px-12 text-xl shadow-[0_20px_40px_-10px_rgba(212,175,55,0.4)] hover:scale-105 transition-transform">
                                אני מתחיל היום, עזרו לי לחסוך
                            </button>
                            <button onClick={() => setStep(1)} className="block mx-auto mt-6 text-sm font-bold text-slate-400 hover:text-[#d4af37]">
                                חישוב יעד אחר
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
