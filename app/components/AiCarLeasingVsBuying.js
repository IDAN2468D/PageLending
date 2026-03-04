"use client";
import { useState } from "react";
import { Car, Loader2, Gauge, AlertTriangle, ArrowLeft, PiggyBank, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiCarLeasingVsBuying() {
    const [carPrice, setCarPrice] = useState("120000");
    const [monthlyBudget, setMonthlyBudget] = useState("2500");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const handleCalculate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/ai-car-lease", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ carPrice, monthlyBudget })
            });
            const json = await res.json();
            if (json.success) setData(json.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <section className="py-24 bg-gradient-to-br from-slate-950 to-slate-900 border-y border-slate-800 relative overflow-hidden font-heebo" dir="rtl">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-slate-800 rounded-full mb-2">
                        <Car className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white">קונה או <span className="text-emerald-400">ליסינג?</span></h2>
                    <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
                        אחת ההחלטות הפיננסיות הכי קשות של ישראלים. תן ל-AI של FinSmart לעשות את החשבון מי ינצח בעוד 3 שנים.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {!data ? (
                        <motion.form initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} onSubmit={handleCalculate} className="bg-slate-800/50 backdrop-blur rounded-3xl p-8 border border-slate-700 shadow-2xl">
                            <h3 className="text-2xl font-bold text-white mb-6">מנוע ההחלטות לפח ולגלגלים</h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-slate-300 font-bold block">שווי רב שאתה פוזל אליו (₪)</label>
                                    <input type="number" value={carPrice} onChange={e => setCarPrice(e.target.value)} className="w-full bg-slate-900 border-none rounded-xl px-4 py-4 text-white font-mono text-lg focus:ring-2 focus:ring-emerald-500 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-slate-300 font-bold block">תקציב החזר חודשי להרפתקה (₪)</label>
                                    <input type="number" value={monthlyBudget} onChange={e => setMonthlyBudget(e.target.value)} className="w-full bg-slate-900 border-none rounded-xl px-4 py-4 text-white font-mono text-lg focus:ring-2 focus:ring-blue-500 transition-all" />
                                    <span className="text-xs text-slate-500 block">כולל ביטוח, מימון וטסט.</span>
                                </div>
                                <button type="submit" disabled={loading} className="w-full py-5 bg-gradient-to-l from-emerald-500 to-emerald-600 text-white font-black text-lg rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex justify-center items-center gap-2 group">
                                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Gauge className="w-6 h-6 group-hover:-rotate-45 transition-transform" /> איזה מסלול כדאי?</>}
                                </button>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-800 rounded-3xl overflow-hidden border border-emerald-500/30 relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-bl-full" />
                            <div className="p-8 pb-0">
                                <p className="text-emerald-400 font-bold uppercase tracking-wider mb-2">המנצח המוחלט הוכרז:</p>
                                <h3 className="text-5xl font-black text-white mb-6">{data.winner}</h3>
                                <p className="text-slate-300 text-lg leading-relaxed mb-8">{data.explanation}</p>
                            </div>
                            <div className="bg-slate-900 p-8 border-t border-slate-800">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex justify-center items-center border border-emerald-500/20"><PiggyBank className="w-6 h-6 text-emerald-400" /></div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-400">יתרון משוער למנצח ב-3 שנים</p>
                                        <p className="text-3xl font-black text-emerald-400 font-mono">₪{data.savings}</p>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    {data.tips.map((tip, i) => (
                                        <li key={i} className="flex gap-3 text-slate-300 text-sm font-medium"><CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" /> {tip}</li>
                                    ))}
                                </ul>
                                <button onClick={() => setData(null)} className="mt-8 text-sm font-bold text-slate-500 hover:text-white transition-colors">בדוק רכב אחר...</button>
                            </div>
                        </motion.div>
                    )}

                    <div className="hidden md:flex flex-col justify-center gap-8 pl-12 border-r border-slate-800">
                        <div className="flex items-start gap-4 opacity-50"><AlertTriangle className="w-8 h-8 text-yellow-500 shrink-0" /><div><h4 className="text-white font-bold mb-1">פחת של הניילונים</h4><p className="text-sm text-slate-400">רכב חדש מאבד עד 20% מערכו בשנייה שהוא יוצא מהסוכנות.</p></div></div>
                        <div className="flex items-start gap-4 opacity-50"><AlertTriangle className="w-8 h-8 text-emerald-500 shrink-0" /><div><h4 className="text-white font-bold mb-1">שקט פסיכולוגי בטיפולים</h4><p className="text-sm text-slate-400">קבלנים חמישים שקלים על תיקונים? ליסינג תפעולי סופג את הטסט והמוסך.</p></div></div>
                        <div className="flex items-start gap-4 opacity-50"><AlertTriangle className="w-8 h-8 text-blue-500 shrink-0" /><div><h4 className="text-white font-bold mb-1">קנס החזרת מפתח</h4><p className="text-sm text-slate-400">בסוף 3 שנים בליסינג הפיננסי אין מפתח ואין רכב הכל שלך נשאר בידי החברה.</p></div></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
