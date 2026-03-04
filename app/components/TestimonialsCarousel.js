"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Star } from "lucide-react";

const testimonials = [
    {
        name: "רחל לוי",
        role: "אמא לשלושה, מורה בבית ספר",
        text: "אחרי שנים של מינוס קבוע, PageLending עזרו לנו לבנות תוכנית חיסכון ריאלית. תוך 4 חודשים יצאנו מהמינוס ואנחנו חוסכים 2,000 ₪ בחודש!",
        savings: "₪2,000 לחודש",
        avatar: "ר",
    },
    {
        name: "דן ברוך",
        role: "הנדסאי תוכנה, גיל 34",
        text: "ידעתי שאני צריך לחסוך לפנסיה אבל לא ידעתי מאיפה להתחיל. היועץ מ-PageLending הסביר לי הכל בשפה פשוטה ובנינו תיק השקעות שמיועד לגיל שלי.",
        savings: "37% תשואה שנתית",
        avatar: "ד",
    },
    {
        name: "מיכל ואבי כהן",
        role: "זוג בשנות ה-40, עצמאיים",
        text: "קיבלנו החזר מס של 18,000 ₪ שלא ידענו שמגיע לנו. PageLending בדקו לנו 5 שנים אחורה וגילו כסף שסתם ישב אצל המדינה!",
        savings: "₪18,000 החזר מס",
        avatar: "מ",
    },
];

export default function TestimonialsCarousel() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const t = testimonials[active];

    return (
        <section className="py-24 bg-[#0c1c44] relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#d4af37]/5 rounded-full blur-[100px]" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-white">לקוחות מספרים</h2>
                    <div className="w-20 h-1.5 bg-[#d4af37] mx-auto rounded-full" />
                    <p className="text-white/60 font-medium">קולות אמיתיים של אנשים שינו את חייהם הכלכליים</p>
                </div>

                <div className="relative">
                    <div
                        key={active}
                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 md:p-14 space-y-6 animate-fade-in"
                    >
                        {/* Stars */}
                        <div className="flex gap-1 justify-center">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 text-[#d4af37] fill-[#d4af37]" />
                            ))}
                        </div>

                        <p className="text-white/90 text-xl md:text-2xl leading-relaxed font-medium text-center">
                            &ldquo;{t.text}&rdquo;
                        </p>

                        {/* Savings badge */}
                        <div className="flex justify-center">
                            <span className="bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] font-black px-6 py-2 rounded-full text-lg">
                                {t.savings}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 justify-center">
                            <div className="w-14 h-14 rounded-full bg-[#d4af37] flex items-center justify-center text-[#0c1c44] text-2xl font-black">
                                {t.avatar}
                            </div>
                            <div className="text-right">
                                <p className="font-black text-white text-lg">{t.name}</p>
                                <p className="text-white/50 text-sm font-medium">{t.role}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation dots & arrows */}
                <div className="flex items-center justify-center gap-6 mt-10">
                    <button
                        onClick={() => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-3">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={`rounded-full transition-all duration-300 ${i === active ? "bg-[#d4af37] w-8 h-3" : "bg-white/30 w-3 h-3"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setActive((prev) => (prev + 1) % testimonials.length)}
                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
                    >
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                    </button>
                </div>
            </div>
        </section>
    );
}
