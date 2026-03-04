"use client";
import { useState } from "react";
import { TrendingDown, ShieldAlert, Zap, ArrowLeft, Mail, Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiPensionNegotiator() {
    const [currentPension, setCurrentPension] = useState(200000);
    const [depositFee, setDepositFee] = useState(2.5);
    const [accumulationFee, setAccumulationFee] = useState(0.25);
    const [yearsToRetire, setYearsToRetire] = useState(25);

    const [isCalculating, setIsCalculating] = useState(false);
    const [result, setResult] = useState(null);

    const handleCalculate = async () => {
        setIsCalculating(true);
        try {
            const res = await fetch("/api/ai-pension", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPension, depositFee, accumulationFee, yearsToRetire })
            });
            const data = await res.json();
            if (data.success) {
                setResult(data.data);
            }
        } catch (e) {
            console.error(e);
        }
        setIsCalculating(false);
    };

    return (
        <section className="py-24 bg-[#0c1c44] relative overflow-hidden font-heebo" dir="rtl">
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none">
                <svg viewBox="0 0 800 500" preserveAspectRatio="none" className="w-full h-full text-white fill-current">
                    <path d="M0,100 C150,200 350,0 500,100 C650,200 800,50 800,50 L800,500 L0,500 Z" />
                </svg>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        מחסל עמלות <span className="text-[#d4af37]">הפנסיה והביטוח</span>
                    </h2>
                    <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto">
                        דמי הניהול הקטנים שוחקים לכם מאות אלפי שקלים עד הפרישה. גלו בדיוק כמה כסף תפסידו, וקבלו מה-AI ניסוח שידרוש את הכסף הזה חזרה.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 items-start">
                    {/* Inputs panel */}
                    <div className="bg-white rounded-3xl p-8 shadow-2xl lg:col-span-2 space-y-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-[#0c1c44]/10 rounded-full flex items-center justify-center">
                                <Percent className="w-5 h-5 text-[#0c1c44]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0c1c44]">הנתונים שלכם</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between font-bold text-[#0c1c44] text-sm">
                                    <span>צבירה נוכחית:</span><span>₪{currentPension.toLocaleString()}</span>
                                </div>
                                <input type="range" min="0" max="2000000" step="10000" value={currentPension} onChange={(e) => setCurrentPension(Number(e.target.value))} className="w-full accent-[#0c1c44]" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between font-bold text-[#0c1c44] text-sm">
                                    <span>דמי ניהול מהפקדה:</span><span>{depositFee}%</span>
                                </div>
                                <input type="range" min="0" max="6" step="0.1" value={depositFee} onChange={(e) => setDepositFee(Number(e.target.value))} className="w-full accent-[#d4af37]" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between font-bold text-[#0c1c44] text-sm">
                                    <span>דמי ניהול מצבירה:</span><span>{accumulationFee}%</span>
                                </div>
                                <input type="range" min="0" max="2" step="0.05" value={accumulationFee} onChange={(e) => setAccumulationFee(Number(e.target.value))} className="w-full accent-[#d4af37]" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between font-bold text-[#0c1c44] text-sm">
                                    <span>שנים עד לפרישה:</span><span>{yearsToRetire}</span>
                                </div>
                                <input type="range" min="5" max="45" step="1" value={yearsToRetire} onChange={(e) => setYearsToRetire(Number(e.target.value))} className="w-full accent-[#0c1c44]" />
                            </div>
                        </div>

                        <button
                            onClick={handleCalculate}
                            disabled={isCalculating}
                            className="w-full py-4 bg-[#d4af37] text-[#0c1c44] font-black rounded-xl hover:bg-[#c29f30] transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-70"
                        >
                            {isCalculating ? "מחשב פסיחה פיננסית..." : "גלה כמה כסף אתה מפסיד"}
                            <Zap className="w-5 h-5 group-hover:scale-110" />
                        </button>
                    </div>

                    {/* Results panel */}
                    <div className="lg:col-span-3 min-h-[400px] flex items-stretch">
                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-[#d4af37] rounded-3xl p-8 w-full shadow-2xl relative overflow-hidden flex flex-col"
                                >
                                    <div className="absolute -top-24 -right-24 text-white/20">
                                        <TrendingDown size={200} />
                                    </div>

                                    <div className="relative z-10 space-y-8 flex-grow">
                                        <div>
                                            <p className="font-bold text-[#0c1c44]/70 uppercase tracking-widest text-sm mb-2">אובדן הון מוערך עד גיל פרישה</p>
                                            <h3 className="text-5xl md:text-7xl font-black text-[#0c1c44] tracking-tight">
                                                ₪{result.lostMoney.toLocaleString()}
                                            </h3>
                                        </div>

                                        <div className="bg-white/90 backdrop-blur rounded-2xl p-6 text-[#0c1c44] space-y-3 shadow-sm border border-white/50">
                                            <div className="flex items-start gap-3">
                                                <ShieldAlert className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                                                <p className="font-bold">{result.analysis}</p>
                                            </div>
                                            <div className="bg-slate-100 p-4 rounded-xl relative mt-4 group">
                                                <p className="text-xs text-slate-500 mb-1 font-bold">תבנית שיחה למייל הקרוב שלך:</p>
                                                <p className="text-sm font-medium">"{result.template}"</p>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(result.template)}
                                                    className="absolute top-4 left-4 p-2 bg-white rounded shadow-sm hover:text-[#d4af37] transition-colors"
                                                >
                                                    העתק
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative z-10 pt-6">
                                        <a href="#contact" className="w-full flex items-center justify-center gap-2 py-4 bg-[#0c1c44] text-white font-black rounded-xl hover:scale-[1.02] transition-all shadow-xl group">
                                            צריכים עזרה לעשות את זה עבורכם? דברו איתנו
                                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="w-full h-full border-2 border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center text-white/50 p-8">
                                    <ShieldAlert className="w-20 h-20 mb-6 opacity-30" />
                                    <h3 className="text-2xl font-bold mb-2 text-white/70">המערכת ממתינה לחישוב</h3>
                                    <p className="text-center max-w-sm">מלאו את הנתונים ולחצו על הכפתור כדי לגלות את הזליגה הפיננסית העתידית שלכם.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
