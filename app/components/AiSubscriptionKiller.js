"use client";

import React, { useState } from "react";
import { Search, Trash2, Mail, AlertTriangle, TrendingDown, ArrowLeft, CheckCircle2, Copy } from "lucide-react";
import { analyzeSubscriptions } from "../actions/subscriptionAction";

export default function AiSubscriptionKiller() {
    const [expenses, setExpenses] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!expenses.trim()) return;

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await analyzeSubscriptions(expenses);
            if (res.success && res.data) {
                setResult(res.data);
            } else {
                setError(res.error || "שגיאה כללית בניתוח");
            }
        } catch (err) {
            setError(err.message || "שגיאה בניתוח ההוצאות");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (result?.cancellation_email) {
            navigator.clipboard.writeText(result.cancellation_email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden font-heebo" dir="rtl">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0c1c44]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-200 bg-rose-50 text-rose-700 text-sm font-bold shadow-sm">
                        <Search className="w-4 h-4" /> צייד ההוצאות החכם
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#0c1c44]">
                        זה לא "עוד מנוי קטן". זה <span className="text-rose-500 underline decoration-rose-300">חור בכיס שלך.</span>
                    </h2>
                    <p className="text-slate-600 font-medium max-w-2xl mx-auto text-lg pt-2 leading-relaxed">
                        זרקו לכאן את ההוצאות החודשיות שלכם (נטפליקס, חדר כושר, ספוטיפיי וכו'), וה-AI יאתר את כל מנויי הזבל, יחשב כמה זה עולה לכם בעשור הקרוב, ואף ינסח עבורכם מייל אסרטיבי לביטולם המיידי.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Input Section */}
                    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white h-full flex flex-col">
                        <form onSubmit={handleAnalyze} className="flex flex-col h-full flex-grow">
                            <label className="text-[#0c1c44] font-bold mb-4 text-lg">
                                רשימת הוצאות / מנויים להשמדה:
                            </label>
                            <textarea
                                value={expenses}
                                onChange={(e) => setExpenses(e.target.value)}
                                placeholder="לדוגמה:
נטפליקס 54 שקלים
דיסני פלוס 40
חדר כושר ספייס 150 (פעם אחרונה הייתי בנובמבר)
אפל מיוזיק 20 ואייקלאוד 10..."
                                className="w-full flex-grow min-h-[250px] bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 focus:ring-4 focus:ring-[#d4af37]/20 focus:border-[#d4af37] outline-none resize-none transition-all text-slate-700 font-medium shadow-inner"
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
                                {loading ? (
                                    <span className="animate-spin text-xl">🔍</span>
                                ) : (
                                    <Trash2 className="w-6 h-6 text-[#0c1c44]" />
                                )}
                                <span className={!loading ? "text-[#0c1c44]" : "text-[#0c1c44]"}>{loading ? "ה-AI סורק את ההוצאות שלך..." : "צוד לי את המנויים המיותרים"}</span>
                            </button>
                        </form>
                    </div>

                    {/* Output Section */}
                    <div className="bg-[#0c1c44] rounded-3xl p-8 shadow-2xl border border-[#1e3a8a] text-white relative overflow-hidden flex flex-col justify-center min-h-[450px]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-[60px]" />

                        {!result && !loading && (
                            <div className="text-center opacity-50 relative z-10 flex flex-col items-center">
                                <Search className="w-16 h-16 mb-4 text-[#d4af37]" />
                                <h3 className="text-2xl font-bold">המערכת ממתינה לנתונים</h3>
                                <p className="mt-2 text-sm max-w-[250px] mx-auto leading-relaxed">הזינו את רשימת המנויים שלכם בצד ימין ותראו כמה כסף שורפים סתם.</p>
                            </div>
                        )}

                        {loading && (
                            <div className="text-center relative z-10 space-y-4">
                                <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto" />
                                <h3 className="text-xl font-bold text-[#d4af37]">מנתח חשבוניות והוצאות...</h3>
                            </div>
                        )}

                        {result && !loading && (
                            <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">

                                <div className="bg-rose-950/40 border border-rose-500/30 rounded-2xl p-5 mb-5 shrink-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <TrendingDown className="w-5 h-5 text-rose-400" />
                                            <h4 className="text-rose-400 font-bold">דימום פיננסי חודשי: <span className="text-white text-lg">₪{result.monthly_waste}</span></h4>
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t border-rose-500/20">
                                        <p className="text-xs text-rose-300 font-bold uppercase tracking-wider mb-2">פוטנציאל אובדן לעשור (הפסד ריבית דריבית):</p>
                                        <p className="text-4xl font-black text-rose-500 font-mono tracking-tighter" dir="ltr">₪{result.ten_year_drain}</p>
                                    </div>
                                </div>

                                <div className="mb-5 shrink-0">
                                    <h4 className="font-bold text-[#d4af37] mb-3 flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 rtl:scale-x-[-1]" /> למחוק מיד:
                                    </h4>
                                    <ul className="space-y-2">
                                        {result.wasteful_items.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-white/90 bg-white/5 p-3 rounded-xl border border-white/10 shadow-sm leading-relaxed">
                                                <Trash2 className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex-grow flex flex-col min-h-0">
                                    <div className="flex justify-between items-end mb-3 shrink-0">
                                        <h4 className="font-bold text-[#d4af37] flex items-center gap-2">
                                            <Mail className="w-5 h-5" /> תבנית ביטול במייל:
                                        </h4>
                                        <button
                                            type="button"
                                            onClick={handleCopy}
                                            className="text-[#d4af37] bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 border border-white/5 shadow-sm"
                                        >
                                            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 rtl:scale-x-[-1]" />}
                                            {copied ? "הועתק!" : "העתק מכתב"}
                                        </button>
                                    </div>
                                    <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-4 text-slate-300 text-sm whitespace-pre-wrap font-mono leading-relaxed overflow-y-auto custom-scrollbar flex-grow shadow-inner h-32">
                                        {result.cancellation_email}
                                    </div>
                                </div>

                                <a href="#contact" className="w-full shrink-0 flex items-center justify-center gap-2 py-4 mt-5 bg-white text-[#0c1c44] font-black rounded-xl hover:bg-slate-100 transition-all shadow-lg group">
                                    צריכים עזרה לעצור את הכדור שלג? דברו אתנו
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
