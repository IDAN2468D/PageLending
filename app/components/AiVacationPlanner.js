"use client";
import { useState } from "react";
import { Plane, MapPin, Calendar, CreditCard, Sparkles, CheckSquare, ArrowDown, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiVacationPlanner() {
    const [formData, setFormData] = useState({ destination: "", cost: "", months: "" });
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState(null);

    const handlePlan = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/ai-vacation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!data.error) setPlan(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-gradient-to-br from-indigo-50/50 to-white relative overflow-hidden" dir="rtl">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Intro Side */}
                <div className="space-y-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 text-sm font-bold shadow-sm">
                        <Map className="w-4 h-4" /> קסם הדד-ליין
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#0c1c44] leading-tight">
                        אל תגידו "אין לי כסף" לחופשה. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-l from-indigo-500 to-cyan-400">בואו נכבוש את היעד!</span>
                    </h2>
                    <p className="text-slate-600 font-medium text-lg leading-relaxed">
                        ה-AI שלנו ירכיב לכם תוכנית דיאטה תזרימית ספציפית ליעד הבא שלכם. אנחנו מבטיחים לכם שזה קל ממה שאתם חושבים, ולפעמים שווה לוותר על כמה קטנות כדי לשתות קוקטייל במלדיביים.
                    </p>

                    <form onSubmit={handlePlan} className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 space-y-4">
                        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <MapPin className="w-5 h-5 text-indigo-400 mr-2" />
                            <input required type="text" placeholder="ספרו לנו לאן טסים (למשל: תאילנד)"
                                className="w-full bg-transparent outline-none font-medium text-slate-700"
                                value={formData.destination} onChange={e => setFormData({ ...formData, destination: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100 flex-1">
                                <CreditCard className="w-5 h-5 text-indigo-400 mr-2" />
                                <input required type="number" placeholder="עלות מוערכת (₪)"
                                    className="w-full bg-transparent outline-none font-medium text-slate-700"
                                    value={formData.cost} onChange={e => setFormData({ ...formData, cost: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100 w-32 shrink-0">
                                <Calendar className="w-5 h-5 text-indigo-400 mr-2" />
                                <input required type="number" placeholder="חודשים"
                                    className="w-full bg-transparent outline-none font-medium text-slate-700 text-center"
                                    value={formData.months} onChange={e => setFormData({ ...formData, months: e.target.value })}
                                />
                            </div>
                        </div>
                        <button disabled={loading} type="submit" className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-70">
                            {loading ? <span className="animate-spin text-xl">⏳</span> : <Plane className="w-5 h-5 rtl:-scale-x-100" />}
                            {loading ? "מחשב מסלול חסכון..." : "המריאו אותי עכשיו"}
                        </button>
                    </form>
                </div>

                {/* Output Side */}
                <div className="relative min-h-[400px] flex items-center justify-center">
                    <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-[100px] -z-10" />

                    <AnimatePresence>
                        {plan && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="bg-[#0c1c44] text-white p-8 rounded-[2rem] shadow-2xl relative w-full border border-indigo-900 overflow-hidden"
                            >
                                <Sparkles className="absolute top-6 left-6 w-24 h-24 text-white/5" />

                                <h3 className="text-2xl font-black mb-6 text-indigo-200">
                                    הנוסחה ל{formData.destination} שלכם:
                                </h3>

                                <div className="bg-indigo-950/50 p-6 rounded-2xl border border-indigo-800 mb-6 text-center">
                                    <p className="text-indigo-300 text-sm font-bold mb-1">היעד החודשי החדש שלכם:</p>
                                    <p className="text-5xl font-black text-white font-mono tracking-tighter" dir="ltr">₪{plan.monthly_saving}</p>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <p className="font-bold text-lg border-b border-indigo-800 pb-2">מאיפה מקזזים בלי להרגיש?</p>
                                    <ul className="space-y-3 font-medium text-indigo-100 text-sm">
                                        <li className="flex items-start gap-3">
                                            <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                                            {plan.sacrifice_1}
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                                            {plan.sacrifice_2}
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-r from-[#d4af37]/20 to-transparent p-4 rounded-xl border-r-4 border-[#d4af37]">
                                    <p className="text-sm font-medium leading-relaxed">{plan.punchline}</p>
                                </div>

                                <a href="#contact" className="block text-center w-full mt-6 py-4 bg-white text-[#0c1c44] font-black rounded-xl hover:bg-slate-100 transition-all shadow-lg">
                                    בואו לתכנן משהו גדול יותר
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}
