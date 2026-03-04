"use client";
import { useState, useEffect } from "react";
import { X, Gift, ArrowRight, ArrowLeft } from "lucide-react";
import { submitLead } from "../actions/contact";
import { toast } from "./Toaster";

export default function ExitIntentPopup() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (dismissed) return;
        const handleMouseLeave = (e) => {
            if (e.clientY <= 5 && !dismissed) {
                setVisible(true);
            }
        };
        // Also show after 45 seconds if still on page
        const timer = setTimeout(() => {
            if (!dismissed) setVisible(true);
        }, 45000);

        document.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            document.removeEventListener("mouseleave", handleMouseLeave);
            clearTimeout(timer);
        };
    }, [dismissed]);

    const handleClose = () => {
        setVisible(false);
        setDismissed(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        const formData = new FormData();
        formData.append("email", email);
        formData.append("name", "לקוח פוטנציאלי (פופ-אפ)");
        formData.append("phone", "לא צוין");
        formData.append("message", "מעוניין במדריך 10 הטעויות");
        formData.append("source", "exit_intent_popup");

        const result = await submitLead(formData);

        if (result.success) {
            setSubmitted(true);
            toast("הצטרפת בהצלחה! המדריך בדרך אליך.");
            setTimeout(() => handleClose(), 2500);
        } else {
            toast("חלה שגיאה. נסו שוב מאוחר יותר.", "error");
        }
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-fade-in">
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 overflow-hidden">
                {/* Gold top bar */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#d4af37] to-[#f0cc60]" />

                <button
                    onClick={handleClose}
                    className="absolute top-4 left-4 p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-slate-400" />
                </button>

                {!submitted ? (
                    <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto">
                            <Gift className="w-10 h-10 text-[#d4af37]" />
                        </div>

                        <div>
                            <h3 className="text-3xl font-black text-[#0c1c44] mb-2">
                                רגע לפני שאתם עוזבים!
                            </h3>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                קבלו בחינם את המדריך שלנו: <strong className="text-[#0c1c44]">"10 טעויות כספיות שכל משפחה עושה"</strong>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="הכניסו את כתובת האימייל שלכם"
                                className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/10 outline-none text-center font-medium transition-all"
                                dir="rtl"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full py-4 bg-[#d4af37] text-[#0c1c44] font-black text-lg rounded-xl hover:bg-[#c29f30] transition-all flex items-center justify-center gap-2 group"
                            >
                                שלחו לי את המדריך
                                <ArrowRight className="w-5 h-5 rtl-flip" />
                            </button>
                        </form>

                        <button
                            onClick={handleClose}
                            className="text-slate-400 text-sm hover:text-slate-600 transition-colors"
                        >
                            לא תודה, אני לא מעוניין
                        </button>
                    </div>
                ) : (
                    <div className="text-center space-y-4 py-8">
                        <div className="text-6xl">🎉</div>
                        <h3 className="text-2xl font-black text-[#0c1c44]">נשלח בהצלחה!</h3>
                        <p className="text-slate-500 font-medium">המדריך בדרך אליכם. בדקו את תיבת הדואר הנכנס.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
