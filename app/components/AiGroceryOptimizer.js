"use client";
import { useState } from "react";
import { ShoppingCart, Loader2, Salad, ArrowLeft, ArrowDownCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AiGroceryOptimizer() {
    const [budget, setBudget] = useState("3500");
    const [people, setPeople] = useState("4");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const getPlan = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/ai-grocery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ budget, people })
            });
            const j = await res.json();
            if (j.success) setData(j.data);
        } catch (e) { }
        setLoading(false);
    };

    return (
        <section className="py-24 bg-orange-50 relative overflow-hidden font-heebo" dir="rtl">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-[#0c1c44]">
                        אלגוריתם עגלת <span className="text-orange-500">הסופר הכלכלית</span>
                    </h2>
                    <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
                        משאירים הון על מוצרי חלב ופירות כל חודש? תן לי לפתור את חוליה החלשה ביותר בתקציב המשפחתי.
                    </p>
                </div>

                {!data ? (
                    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={getPlan} className="max-w-xl mx-auto space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-xl flex items-center flex-col gap-6">
                            <ShoppingCart className="w-16 h-16 text-orange-200" />
                            <div className="w-full space-y-2">
                                <label className="font-bold text-slate-700">תקציב מוערך בחודש לסופר ויציאות? (₪)</label>
                                <input type="number" value={budget} onChange={e => setBudget(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-center text-xl font-bold" />
                            </div>
                            <div className="w-full space-y-2">
                                <label className="font-bold text-slate-700">גודל המשפחה / נפשות בבית</label>
                                <input type="number" value={people} onChange={e => setPeople(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-center text-xl font-bold" />
                            </div>
                            <button type="submit" disabled={loading} className="w-full py-4 bg-orange-500 text-white font-black rounded-xl hover:bg-orange-600 transition flex items-center justify-center gap-2">
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "נקה לי את העגלה לשומן המסחרי"}
                            </button>
                        </div>
                    </motion.form>
                ) : (
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-orange-100 max-w-3xl mx-auto">
                        <div className="bg-orange-500 p-8 text-white relative">
                            <Salad className="absolute top-4 left-4 w-32 h-32 text-orange-400/30" />
                            <div className="relative z-10">
                                <p className="font-bold uppercase tracking-wider text-orange-200 text-sm mb-2">תובנת העגלה שלך</p>
                                <h3 className="text-2xl md:text-3xl font-black leading-tight">{data.analysis}</h3>
                            </div>
                        </div>
                        <div className="p-8 space-y-8">
                            <div>
                                <h4 className="text-lg font-bold text-[#0c1c44] mb-3 flex items-center gap-2"><ArrowDownCircle className="w-5 h-5 text-orange-500" /> אסטרטגיית צמצום הפחת:</h4>
                                <p className="text-slate-600 leading-relaxed font-medium bg-orange-50 p-4 rounded-xl border border-orange-100">{data.savingStrategy}</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-[#0c1c44] mb-4">חוקי ברזל להמשך השבוע:</h4>
                                <ul className="space-y-4">
                                    {data.rules.map((rule, i) => (
                                        <li key={i} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 shrink-0">{i + 1}</div>
                                            <p className="mt-1 text-slate-700 font-medium">{rule}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="text-center pt-4">
                                <button onClick={() => setData(null)} className="text-orange-500 font-bold hover:underline">עדכן נתונים מחדש</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
