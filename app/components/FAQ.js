"use client";
import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
    {
        q: "מדוע אני צריך ייעוץ פיננסי אם אני מרוויח יפה?",
        a: "גם בהכנסה גבוהה, ניהול לא נכון של הון יכול לגרום לאובדן של מיליוני שקלים לאורך זמן. ייעוץ מקצועי עוזר לך למקסם את הרווחים, לתכנן את הפרישה ולבנות תיק השקעות חכם."
    },
    {
        q: "מה ההבדל בין יועץ פיננסי פרטי ליועץ בנקאי?",
        a: "היועץ בבנק מחויב קודם כל למוצרים של הבנק שלו. יועץ פיננסי פרטי הוא אובייקטיבי לחלוטין - הוא עובד בשבילך, לא בשביל אף מוסד פיננסי."
    },
    {
        q: "תוך כמה זמן אראה תוצאות בניהול התקציב שלי?",
        a: "כבר מהחודש הראשון. אנחנו בונים תכנית פעולה מידית שיוצרת 'סדר בעיניים' וחוסכת הוצאות מיותרות מהרגע הראשון של היישום."
    },
    {
        q: "האם השירות מתאים גם לעצמאיים עם עסק?",
        a: "בהחלט. אנחנו מתמחים בחיבור בין הפיננסים העסקיים לפרטיים, אופטימיזציה של מיסוי ותכנון פיננסי אסטרטגי לעסק ולמשפחה כאחד."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="py-10 md:py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-[#0c1c44] dark:text-white mb-6 flex items-center justify-center gap-3">
                        <HelpCircle className="text-[#d4af37]" size={36} /> שאלות נפוצות
                    </h2>
                </div>

                <div className="space-y-4">
                    {QUESTIONS.map((item, i) => (
                        <div key={i} className="border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/10">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full p-8 text-right flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/20 transition-all group"
                            >
                                <span className="text-xl font-black text-[#0c1c44] dark:text-white group-hover:text-[#d4af37]">{item.q}</span>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openIndex === i ? 'bg-[#d4af37] text-[#0c1c44]' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                                    {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-8 pt-0 text-slate-500 font-bold leading-relaxed text-lg dark:text-slate-400">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
