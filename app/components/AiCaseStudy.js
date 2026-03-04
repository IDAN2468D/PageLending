"use client";
import { useState } from "react";
import { Users, FileText, ArrowRight, CheckCircle, TrendingUp, Sparkles, Building, Briefcase, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiCaseStudy() {
    const [selectedPersona, setSelectedPersona] = useState(null);
    const [caseStudy, setCaseStudy] = useState(null);
    const [loading, setLoading] = useState(false);

    const personas = [
        { id: "tech", icon: <Briefcase className="w-5 h-5" />, title: "הייטקיסט / מרוויח יפה", desc: "הכנסה גבוהה אבל הכל נבלע במינוס או מתבזבז בבנק ללא תשואה." },
        { id: "family", icon: <Building className="w-5 h-5" />, title: "זוג צעיר שחולם למסד דירה", desc: "קושי לצבור הון עצמי תוך תשלום שכירות ומחיה גבוהה." },
        { id: "debt", icon: <TrendingUp className="w-5 h-5" />, title: "שכירים במינוס או חובות", desc: "מחזירים הלוואות רק כדי לסגור הלוואות אחרות וחולמים להשתקם." },
        { id: "divorced", icon: <Heart className="w-5 h-5" />, title: "פרק ב' או גרושים", desc: "מתמודדים עם מציאות כלכלית חדשה, מזונות וחלוקת רכוש." }
    ];

    const generateCaseStudy = async (persona) => {
        setSelectedPersona(persona.id);
        setCaseStudy(null);
        setLoading(true);

        try {
            const res = await fetch("/api/ai-case-study", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ personaName: persona.title, personaDesc: persona.desc })
            });
            const data = await res.json();
            if (!data.error) {
                setCaseStudy(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden" dir="rtl">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0c1c44]/10 bg-[#0c1c44]/5 text-[#0c1c44] text-sm font-bold shadow-sm">
                        <Sparkles className="w-4 h-4 text-[#d4af37]" /> סיפורי הצלחה בהתאמה אישית חכמה
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-[#0c1c44]">
                        מישהו <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#d4af37] to-[#f0cc60]">במצב שלך</span> עשה את זה.
                    </h2>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg pt-2">
                        בחר את הפרופיל שהכי קרוב אליך כרגע, ותראה סיפור הצלחה אמיתי שמציג איך הפכנו את הקערה על פיה לקוח במצב זהה.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Personas Selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {personas.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => generateCaseStudy(p)}
                                className={`text-right p-6 rounded-2xl border transition-all duration-300 flex flex-col gap-3 group overflow-hidden relative ${selectedPersona === p.id
                                        ? "bg-[#0c1c44] border-transparent shadow-xl"
                                        : "bg-slate-50 border-slate-200 hover:border-[#d4af37]/50 hover:bg-slate-100"
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner transition-colors ${selectedPersona === p.id ? "bg-white/10 text-[#d4af37]" : "bg-white text-[#0c1c44] group-hover:bg-[#d4af37]/10"
                                    }`}>
                                    {p.icon}
                                </div>
                                <div>
                                    <h3 className={`font-black mb-1 transition-colors ${selectedPersona === p.id ? "text-white" : "text-[#0c1c44]"}`}>
                                        {p.title}
                                    </h3>
                                    <p className={`text-sm leading-relaxed transition-colors ${selectedPersona === p.id ? "text-white/70" : "text-slate-500"}`}>
                                        {p.desc}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Dynamic Case Study Display */}
                    <div className="relative min-h-[400px]">
                        {/* Empty State */}
                        {!loading && !caseStudy && (
                            <div className="absolute inset-0 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                                <Users className="w-16 h-16 text-slate-300 mb-4" />
                                <h4 className="text-xl font-bold text-slate-400">בחר פרופיל כדי לחשוף חולשת עבר שהפכה להצלחה גדולה.</h4>
                            </div>
                        )}

                        {/* Loading State */}
                        {loading && (
                            <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl border border-slate-100 p-10 flex flex-col justify-center gap-6">
                                <div className="flex gap-4 items-center animate-pulse">
                                    <div className="w-16 h-16 bg-slate-200 rounded-2xl" />
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 bg-slate-200 w-1/3 rounded-full" />
                                        <div className="h-3 bg-slate-100 w-1/4 rounded-full" />
                                    </div>
                                </div>
                                <div className="space-y-3 pt-6 border-t border-slate-100">
                                    <div className="h-3 bg-slate-200 w-full rounded-full animate-pulse delay-75" />
                                    <div className="h-3 bg-slate-200 w-5/6 rounded-full animate-pulse delay-150" />
                                    <div className="h-3 bg-emerald-100 w-2/3 rounded-full animate-pulse delay-300" />
                                </div>
                            </div>
                        )}

                        {/* Result State */}
                        <AnimatePresence>
                            {!loading && caseStudy && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-[#0c1c44] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden"
                                >
                                    {/* Decoration */}
                                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#d4af37]/20 rounded-full blur-[40px] -z-0" />
                                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-[50px] -z-0" />
                                    <FileText className="absolute -top-10 -right-10 w-40 h-40 text-white/5 -rotate-12" />

                                    <div className="relative z-10 space-y-8">

                                        <div>
                                            <span className="text-[#d4af37] text-xs font-bold uppercase tracking-widest border border-[#d4af37]/30 px-3 py-1 rounded-full">תיק לקוח</span>
                                            <h3 className="text-3xl font-black text-white mt-4">{caseStudy.client_name}</h3>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Before */}
                                            <div className="bg-rose-950/30 p-5 rounded-2xl border border-rose-500/20">
                                                <p className="text-xs text-rose-300 font-bold mb-1">הנקודה שבה נפגשנו (כאב):</p>
                                                <p className="text-white/90 text-sm leading-relaxed">{caseStudy.before_situation}</p>
                                            </div>

                                            {/* Action */}
                                            <div className="flex items-center gap-3 pr-2">
                                                <div className="h-full w-0.5 bg-[#d4af37]/50 rounded-full" />
                                                <div className="py-2">
                                                    <p className="text-xs text-[#d4af37] font-bold mb-1">תרופת הנגד המקצועית שלנו:</p>
                                                    <p className="text-white/80 text-sm leading-relaxed">{caseStudy.action_taken}</p>
                                                </div>
                                            </div>

                                            {/* After */}
                                            <div className="bg-emerald-950/40 p-5 rounded-2xl border border-emerald-500/20 shadow-inner">
                                                <p className="text-xs text-emerald-400 font-bold mb-1 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> איפה הם היום:</p>
                                                <p className="text-white font-medium text-sm leading-relaxed">{caseStudy.after_situation}</p>
                                            </div>
                                        </div>

                                        <a href="#contact" className="w-full mt-4 py-4 bg-[#d4af37] text-[#0c1c44] font-black rounded-xl hover:bg-[#c29f30] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 group">
                                            זה יהיה הסיפור הבא שלכם
                                            <ArrowRight className="w-4 h-4 rtl:-scale-x-100 group-hover:-translate-x-1 transition-transform" />
                                        </a>

                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
