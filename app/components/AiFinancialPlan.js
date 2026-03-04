"use client";
import { useState, useEffect } from "react";
import { Bot, Sparkles, Cpu, CheckCircle, ArrowLeft, RefreshCw, Activity, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiFinancialPlan() {
    const [step, setStep] = useState("input"); // input, analyzing, result
    const [formData, setFormData] = useState({ income: "", expenses: "", goal: "home" });
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [aiPlan, setAiPlan] = useState([]);

    const goals = [
        { id: "home", label: "רכישת דירה", icon: <Target className="w-5 h-5" /> },
        { id: "retire", label: "פרישה מוקדמת", icon: <Sparkles className="w-5 h-5" /> },
        { id: "debt", label: "סגירת חובות", icon: <CheckCircle className="w-5 h-5" /> }
    ];

    const generatePlan = async (e) => {
        e.preventDefault();
        setStep("analyzing");

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5;
            if (progress >= 95) progress = 95;
            setAnalysisProgress(progress);
        }, 500);

        try {
            const res = await fetch("/api/ai-plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    income: formData.income,
                    expenses: formData.expenses,
                    goalLabel: goals.find(g => g.id === formData.goal).label
                }),
            });
            const data = await res.json();

            clearInterval(interval);
            setAnalysisProgress(100);

            setTimeout(() => {
                if (data.success && data.plan) {
                    setAiPlan(data.plan);
                } else {
                    setAiPlan([
                        "שגיאת תקשורת עם המודל של Google: המערכת לא הוגדרה עם מפתח API נכון.",
                        "יש לפתוח את הקובץ .env.local ולהוסיף GEMINI_API_KEY מתאים.",
                        data.error || "המודל של ג'מיני יאפשר לקבל המלצות מדויקות המבוססות על AI אמיתי!"
                    ]);
                }
                setStep("result");
            }, 600);

        } catch (error) {
            console.error("Failed fetching Gemini:", error);
            clearInterval(interval);
            setAnalysisProgress(100);
            setAiPlan(["שגיאת רשת בחיבור לשרת הג'מיני. נסה שוב מאוחר יותר."]);
            setStep("result");
        }
    };

    return (
        <section className="py-24 bg-[#0c1c44] text-white overflow-hidden relative" dir="rtl">
            {/* AI Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 -translate-x-1/3 translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                        <Cpu className="w-4 h-4" /> מערכת AI FinSmart
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black">
                        בניית אסטרטגיה <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#d4af37] to-[#f0cc60]">רובוטית וחכמה</span>
                    </h2>
                    <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
                        מערכת הבינה המלאכותית שלנו מנתחת אלפי תרחישים פיננסיים ויודעת להרכיב עבורך את תוכנית הפעולה האופטימלית - בשניות.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">

                        <AnimatePresence mode="wait">
                            {/* STEP 1: INPUT */}
                            {step === "input" && (
                                <motion.form
                                    key="input"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    onSubmit={generatePlan}
                                    className="space-y-6 relative z-10"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-white/80">הכנסה חודשית (נטו)</label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                value={formData.income}
                                                onChange={e => setFormData({ ...formData, income: e.target.value })}
                                                placeholder="₪ 15,000"
                                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none text-white transition-all font-mono"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-white/80">הוצאות חודשיות (ממוצע)</label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                value={formData.expenses}
                                                onChange={e => setFormData({ ...formData, expenses: e.target.value })}
                                                placeholder="₪ 12,000"
                                                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-4 focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none text-white transition-all font-mono"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-white/80">מה המטרה המרכזית שלך?</label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            {goals.map(g => (
                                                <button
                                                    key={g.id}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, goal: g.id })}
                                                    className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all font-medium text-sm ${formData.goal === g.id
                                                        ? "bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37] ring-1 ring-[#d4af37]/50"
                                                        : "bg-transparent border-white/10 text-white/60 hover:bg-white/5"
                                                        }`}
                                                >
                                                    {g.icon} {g.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button type="submit" className="w-full py-5 bg-[#d4af37] text-[#0c1c44] font-black text-xl rounded-xl hover:bg-[#c29f30] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-8 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                        <Sparkles className="w-5 h-5" />
                                        ייצר מפת דרכים בעזרת AI
                                    </button>
                                </motion.form>
                            )}

                            {/* STEP 2: ANALYZING */}
                            {step === "analyzing" && (
                                <motion.div
                                    key="analyzing"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="py-12 flex flex-col items-center justify-center space-y-8 relative z-10"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-[20px] animate-pulse" />
                                        <div className="w-24 h-24 bg-[#0c1c44] border-2 border-[#d4af37] rounded-full flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                                            <Activity className="w-10 h-10 text-[#d4af37] animate-pulse" />
                                        </div>
                                        {/* Orbiting dots to look like AI processing */}
                                        <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow">
                                            <div className="absolute top-0 left-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]" />
                                            <div className="absolute bottom-0 right-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]" />
                                        </div>
                                    </div>

                                    <div className="text-center space-y-3">
                                        <h3 className="text-2xl font-black text-white">המערכת מעבדת נתונים </h3>
                                        <p className="text-[#d4af37] font-mono font-bold">{analysisProgress}%</p>
                                        <p className="text-white/50 text-sm">
                                            {analysisProgress < 30 ? "סורק טווחי הכנסות והוצאות..." :
                                                analysisProgress < 70 ? "מצליב נתוני מס וריביות שוק..." :
                                                    "בונה אסטרטגיה וסימולציה פנסיונית..."}
                                        </p>
                                    </div>

                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-[#d4af37] to-[#f0cc60]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${analysisProgress}%` }}
                                            transition={{ ease: "linear", duration: 0.4 }}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: RESULT */}
                            {step === "result" && (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-8 relative z-10"
                                >
                                    <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                                        <div className="w-14 h-14 bg-[#d4af37]/20 rounded-2xl flex items-center justify-center border border-[#d4af37]/30">
                                            <Bot className="w-8 h-8 text-[#d4af37]" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-white">האסטרטגיה שלך מוכנה</h3>
                                            <p className="text-emerald-400 text-sm font-bold flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" /> מותאם אישית עבורך
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {aiPlan.map((text, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.4 + 0.2 }}
                                                className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/5"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-[#d4af37] font-bold text-sm">
                                                    0{i + 1}
                                                </div>
                                                <p className="text-white/80 leading-relaxed font-medium pt-1">
                                                    <span className="text-white font-bold">{text.split(':')[0]}:</span> {text.split(':')[1]}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                        <a href="#contact" className="flex-1 py-4 bg-[#d4af37] text-[#0c1c44] font-black rounded-xl hover:bg-[#c29f30] transition-all text-center flex items-center justify-center gap-2 shadow-lg">
                                            <Target className="w-5 h-5" /> יישם את התוכנית עכשיו
                                        </a>
                                        <button
                                            onClick={() => setStep("input")}
                                            className="px-6 py-4 bg-white/5 text-white/70 font-bold rounded-xl hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center gap-2"
                                        >
                                            <RefreshCw className="w-5 h-5" /> חשב מחדש
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </div>
            </div>
        </section>
    );
}
