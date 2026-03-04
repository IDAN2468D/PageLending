"use client";
import { useState } from "react";
import { Handshake, Loader2, Sparkles, MessageCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiSalaryNegotiator() {
    const [role, setRole] = useState("מתכנת Full Stack");
    const [currentSalary, setCurrentSalary] = useState("20000");
    const [experience, setExperience] = useState("3");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const submitNegotiation = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/ai-salary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role, currentSalary, experience })
            });
            const j = await res.json();
            if (j.success) setData(j.data);
        } catch (e) { }
        setLoading(false);
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden font-heebo" dir="rtl">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-[#0c1c44]">
                        סימולטור <span className="text-purple-600">העלאת השכר בישראל</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                        לא יודעים מה לומר לבוס? הזינו נתונים ותנו לסוכן ה-AI הפיננסי לכתוב לכם תסריט למשא ומתן שידחוף את השכר שלכם למעלה.
                    </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 max-w-3xl mx-auto shadow-2xl relative">
                    {!data ? (
                        <form onSubmit={submitNegotiation} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="font-bold text-slate-700">תפקיד נוכחי בחברה</label>
                                    <input type="text" value={role} onChange={e => setRole(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-purple-200" placeholder="לדוגמה: מנהלת דיגיטל" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-slate-700">השכר החודשי היום (₪)</label>
                                    <input type="number" value={currentSalary} onChange={e => setCurrentSalary(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-purple-200" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="font-bold text-slate-700">שנות ניסיון במקצוע בלבד</label>
                                    <input type="number" value={experience} onChange={e => setExperience(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-purple-200" />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} className="w-full py-4 bg-purple-600 text-white font-black rounded-xl hover:bg-purple-700 transition shadow-lg flex items-center justify-center gap-2">
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Handshake className="w-5 h-5" /> נתח פערי שכר וסימולציה</>}
                            </button>
                        </form>
                    ) : (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <Info className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
                                <div><h4 className="font-bold text-[#0c1c44] mb-1">ניתוח מעמד בשוק</h4><p className="text-slate-600 text-sm leading-relaxed">{data.analysis}</p></div>
                            </div>

                            <div className="flex items-center gap-4 bg-purple-50 p-6 rounded-2xl border border-purple-100">
                                <div className="p-3 bg-purple-200 text-purple-700 rounded-xl font-black text-xl">TARGET:</div>
                                <div className="text-2xl font-black text-purple-800">{data.targetSalary}</div>
                            </div>

                            <div className="bg-[#0c1c44] text-white p-6 rounded-2xl relative">
                                <MessageCircle className="absolute top-4 right-4 w-6 h-6 text-slate-600" />
                                <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">תסריט השיחה המוכן שלך</h4>
                                <p className="font-medium text-lg leading-relaxed pt-2 border-t border-slate-700">"{data.script}"</p>
                            </div>

                            <div className="text-center pt-4">
                                <p className="text-sm font-bold text-slate-500 mb-2">💡 טיפ הבונוס מה-AI: {data.bonusTip}</p>
                                <button onClick={() => setData(null)} className="text-purple-600 font-bold text-sm hover:underline">נסה מקצוע אחר</button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
