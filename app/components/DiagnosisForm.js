"use client";
import { useState, useRef } from "react";
import { CheckCircle, ArrowLeft, ArrowRight, Wallet, Target, TrendingUp, ShieldCheck, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitLead } from "../actions/contact";
import { toast } from "./Toaster";

const STEPS = [
    {
        title: "מה היעד הכלכלי העיקרי שלך?",
        key: "goal",
        options: [
            { label: "חיסכון לדירה", icon: <Wallet className="w-6 h-6" /> },
            { label: "צמיחת הון והשקעות", icon: <TrendingUp className="w-6 h-6" /> },
            { label: "יציאה מחובות", icon: <ShieldCheck className="w-6 h-6" /> },
            { label: "ניהול תקציב נכון", icon: <Target className="w-6 h-6" /> },
        ]
    },
    {
        title: "מה המצב המשפחתי שלך?",
        key: "status",
        options: [
            { label: "רווק/ה", icon: <Users size={18} /> },
            { label: "נשוי/אה", icon: <Users size={18} /> },
            { label: "נשוי/אה + ילדים", icon: <Users size={18} /> },
        ]
    },
    {
        title: "מה רמת ההכנסה החודשית?",
        key: "income",
        options: [
            { label: "עד ₪10,000", value: "low" },
            { label: "₪10,000 - ₪20,000", value: "mid" },
            { label: "₪20,000 ומעלה", value: "high" },
        ]
    }
];

export default function DiagnosisForm() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [formVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const formRef = useRef();

    const next = (val) => {
        setAnswers({ ...answers, [STEPS[step].key]: val });
        if (step < STEPS.length - 1) {
            setStep(step + 1);
        } else {
            setFormVisible(true);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.target);
        fd.append("message", `אבחון פיננסי: יעד: ${answers.goal}, סטטוס: ${answers.status}, הכנסה: ${answers.income}`);
        fd.append("source", "financial_diagnosis_form");

        const res = await submitLead(fd);
        setLoading(false);
        if (res.success) {
            toast("האבחון נשלח! נחזור אליך תוך 24 שעות.");
            window.location.href = "/thank-you";
        } else {
            toast("שגיאה בשליחה. ניסיון נוסף בקרוב.", "error");
        }
    };

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-800/20">
            <div className="container mx-auto px-6 max-w-2xl text-center">
                <div className="mb-12">
                    <h2 className="text-4xl font-black text-[#0c1c44] dark:text-white mb-4">
                        אבחון פיננסי מהיר <span className="text-[#d4af37]">(חינם)</span>
                    </h2>
                    <p className="text-slate-500 font-medium">ענו על 3 שאלות קצרות וקבלו בחינם הערכה ראשונית למצבכם הכלכלי.</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-10 min-h-[400px] relative overflow-hidden flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {!formVisible ? (
                            <motion.div
                                key={step}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                className="space-y-8"
                            >
                                <h3 className="text-2xl font-black text-[#0c1c44] dark:text-white mb-8">{STEPS[step].title}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {STEPS[step].options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => next(opt.label)}
                                            className="p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-[#d4af37] dark:hover:border-[#d4af37] hover:bg-[#d4af37]/5 transition-all text-right group flex items-center justify-between"
                                        >
                                            <span className="font-bold text-[#0c1c44] dark:text-white text-lg group-hover:text-[#d4af37]">{opt.label}</span>
                                            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 group-hover:text-[#d4af37]">
                                                {opt.icon || <ArrowLeft size={18} />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="flex justify-center gap-2 mt-12">
                                    {STEPS.map((_, i) => (
                                        <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-8 bg-[#d4af37]" : "w-1.5 bg-slate-200 dark:bg-slate-800"}`} />
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                            >
                                <div className="text-center space-y-4 mb-8">
                                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#0c1c44] dark:text-white">ניתוח הנתונים הושלם!</h3>
                                    <p className="text-slate-500">השאירו פרטים כדי לקבל את תוצאות האבחון והמלצות ראשוניות.</p>
                                </div>
                                <form onSubmit={submit} className="space-y-4">
                                    <input type="text" name="name" placeholder="שם מלא" required className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-[#d4af37] dark:text-white" />
                                    <input type="tel" name="phone" placeholder="מספר טלפון" required className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-[#d4af37] dark:text-white" />
                                    <button
                                        disabled={loading}
                                        className="w-full py-5 bg-[#d4af37] text-[#0c1c44] font-black text-xl rounded-xl hover:bg-[#c29f30] transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? "מעבד נתונים..." : "קבלו את תוצאות האבחון"}
                                        <ArrowLeft className="w-6 h-6" />
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
