"use client";
import React, { useState } from "react";
import { Home, ArrowLeft, Loader2, Key, Target, AlertTriangle } from "lucide-react";
import { planMortgage } from "../actions/mortgageReadinessAction";

export default function AiMortgageReadiness() {
    const [equity, setEquity] = useState("");
    const [income, setIncome] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!equity || !income) return;
        setLoading(true); setError(""); setResult(null);
        try {
            const res = await planMortgage(equity, income);
            if (res.success && res.data) setResult(res.data);
            else setError(res.error || "שגיאה בניתוח הנתונים");
        } catch (err) { setError("שגיאה מול השרת"); }
        finally { setLoading(false); }
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden font-heebo" dir="rtl">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-bold shadow-sm">
                        <Home className="w-4 h-4" /> סוכן משכנתא אישי
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#0c1c44]">
                        מרגישים שדירה זה חלום רחוק? <span className="text-emerald-500 underline decoration-emerald-200">בואו נבנה מסלול.</span>
                    </h2>
                    <p className="text-slate-600 font-medium max-w-2xl mx-auto text-lg pt-2 leading-relaxed">
                        הזינו את ההון העצמי שיש לכם כרגע, וכמה תוכלו לחסוך בכל חודש. ה-AI שלנו יבנה לכם תוכנית פעולה של 24 חודשים מרגע זה ועד ליום קבלת מפתח.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="order-2 lg:order-1 bg-[#0c1c44] rounded-3xl p-8 shadow-2xl border border-[#1e3a8a] text-white relative overflow-hidden flex flex-col justify-center min-h-[450px]">
                        {!result && !loading && (
                            <div className="text-center opacity-50 relative z-10">
                                <Key className="w-16 h-16 mb-4 text-[#d4af37] mx-auto" />
                                <h3 className="text-2xl font-bold">המפתח לדירה שלכם</h3>
                                <p className="mt-2 text-sm">הנתונים ינותחו כאן בזמן אמת</p>
                            </div>
                        )}
                        {loading && (
                            <div className="text-center relative z-10 space-y-4">
                                <Loader2 className="w-16 h-16 border-emerald-500 animate-spin mx-auto text-emerald-500" />
                                <h3 className="text-xl font-bold text-emerald-400">בונה מסלול רכישה...</h3>
                            </div>
                        )}
                        {result && !loading && (
                            <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                                <div className="bg-white/10 border border-white/20 rounded-2xl p-5 mb-5 flex justify-between items-center text-center">
                                    <div className="w-1/2">
                                        <p className="text-sm font-bold text-emerald-400">הון בעוד שנתיים:</p>
                                        <p className="text-2xl font-black text-white font-mono break-words">₪{result.projected_equity}</p>
                                    </div>
                                    <div className="w-px h-12 bg-white/20 mx-2"></div>
                                    <div className="w-1/2">
                                        <p className="text-sm font-bold text-[#d4af37]">שווי נכס מקסימלי:</p>
                                        <p className="text-2xl font-black text-[#d4af37] font-mono break-words">₪{result.max_property_value}</p>
                                    </div>
                                </div>
                                <div className="mb-5 flex-grow">
                                    <h4 className="font-bold text-[#d4af37] mb-3 flex items-center gap-2">
                                        <Target className="w-5 h-5 rtl:scale-x-[-1]" /> נקודות ציון:
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.monthly_milestones.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-white/90 bg-slate-800/50 p-3 rounded-xl border border-slate-700">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-4 bg-[#d4af37]/20 border border-[#d4af37]/40 rounded-xl mb-4 text-sm text-white font-medium leading-relaxed">
                                    <strong className="text-[#d4af37] block mb-1">💡 טיפ זהב מה-AI:</strong> {result.advice}
                                </div>
                                <a href="#contact" className="w-full flex items-center justify-center gap-2 py-4 bg-white text-[#0c1c44] font-black rounded-xl hover:bg-slate-100 transition-all shadow-lg group">
                                    בואו נתחיל לעבוד על האישור
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="order-1 lg:order-2 bg-slate-50 border border-slate-200 p-8 rounded-3xl shadow-xl h-full flex flex-col">
                        <form onSubmit={handleAnalyze} className="flex flex-col h-full gap-6">
                            <div>
                                <label className="text-[#0c1c44] font-bold mb-2 block text-lg">
                                    הון עצמי התחלתי כיום (₪):
                                </label>
                                <input
                                    type="number"
                                    value={equity}
                                    onChange={(e) => setEquity(e.target.value)}
                                    placeholder="לדוגמה: 200000"
                                    className="w-full bg-white border border-slate-300 rounded-xl p-4 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-800 font-bold shadow-inner"
                                />
                            </div>
                            <div>
                                <label className="text-[#0c1c44] font-bold mb-2 block text-lg">
                                    הכנסה חודשית פנויה לחיסכון (₪):
                                </label>
                                <input
                                    type="number"
                                    value={income}
                                    onChange={(e) => setIncome(e.target.value)}
                                    placeholder="2000"
                                    className="w-full bg-white border border-slate-300 rounded-xl p-4 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-800 font-bold shadow-inner"
                                />
                            </div>
                            {error && (
                                <div className="text-rose-600 bg-rose-50 p-3 rounded-lg flex items-center gap-2 text-sm font-bold border border-rose-200">
                                    <AlertTriangle className="w-4 h-4" /> {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-[#0c1c44] text-white font-black text-xl rounded-xl hover:bg-[#1e3a8a] transition-all flex items-center justify-center gap-3 mt-auto shadow-md disabled:opacity-75"
                            >
                                {loading ? "מחשב מסלול..." : "בנה לי תוכנית למשכנתא"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
