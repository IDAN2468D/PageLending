"use client";
import { useState, useRef } from "react";
import { ScanFace, Upload, Copy, CheckCircle, Search, AlertCircle, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiReceiptScanner() {
    const [status, setStatus] = useState("idle"); // idle, scanning, result
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState(false);
    const [expenseType, setExpenseType] = useState("דמי ניהול פנסיה");
    const [amount, setAmount] = useState("2000");
    const fileInputRef = useRef(null);

    const handleSimulateScan = async () => {
        setStatus("scanning");
        try {
            const res = await fetch("/api/ai-receipt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ expenseType, amount })
            });
            const data = await res.json();
            if (data.success && data.data) {
                setResult(data.data);
            }
        } catch (error) {
            console.error(error);
        }
        setStatus("result");
    };

    return (
        <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden font-heebo" dir="rtl">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-[#0c1c44]">
                        סורק <span className="text-[#d4af37]">החשבוניות ודמי הניהול</span> החכם
                    </h2>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                        העלו את הדוח השנתי שלכם או החשבונית החודשית (או הזינו נתונים) וה-AI שלנו יציג לכם מיד את "השומן" שאפשר לחתוך - כולל ניסוח מכתב דרישה לחברה.
                    </p>
                </div>

                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-12 relative">

                    {/* Left/Right Input Area */}
                    <div className="flex-1 space-y-6">
                        <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#d4af37] transition-all relative overflow-hidden"
                            onClick={() => fileInputRef.current?.click()}>

                            {status === "scanning" && (
                                <motion.div
                                    className="absolute w-full h-1 bg-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.8)] z-10"
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                            )}

                            <Upload className="w-12 h-12 text-slate-400 mb-4" />
                            <p className="font-bold text-[#0c1c44] text-lg">גררו מסמך לכאן</p>
                            <p className="text-sm text-slate-500">או לחצו להעלאת קובץ (PDF/Image)</p>
                            <input type="file" className="hidden" ref={fileInputRef} accept="image/*,.pdf" onChange={handleSimulateScan} />
                        </div>

                        <div className="relative flex items-center gap-4 py-2">
                            <div className="flex-grow border-t border-slate-200"></div>
                            <span className="text-slate-400 font-bold text-sm">או הקלדה ידנית לבדיקה</span>
                            <div className="flex-grow border-t border-slate-200"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-600">סוג הוצאה (למשל: תקשורת, ביטוח)</label>
                                <input
                                    type="text"
                                    value={expenseType}
                                    onChange={e => setExpenseType(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-600">עלות נוכחית (₪)</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSimulateScan}
                            disabled={status === "scanning"}
                            className="w-full py-4 bg-[#0c1c44] text-white font-black rounded-xl hover:bg-[#0c1c44]/90 transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === "scanning" ? (
                                <><ScanFace className="w-5 h-5 animate-pulse" /> מפענח נתונים...</>
                            ) : (
                                <><Search className="w-5 h-5 group-hover:scale-110 transition-transform" /> סרוק וגלה חסכון</>
                            )}
                        </button>
                    </div>

                    {/* Results Area */}
                    <AnimatePresence mode="wait">
                        {status === "result" && result && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex-1 bg-[#0c1c44] rounded-2xl p-8 text-white flex flex-col relative overflow-hidden shadow-[0_0_40px_rgba(12,28,68,0.2)]"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/20 rounded-bl-full blur-2xl" />

                                <div className="flex items-center gap-3 mb-6 relative z-10">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-[#d4af37]">אנליזה הושלמה</h3>
                                        <p className="text-slate-300 text-sm">פוטנציאל חסכון: ₪{result.potentialSavings}/לחודש</p>
                                    </div>
                                </div>

                                <div className="space-y-5 flex-grow relative z-10">
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <p className="font-semibold text-emerald-300 flex items-center gap-2 mb-1"><AlertCircle className="w-4 h-4" /> ממצאי הסריקה:</p>
                                        <p className="text-slate-300 text-sm leading-relaxed">{result.analysis}</p>
                                    </div>

                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <p className="font-semibold text-emerald-300 flex items-center gap-2 mb-1"><CheckCircle className="w-4 h-4" /> הפעולה שלך:</p>
                                        <p className="text-slate-300 text-sm">{result.actionPlan}</p>
                                    </div>

                                    <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 relative group">
                                        <p className="text-xs text-slate-400 mb-2 font-bold uppercase tracking-wider flex items-center gap-1"><FileText className="w-3 h-3" /> תבנית מוכנה להעתקה:</p>
                                        <p className="text-sm text-slate-300 leading-relaxed font-mono">"{result.template}"</p>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(result.template);
                                                setCopied(true);
                                                setTimeout(() => setCopied(false), 2000);
                                            }}
                                            className="absolute top-4 left-4 p-2 bg-white/10 rounded-lg hover:bg-[#d4af37] text-white transition-colors"
                                        >
                                            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {status === "idle" && (
                        <div className="flex-1 hidden md:flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                            <div className="text-center opacity-50">
                                <ScanFace className="w-16 h-16 mx-auto mb-4 text-[#0c1c44]" />
                                <p className="font-bold text-slate-500">העלו את החשבונית כדי לראות קסם.</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
