"use client";
import { useState } from "react";
import { FileSearch, Loader2, Landmark, CheckSquare, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function AiTaxRefunder() {
    const [details, setDetails] = useState("עברתי דירה השנה ונולד לי ילד.");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const getTaxInfo = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/ai-tax", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ details })
            });
            const j = await res.json();
            if (j.success) setData(j.data);
        } catch (e) { }
        setLoading(false);
    };

    return (
        <section className="py-24 bg-[#0c1c44] text-white relative overflow-hidden font-heebo" dir="rtl">
            <div className="absolute top-0 right-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black">
                        בלש <span className="text-teal-400">החזרי המס</span> של FinSmart
                    </h2>
                    <p className="text-xl text-slate-400 font-medium">
                        שכירים? המדינה חייבת לכם אלפי שקלים ששוכבים במס הכנסה. ספרו ל-AI על ה-6 שנים האחרונות שלכם (החלפות עבודה, ילדים נולדו) ובואו נגלה כמה.
                    </p>
                </div>

                {!data ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                        <form onSubmit={getTaxInfo} className="space-y-6">
                            <label className="block text-lg font-bold">ספר לנו בנקודות מה השתנה אצלך השנים האחרונות:</label>
                            <textarea
                                rows="3"
                                value={details}
                                onChange={e => setDetails(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:border-teal-400 focus:ring-1 focus:ring-teal-400 resize-none font-medium text-lg leading-relaxed"
                            />
                            <div className="flex flex-wrap gap-2 mb-4">
                                {["עברתי עיר", "סיימתי תואר", "השתחררתי מהצבא", "משכתי פיצויים", "החלפתי חברה"].map(tag => (
                                    <span key={tag} className="text-xs bg-white/10 px-3 py-1 rounded-full text-slate-300">💡 {tag}</span>
                                ))}
                            </div>
                            <button type="submit" disabled={loading} className="w-full md:w-auto px-12 py-4 bg-teal-500 text-[#0c1c44] font-black rounded-xl hover:bg-teal-400 transition flex items-center justify-center gap-2 mx-auto">
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5" /> חשב הסתברות להחזר כספי</>}
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                        <div className="grid md:grid-cols-2">
                            <div className="bg-teal-500 p-10 text-[#0c1c44] flex flex-col justify-center">
                                <Landmark className="w-16 h-16 text-[#0c1c44]/30 mb-6" />
                                <p className="font-bold uppercase tracking-wider text-sm mb-2 opacity-80">צפי הכסף שחוזר לחשבון שלך</p>
                                <h3 className="text-5xl font-black mb-6">₪{data.estimatedAmount}</h3>
                                <div className="bg-white/30 backdrop-blur rounded-xl p-4 inline-block w-max">
                                    <p className="font-bold text-sm">סיכוי לזכאות ע"פ ה-AI: {data.probability}%</p>
                                </div>
                            </div>
                            <div className="p-10 text-slate-800 space-y-6">
                                <p className="font-medium leading-relaxed">{data.message}</p>
                                <div className="border-t border-slate-200 pt-6">
                                    <h4 className="font-bold text-[#0c1c44] mb-4 text-sm uppercase tracking-wider">3 מסמכים שתצטרך להכין לפגישה:</h4>
                                    <ul className="space-y-3">
                                        {data.missingDocs.map((doc, i) => (
                                            <li key={i} className="flex items-center gap-3 font-medium text-sm text-slate-600"><CheckSquare className="w-5 h-5 text-teal-500 shrink-0" /> {doc}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="pt-4">
                                    <button onClick={() => setData(null)} className="text-sm font-bold text-slate-400 hover:text-slate-700 w-full text-center outline-none">סגור ובדוק שוב</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
