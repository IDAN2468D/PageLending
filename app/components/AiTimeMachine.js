"use client";
import { useState } from "react";
import { Clock, TrendingDown, TrendingUp, Sparkles, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiTimeMachine() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ age: "", money: "", dream: "" });
    const [results, setResults] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/ai-time-machine", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!data.error) {
                setResults(data);
                setStep(2);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden" dir="rtl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0c1c44]/5 rounded-full blur-[120px] -z-10 -translate-x-1/3 translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Concept Side */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-50 text-emerald-700 text-sm font-bold shadow-sm">
                            <Clock className="w-4 h-4" /> מכונת הזמן הפיננסית מופעלת AI
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-[#0c1c44]">
                            איפה היית בעוד 10 שנים אם היית <span className="text-emerald-500 underline decoration-solid decoration-4 underline-offset-4">משקיע היום</span>?
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed font-medium">
                            מרבית האנשים נותנים לאינפלציה לשחוק את הכסף שלהם. הזינו את הנתונים שלכם עכשיו ומערכת ה-AI שלנו תחשב את שני תסריטי העתיד שלכם. מה עולה לכם יותר - לקחת סיכון או לא לקבל החלטה בכלל?
                        </p>
                    </div>

                    {/* Machine Side */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 relative min-h-[450px]">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <div>
                                        <label className="text-sm font-bold text-slate-700 mb-2 block">בני כמה אתם היום?</label>
                                        <input
                                            required
                                            type="number"
                                            value={formData.age}
                                            onChange={e => setFormData({ ...formData, age: e.target.value })}
                                            placeholder="לדוגמה: 32"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-slate-700 mb-2 block">סכום חיסכון פנוי נכון להיום (₪)</label>
                                        <input
                                            required
                                            type="number"
                                            value={formData.money}
                                            onChange={e => setFormData({ ...formData, money: e.target.value })}
                                            placeholder="לדוגמה: 50,000"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-slate-700 mb-2 block">מה החלום הגדול?</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.dream}
                                            onChange={e => setFormData({ ...formData, dream: e.target.value })}
                                            placeholder="לדוגמה: לקנות בית בלי משכנתא משתקת"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-5 bg-[#0c1c44] text-white font-black text-xl rounded-xl hover:bg-[#081330] hover:shadow-xl transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-70 disabled:cursor-wait"
                                    >
                                        {loading ? <span className="animate-spin text-xl">⏳</span> : <Sparkles className="w-5 h-5" />}
                                        {loading ? "נוסעים בזמן..." : "חשבו עבורי 10 שנים קדימה"}
                                    </button>
                                </motion.form>
                            )}

                            {step === 2 && results && (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-6 h-full flex flex-col justify-center"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        {/* Scenario A */}
                                        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl">
                                            <div className="w-10 h-10 bg-rose-100 flex items-center justify-center rounded-xl mb-4">
                                                <TrendingDown className="w-5 h-5 text-rose-600" />
                                            </div>
                                            <h4 className="font-black text-rose-900 mb-2">{results.scenarioA_title}</h4>
                                            <p className="text-rose-700/80 text-sm mb-4 min-h-[60px]">{results.scenarioA_desc}</p>
                                            <div className="text-2xl font-black text-rose-700 font-mono tracking-tighter" dir="ltr">{results.scenarioA_number}</div>
                                        </div>

                                        {/* Scenario B */}
                                        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[30px] -z-0" />
                                            <div className="relative z-10">
                                                <div className="w-10 h-10 bg-emerald-500 flex items-center justify-center rounded-xl mb-4 shadow-lg shadow-emerald-500/30">
                                                    <TrendingUp className="w-5 h-5 text-white" />
                                                </div>
                                                <h4 className="font-black text-emerald-900 mb-2">{results.scenarioB_title}</h4>
                                                <p className="text-emerald-800/80 text-sm mb-4 min-h-[60px]">{results.scenarioB_desc}</p>
                                                <div className="text-3xl font-black text-emerald-600 font-mono tracking-tighter" dir="ltr">{results.scenarioB_number}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2 flex items-center justify-between">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="text-slate-500 hover:text-[#0c1c44] font-bold text-sm flex items-center gap-2 transition-colors"
                                        >
                                            <RefreshCcw className="w-4 h-4" /> נסה שוב
                                        </button>
                                        <a href="#contact" className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-colors">
                                            נשמע טוב? קבע פגישה
                                        </a>
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
