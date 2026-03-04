"use client";
import React, { useEffect } from "react";
import { Calendar, CheckCircle, Info, ArrowLeft } from "lucide-react";

export default function Calendly() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const openCalendly = () => {
        const CALENDLY_URL = 'https://calendly.com/your-username'; // TODO: replace with real URL
        if (typeof window !== 'undefined' && window.Calendly && CALENDLY_URL !== 'https://calendly.com/your-username') {
            window.Calendly.initPopupWidget({ url: CALENDLY_URL });
        } else {
            // Fallback: open WhatsApp if Calendly URL not configured
            window.open('https://wa.me/972778001234?text=' + encodeURIComponent('שלום, רוצה לקבוע שיחת ייעוץ'), '_blank');
        }
        return false;
    };

    return (
        <section className="py-10 md:py-16 bg-[#0c1c44] text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#d4af37]/5 skew-x-[-12deg] translate-x-20" />
            <div className="absolute bottom-0 left-0 w-40 h-40 border-8 border-white/5 rounded-full -translate-x-20 translate-y-20" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2 space-y-8 text-right">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37]/20 rounded-full text-[#d4af37] text-sm font-bold uppercase tracking-widest border border-[#d4af37]/30">
                            <CheckCircle size={14} /> זמינות מיידית
                        </div>
                        <h2 className="text-5xl font-black leading-[1.1]">תיאום שיחת <span className="text-[#d4af37]">אסטרטגיה אישית</span></h2>
                        <p className="text-xl text-slate-300 font-medium">בחרו את המועד המתאים ביותר עבורכם לשיחה ראשונית לבדיקת היתכנות לשינוי פיננסי משמעותי.</p>

                        <div className="space-y-4">
                            {[
                                { title: "שיחה של 30 דקות במתנה", icon: <Info size={16} /> },
                                { title: "בניית מפת דרכים ראשונית", icon: <Info size={16} /> },
                                { title: "ללא שום התחייבות מצדכם", icon: <Info size={16} /> }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-400 font-bold">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#d4af37]">{item.icon}</div>
                                    <span>{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="md:w-1/2 bg-white rounded-[3rem] p-10 shadow-2xl space-y-8 text-center text-[#0c1c44]">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto border-4 border-[#d4af37]/20">
                            <Calendar size={40} className="text-[#d4af37]" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black mb-3">היומן שלי פתוח לכם</h3>
                            <p className="text-slate-500 font-bold">בחרו תאריך ושעה שנוחים לכם.</p>
                        </div>
                        <button
                            onClick={openCalendly}
                            className="w-full py-6 bg-[#d4af37] text-[#0c1c44] text-xl font-black rounded-2xl hover:bg-[#c29f30] hover:scale-[1.03] transition-all shadow-xl shadow-[#d4af37]/20 flex items-center justify-center gap-3"
                        >
                            קבעו שיחה ביומן <ArrowLeft className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
