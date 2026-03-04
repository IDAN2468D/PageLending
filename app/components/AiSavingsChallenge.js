"use client";
import { useState } from "react";
import { Trophy, Target, Flag, ArrowLeft, Loader2, TargetIcon, Flame, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiSavingsChallenge() {
    const [target, setTarget] = useState("חופשה משפחתית באירופה");
    const [amount, setAmount] = useState("10000");
    const [loading, setLoading] = useState(false);
    const [challengeData, setChallengeData] = useState(null);

    const startChallenge = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/ai-challenge", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ target, amount })
            });
            const data = await res.json();
            if (data.success) {
                setChallengeData(data.data.days);
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    return (
        <section className="py-24 bg-gradient-to-br from-[#0c1c44] to-blue-900 relative overflow-hidden font-heebo" dir="rtl">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-[80px]"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#d4af37] rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-[#d4af37]/20 rounded-full mb-2">
                        <Flame className="w-8 h-8 text-[#d4af37]" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        אתגר חיסכון <span className="text-[#d4af37]">ב-30 יום</span>
                    </h2>
                    <p className="text-xl text-blue-200 font-medium max-w-2xl mx-auto">
                        משחקים כדי לחסוך. הזינו את החלום שלכם, וקבלו מסלול יום-יומי מותאם אישית שיוביל אתכם בדיוק לשם.
                    </p>
                </div>

                {!challengeData ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-2xl mx-auto border border-white/20 shadow-2xl">
                        <form onSubmit={startChallenge} className="space-y-6">
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-white/80">מה המטרה הגדולה?</label>
                                <div className="relative">
                                    <TargetIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" />
                                    <input
                                        type="text"
                                        value={target}
                                        onChange={(e) => setTarget(e.target.value)}
                                        className="w-full bg-white/5 border border-white/20 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-[#d4af37] transition-all font-bold placeholder-white/30"
                                        placeholder="לדוגמה: כסף לטיול הגדול, לכיסוי המינוס..."
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-white/80">סכום יעד לחיסכון (₪)</label>
                                <div className="relative">
                                    <Trophy className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d4af37]" />
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-white/5 border border-white/20 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-[#d4af37] transition-all font-bold font-mono placeholder-white/30"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 mt-4 bg-[#d4af37] text-[#0c1c44] font-black text-lg rounded-xl hover:bg-[#c29f30] transition-all shadow-lg flex items-center justify-center gap-2 group shadow-[#d4af37]/20"
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Play className="w-6 h-6 fill-current" /> סטרט! צור אתגר אישי</>}
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center max-w-3xl mx-auto shadow-xl">
                            <h3 className="text-3xl font-black text-white mb-2">מסלול משחקי למטרה: {target}</h3>
                            <p className="text-[#d4af37] font-mono text-xl">₪{amount} מחכים לכם בקו הסיום</p>
                        </div>

                        <div className="grid md:grid-cols-5 gap-4">
                            {challengeData.map((day, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white rounded-2xl p-5 shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform"
                                >
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#0c1c44]/5 rounded-bl-full -z-0" />
                                    <div className="text-sm font-black text-slate-400 mb-2 font-mono border-b border-slate-100 pb-2">DAY {day.day}</div>
                                    <h4 className="font-bold text-[#0c1c44] text-lg leading-tight mb-3 min-h-[50px]">{day.title}</h4>
                                    <p className="text-slate-600 text-sm font-medium leading-relaxed mb-4 relative z-10">{day.task}</p>
                                    <div className="mt-auto inline-block px-3 py-1 bg-[#d4af37]/10 text-[#8b6d13] text-xs font-bold rounded-lg relative z-10">
                                        💡 {day.rule}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center pt-8">
                            <p className="text-blue-200 mb-6 font-medium">זה רק טעימה של השבוע הראשון. מוכנים לקחת שליטה?</p>
                            <a href="#contact" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-[#0c1c44] font-black rounded-xl hover:scale-105 transition-all shadow-xl text-lg group">
                                רשמו אותי לליווי צמוד ומלא!
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
