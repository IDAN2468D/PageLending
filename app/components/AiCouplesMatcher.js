"use client";
import { useState } from "react";
import { Users, Heart, ArrowLeft, Loader2, Sparkles, User, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiCouplesMatcher() {
    const [partner1, setPartner1] = useState("אני אוהב לבזבז על מסעדות וגאדג'טים, חושב שצריך לחיות את הרגע.");
    const [partner2, setPartner2] = useState("אני חוסכת הכל. פוחדת מהמינוס ורוצה דירה משלנו.");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/ai-couples", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ partner1, partner2 })
            });
            const data = await res.json();
            if (data.success) {
                setResult(data.data);
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <section className="py-24 bg-rose-50/50 relative overflow-hidden font-heebo" dir="rtl">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-[#0c1c44]">
                        המגשר הפיננסי <span className="text-rose-500">לזוגות</span>
                    </h2>
                    <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
                        ריבים על כסף בבית? תנו ל-AI שלנו למצוא את הנוסחה המתמטית והרגשית המדויקת שמאזנת בין השאיפות של שניכם לשלום בית כלכלי.
                    </p>
                </div>

                {!result ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-rose-100 max-w-4xl mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4 relative">
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10"><User className="w-4 h-4 text-blue-600" /></div>
                                    <label className="block text-lg font-bold text-[#0c1c44] border-b-2 border-blue-100 pb-2">תפיסת העולם הפיננסית של בן/בת זוג א׳</label>
                                    <textarea
                                        rows="4"
                                        value={partner1}
                                        onChange={e => setPartner1(e.target.value)}
                                        className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-200 resize-none font-medium text-slate-700"
                                        placeholder="תאר/י בכמה מילים את הגישה שלך לכסף..."
                                    />
                                </div>
                                <div className="space-y-4 relative">
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10"><User className="w-4 h-4 text-pink-600" /></div>
                                    <label className="block text-lg font-bold text-[#0c1c44] border-b-2 border-pink-100 pb-2">תפיסת העולם הפיננסית של בן/בת זוג ב׳</label>
                                    <textarea
                                        rows="4"
                                        value={partner2}
                                        onChange={e => setPartner2(e.target.value)}
                                        className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-pink-200 resize-none font-medium text-slate-700"
                                        placeholder="תאר/י בכמה מילים את הגישה שלו/שלה (הצד השני)..."
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto md:mx-auto md:px-16 py-4 bg-rose-500 text-white font-black rounded-xl hover:bg-rose-600 transition-all shadow-lg flex items-center justify-center gap-2 group mx-auto block"
                            >
                                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> מגשר בין הגישות...</> : <><Heart className="w-5 h-5 group-hover:scale-110 transition-transform" /> מצא את הפשרה המושלמת</>}
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-rose-200 max-w-4xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 rounded-full mb-4">
                            <Sparkles className="w-10 h-10 text-rose-500" />
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 relative">
                            <Quote className="absolute top-4 right-4 w-8 h-8 text-slate-200" />
                            <h3 className="text-2xl font-black text-[#0c1c44] mb-4">הפסיכולוג הפיננסי אומר:</h3>
                            <p className="text-lg text-slate-700 font-medium leading-relaxed max-w-2xl mx-auto">{result.compromise}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 text-right">
                            <div className="bg-[#0c1c44] text-white p-6 rounded-2xl shadow-lg">
                                <h4 className="font-bold text-[#d4af37] mb-2 uppercase tracking-wide text-sm">היעד המשותף החדש</h4>
                                <p className="font-medium text-lg leading-tight">{result.savingsGoal}</p>
                            </div>
                            <div className="bg-white border text-right border-slate-200 p-6 rounded-2xl shadow-sm">
                                <h4 className="font-bold text-rose-500 mb-3 uppercase tracking-wide text-sm">3 צעדי זהב לביצוע השבוע</h4>
                                <ul className="space-y-3">
                                    {result.actionItems.map((item, idx) => (
                                        <li key={idx} className="flex gap-2">
                                            <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs shrink-0">{idx + 1}</div>
                                            <span className="text-slate-600 text-sm font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-center gap-4">
                            <button onClick={() => setResult(null)} className="px-8 py-3 text-slate-500 hover:text-[#0c1c44] font-bold transition-colors">נסה זוגיות פיננסית אחרת</button>
                            <a href="#contact" className="px-8 py-3 bg-[#d4af37] text-[#0c1c44] font-black rounded-xl hover:bg-[#c29f30] transition-colors shadow-lg">נקבע פגישת איחוד תיקים</a>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
