"use client";
import React, { useState } from "react";
import { Layers, ArrowLeft, RefreshCcw, TrendingDown, CheckCircle, AlertTriangle } from "lucide-react";
import { analyzeDebts } from "../actions/debtConsolidationAction";

export default function AiDebtConsolidator() {
    const [debts, setDebts] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!debts.trim()) return;
        setLoading(true); setError(""); setResult(null);
        try {
            const res = await analyzeDebts(debts);
            if (res.success && res.data) setResult(res.data);
            else setError(res.error || "שגיאה בניתוח הנתונים");
        } catch (err) { setError("שגיאה בתקשורת מול השרת"); }
        finally { setLoading(false); }
    };

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden font-heebo" dir="rtl">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-sm font-bold shadow-sm">
                        <Layers className="w-4 h-4" /> מאחד ההלוואות החכם
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#0c1c44]">
                        מפזרים כספים על הלוואות קטנות? <span className="text-[#d4af37] underline decoration-[#d4af37]/30">בואו נאחד.</span>
                    </h2>
                    <p className="text-slate-600 font-medium max-w-2xl mx-auto text-lg pt-2 leading-relaxed">
                        ספרו לנו על המינוס, הלוואת הרכב וכרטיסי האשראי שלכם. ה-AI שלנו יחשב איך איחוד שלהם להלוואה אחת ב-PageLending יחתוך לכם את ההחזר החודשי.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white h-full flex flex-col">
                        <form onSubmit={handleAnalyze} className="flex flex-col h-full flex-grow">
                            <label className="text-[#0c1c44] font-bold mb-4 text-lg">
                                פירוט חובות (במילים שלכם):
                            </label>
                            <textarea
                                value={debts}
                                onChange={(e) => setDebts(e.target.value)}
                                placeholder="לדוגמה: יש לי מינוס של 15,000 שקל, הלוואה על הרכב שנשאר בה 40,000, ועוד 20,000 בכרטיס אשראי..."
                                className="w-full flex-grow min-h-[200px] bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 focus:ring-4 focus:ring-[#d4af37]/20 focus:border-[#d4af37] outline-none resize-none transition-all text-slate-700 font-medium shadow-inner"
                            />
                            {error && (
                                <div className="mb-4 text-rose-600 bg-rose-50 p-3 rounded-lg flex items-center gap-2 text-sm font-bold border border-rose-200">
                                    <AlertTriangle className="w-4 h-4" /> {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-[#d4af37] text-white font-black text-xl rounded-2xl hover:bg-[#c29f30] hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-wait mt-auto"
                            >
                                {loading ? <span className="animate-spin text-xl">⏳</span> : <RefreshCcw className="w-6 h-6 text-[#0c1c44]" />}
                                <span className="text-[#0c1c44]">{loading ? "מחשב פתרון..." : "אחדו לי את ההלוואות"}</span>
                            </button>
                        </form>
                    </div>

                    <div className="bg-[#0c1c44] rounded-3xl p-8 shadow-2xl border border-[#1e3a8a] text-white relative overflow-hidden flex flex-col justify-center min-h-[450px]">
                        {!result && !loading && (
                            <div className="text-center opacity-50 relative z-10">
                                <Layers className="w-16 h-16 mb-4 text-[#d4af37] mx-auto" />
                                <h3 className="text-2xl font-bold">המערכת ממתינה...</h3>
                                <p className="mt-2 text-sm">הזינו את החובות ונראה לכם כמה כסף מתבזבז על ריביות עתק.</p>
                            </div>
                        )}
                        {loading && (
                            <div className="text-center relative z-10 space-y-4">
                                <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto" />
                                <h3 className="text-xl font-bold text-[#d4af37]">מפעיל סימולציית הגנה...</h3>
                            </div>
                        )}
                        {result && !loading && (
                            <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 mb-5 shrink-0">
                                    <div className="flex items-center justify-between mb-4 border-b border-emerald-500/20 pb-4">
                                        <div>
                                            <p className="text-emerald-300 text-sm font-bold">החזר חודשי נוכחי:</p>
                                            <p className="text-2xl font-mono opacity-80 line-through">₪{result.current_monthly_payment}</p>
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[#d4af37] text-sm font-bold">החזר אחרי איחוד:</p>
                                            <p className="text-3xl font-black text-[#d4af37] font-mono">₪{result.new_monthly_payment}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <TrendingDown className="w-8 h-8 text-emerald-400" />
                                        <h4 className="text-emerald-400 font-bold text-lg">חיסכון: <span className="text-white">₪{result.monthly_savings} בחודש</span></h4>
                                    </div>
                                </div>
                                <div className="mb-5 flex-grow">
                                    <h4 className="font-bold text-[#d4af37] mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 rtl:scale-x-[-1]" /> תוכנית פעולה:
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.action_plan.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-white/90 bg-white/5 p-3 rounded-xl border border-white/10 shadow-sm leading-relaxed">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <a href="#contact" className="w-full flex items-center justify-center gap-2 py-4 bg-[#d4af37] text-[#0c1c44] font-black rounded-xl hover:bg-[#c29f30] transition-all shadow-lg group">
                                    אני רוצה לאחד הלוואות עכשיו
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
