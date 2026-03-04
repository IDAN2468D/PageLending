"use client";
import React, { useState } from "react";
import { Briefcase, ArrowLeft, ShieldAlert, CheckCircle, AlertCircle, BarChart3 } from "lucide-react";
import { balanceFreelance } from "../actions/freelanceBalancerAction";

export default function AiFreelanceBalancer() {
    const [incomeText, setIncomeText] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!incomeText.trim()) return;
        setLoading(true); setError(""); setResult(null);
        try {
            const res = await balanceFreelance(incomeText);
            if (res.success && res.data) setResult(res.data);
            else setError(res.error || "שגיאה בניתוח הנתונים");
        } catch (err) { setError("שגיאת שרת"); }
        finally { setLoading(false); }
    };

    return (
        <section className="py-24 bg-slate-100 relative overflow-hidden font-heebo" dir="rtl">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#af8e24] text-sm font-bold shadow-sm">
                        <Briefcase className="w-4 h-4" /> המייצב הפיננסי לעצמאיים
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#0c1c44]">
                        הכנסה קופצת כמו יויו? <span className="text-indigo-600 underline decoration-indigo-300/40">תהיו שכירים של עצמכם.</span>
                    </h2>
                    <p className="text-slate-600 font-medium max-w-2xl mx-auto text-lg pt-2 leading-relaxed">
                        אתם עובדים קשה, אבל פעם יש 20 אלף בחשבון ופעם מחפשים איך לסגור מינוס. הזינו הכנסות מחצי השנה האחרונה וה-AI שלנו יבנה לכם "כרית ביטחון" ומשכורת חדה שלא תרעיד את העסק.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white h-full flex flex-col">
                        <form onSubmit={handleAnalyze} className="flex flex-col h-full flex-grow">
                            <label className="text-[#0c1c44] font-bold mb-4 text-lg">
                                שימו כאן את ההכנסות מחצי השנה האחרונה:
                            </label>
                            <textarea
                                value={incomeText}
                                onChange={(e) => setIncomeText(e.target.value)}
                                placeholder="לדוגמה: ינואר הכנסתי 14000, פברואר רק 7000, במרץ עפתי על 22000 ואפריל היה חלש עם 4500..."
                                className="w-full flex-grow min-h-[220px] bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none transition-all text-slate-700 font-medium shadow-inner"
                            />
                            {error && (
                                <div className="mb-4 text-rose-600 bg-rose-50 p-3 rounded-lg flex items-center gap-2 text-sm font-bold border border-rose-200">
                                    <AlertCircle className="w-4 h-4" /> {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-indigo-600 text-white font-black text-xl rounded-2xl hover:bg-indigo-700 hover:shadow-xl transition-all flex items-center justify-center gap-3 mt-auto disabled:opacity-75"
                            >
                                {loading ? <span className="animate-spin text-xl">🔄</span> : <BarChart3 className="w-6 h-6 text-white" />}
                                <span>{loading ? "מחשב מודל פיננסי..." : "ייצב לי את העסק"}</span>
                            </button>
                        </form>
                    </div>

                    <div className="bg-[#0c1c44] rounded-3xl p-8 shadow-2xl border border-[#1e3a8a] text-white relative overflow-hidden flex flex-col justify-center min-h-[450px]">
                        {!result && !loading && (
                            <div className="text-center opacity-50 relative z-10">
                                <ShieldAlert className="w-16 h-16 mb-4 text-[#d4af37] mx-auto" />
                                <h3 className="text-2xl font-bold">שיטה לסוף התנודתיות</h3>
                                <p className="mt-2 text-sm max-w-sm mx-auto">המערכת תחשב עבורכם כמה למשוך הביתה כדי שהעסק לא יקרוס בעתיד.</p>
                            </div>
                        )}
                        {loading && (
                            <div className="text-center relative z-10 space-y-4">
                                <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto" />
                                <h3 className="text-xl font-bold text-indigo-300">בוחן סטטיסטיקות תזרים...</h3>
                            </div>
                        )}
                        {result && !loading && (
                            <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                                <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-5 mb-5 shrink-0 flex items-center justify-between text-center">
                                    <div className="w-1/2">
                                        <p className="text-indigo-300 text-sm font-bold block mb-1">משכורת בטוחה:</p>
                                        <p className="text-3xl font-black text-white font-mono leading-none break-words">₪{result.safe_salary}</p>
                                    </div>
                                    <div className="w-px h-12 bg-indigo-500/30 mx-3"></div>
                                    <div className="w-1/2">
                                        <p className="text-[#d4af37] text-sm font-bold block mb-1">כרית ביטחון בעסק:</p>
                                        <p className="text-2xl font-black text-[#d4af37] font-mono leading-none break-words">₪{result.safety_cushion}</p>
                                    </div>
                                </div>
                                <div className="mb-5 flex-grow">
                                    <div className="flex items-center gap-3 mb-5 bg-white/5 p-3 rounded-xl border border-white/10 shadow-inner">
                                        <span className="text-sm">מדד התנודתיות העסקי שלך:</span>
                                        <ActivityScore score={result.volatility_score} />
                                    </div>
                                    <h4 className="font-bold text-[#d4af37] mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 rtl:scale-x-[-1]" /> כללי ברזל לשוטף:
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.rules.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-white/90 bg-white/5 p-3 rounded-xl border border-white/10 shadow-sm leading-relaxed">
                                                <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full mt-1.5 shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <a href="#contact" className="w-full flex items-center justify-center gap-2 py-4 mt-auto bg-white text-[#0c1c44] font-black rounded-xl hover:bg-slate-100 transition-all shadow-lg group">
                                    קבעו פגישה לייצוב מלא
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

function ActivityScore({ score }) {
    const s = parseInt(score) || 5;
    const color = s > 7 ? 'text-rose-500' : s > 4 ? 'text-amber-400' : 'text-emerald-400';
    return <span className={`font-black text-xl ${color}`}>{s}/10</span>;
}
