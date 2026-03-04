"use client";
import { useState } from "react";
import { Baby, Loader2, FileSignature, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AiKidsAllowance() {
    const [ages, setAges] = useState("בנים בני 8 ו-11");
    const [behaviors, setBehaviors] = useState("מוציאים כסף רק על סקינים במשחקים או חטיפים בגינה.");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const generateContract = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/ai-kids", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ages, behaviors })
            });
            const j = await res.json();
            if (j.success) setData(j.data);
        } catch (e) { }
        setLoading(false);
    };

    return (
        <section className="py-24 bg-sky-50 relative overflow-hidden font-heebo border-t border-sky-100" dir="rtl">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-[#0c1c44]">
                        חינוך פיננסי <span className="text-sky-500">לילדים</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                        דמי הכיס הם הסיכוי הכי טוב של הילדים להבין את ערך הכסף. הזן את המצב בבית, וקבל חוזה מוכן להדפסה שמייצר משמעת חיסכון כבר מגיל 5.
                    </p>
                </div>

                {!data ? (
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(2,132,199,0.2)] border border-sky-100">
                        <form onSubmit={generateContract} className="space-y-6">
                            <div className="space-y-2">
                                <label className="font-bold text-slate-700">בני כמה הילדים המשתתפים?</label>
                                <input type="text" value={ages} onChange={e => setAges(e.target.value)} className="w-full border-b-2 border-slate-200 py-3 bg-transparent focus:outline-none focus:border-sky-500 transition-colors font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="font-bold text-slate-700">תארו את הרגלי הצרכנות שלהם היום:</label>
                                <textarea rows="2" value={behaviors} onChange={e => setBehaviors(e.target.value)} className="w-full border-b-2 border-slate-200 py-3 bg-transparent focus:outline-none focus:border-sky-500 transition-colors font-medium resize-none" />
                            </div>
                            <button type="submit" disabled={loading} className="w-full py-4 mt-4 bg-sky-500 text-white font-black rounded-xl hover:bg-sky-600 transition flex items-center justify-center gap-2">
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><FileSignature className="w-5 h-5" /> הדפס חוזה דמי כיס עכשיו</>}
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto bg-amber-50 rounded-lg p-8 md:p-12 shadow-2xl relative" style={{ backgroundImage: `radial-gradient(#d4af37 1px, transparent 1px)`, backgroundSize: `20px 20px` }}>
                        <div className="bg-white/95 backdrop-blur p-8 rounded-xl shadow-lg border border-amber-200 relative">
                            <div className="absolute top-4 right-4 w-12 h-12 bg-sky-100 rounded-full flex justify-center items-center opacity-80 border-2 border-white"><Baby className="w-6 h-6 text-sky-600" /></div>

                            <h3 className="text-3xl font-black text-center text-[#0c1c44] mb-8 font-serif border-b-2 border-amber-200 pb-4">{data.contractTitle}</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="font-bold text-amber-800 text-sm tracking-wider uppercase mb-2">חלוקת הון שבועית מחייבת (דמי כיס):</p>
                                    <div className="bg-sky-50 text-sky-700 p-4 rounded-lg font-black font-mono text-center text-xl tracking-tighter shadow-inner border border-sky-100">
                                        {data.savingsSplit}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="font-bold text-amber-800 text-sm tracking-wider uppercase mb-2">תנאי הברזל בהסכם:</p>
                                    {data.rules.map((rule, i) => (
                                        <p key={i} className="flex gap-3 text-slate-700 font-medium leading-relaxed bg-slate-50 p-3 rounded-lg"><CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" /> {rule}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-10 border-t border-slate-200 pt-6 text-center space-y-6">
                                <p className="text-sm text-slate-500 italic">"{data.message}"</p>
                                <div className="flex justify-around items-end pt-8">
                                    <div className="w-32 border-b-2 border-slate-800 pb-2 font-handwriting text-slate-700">חתימת ההורה</div>
                                    <div className="w-32 border-b-2 border-slate-800 pb-2 font-handwriting text-slate-700">חתימת הילד</div>
                                </div>
                                <div className="pt-4">
                                    <button onClick={() => setData(null)} className="text-xs font-bold text-amber-600 underline">צור חוזה נוסף לילד אחר</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
