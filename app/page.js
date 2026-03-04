"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, ArrowLeft, CheckCircle, TrendingUp, ShieldCheck, PieChart, Wallet, Target, FileText, Award, Users, Phone, Mail, MapPin, MessageSquare, Menu, X as XIcon } from "lucide-react";
import ExitIntentPopup from "./components/ExitIntentPopup";
import StickyCallToAction from "./components/StickyCallToAction";

// Lighter components that should load immediately
import { RevealOnScroll, useScrollReveal, useCountUp } from "./components/ScrollAnimations";
import DarkModeToggle from "./components/DarkModeToggle";
import { submitLead } from "./actions/contact";
import { toast } from "./components/Toaster";

// Heavy AI and media components lazy loaded for massive performance boost
const VideoTestimonials = dynamic(() => import("./components/VideoTestimonials"), { ssr: false });
const AdvancedCalculator = dynamic(() => import("./components/AdvancedCalculator"), { ssr: false });
const DiagnosisForm = dynamic(() => import("./components/DiagnosisForm"));
const AiFinancialPlan = dynamic(() => import("./components/AiFinancialPlan"), { ssr: false });
const AiTimeMachine = dynamic(() => import("./components/AiTimeMachine"), { ssr: false });
const AiCaseStudy = dynamic(() => import("./components/AiCaseStudy"), { ssr: false });
const AiVoiceAnalyzer = dynamic(() => import("./components/AiVoiceAnalyzer"), { ssr: false });
const AiVacationPlanner = dynamic(() => import("./components/AiVacationPlanner"), { ssr: false });
const AiSubscriptionKiller = dynamic(() => import("./components/AiSubscriptionKiller"), { ssr: false });
const AiDebtConsolidator = dynamic(() => import("./components/AiDebtConsolidator"), { ssr: false });
const AiMortgageReadiness = dynamic(() => import("./components/AiMortgageReadiness"), { ssr: false });
const AiFreelanceBalancer = dynamic(() => import("./components/AiFreelanceBalancer"), { ssr: false });
const AiReceiptScanner = dynamic(() => import("./components/AiReceiptScanner"), { ssr: false });
const AiPensionNegotiator = dynamic(() => import("./components/AiPensionNegotiator"), { ssr: false });
const AiCouplesMatcher = dynamic(() => import("./components/AiCouplesMatcher"), { ssr: false });
const AiSavingsChallenge = dynamic(() => import("./components/AiSavingsChallenge"), { ssr: false });
const AiCarLeasingVsBuying = dynamic(() => import("./components/AiCarLeasingVsBuying"), { ssr: false });
const AiSalaryNegotiator = dynamic(() => import("./components/AiSalaryNegotiator"), { ssr: false });
const AiGroceryOptimizer = dynamic(() => import("./components/AiGroceryOptimizer"), { ssr: false });
const AiTaxRefunder = dynamic(() => import("./components/AiTaxRefunder"), { ssr: false });
const AiKidsAllowance = dynamic(() => import("./components/AiKidsAllowance"), { ssr: false });
const FAQ = dynamic(() => import("./components/FAQ"));
const Calendly = dynamic(() => import("./components/Calendly"), { ssr: false });
const ToolsNavigator = dynamic(() => import("./components/ToolsNavigator"), { ssr: false });

/**
 * FinSmart Landing Page - Financial Advisor Edition
 * Built for premium aesthetics and conversion.
 */

function StatCounter({ target, suffix = "", prefix = "" }) {
    const [ref, visible] = useScrollReveal();
    const count = useCountUp(target, 1800, visible);
    return (
        <span ref={ref}>
            {prefix}{visible ? count.toLocaleString() : 0}{suffix}
        </span>
    );
}

export default function Home() {
    const [leadsCount] = useState(57); // Social proof counter
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const result = await submitLead(formData);

        setIsSubmitting(false);

        if (result.success) {
            toast("הפרטים נשלחו בהצלחה! כבר חוזרים אליך.");
            window.location.href = "/thank-you";
        } else {
            toast("חלה שגיאה בשליחת הטופס. נסו שוב מאוחר יותר.", "error");
        }
    };

    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden mesh-gradient">
            {/* Global Features */}
            <ExitIntentPopup />
            <StickyCallToAction />



            {/* HERO SECTION */}
            <header className="relative pt-40 pb-20 md:pt-64 md:pb-40 px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10 text-center lg:text-right relative z-10">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/50 dark:bg-white/10 premium-glass border-white/40 text-sm font-black text-[#d4af37] tracking-widest uppercase md:mx-0 mx-auto">
                            <ShieldCheck className="w-5 h-5 rtl-flip" />
                            ביטחון פיננסי ברמה הגבוהה ביותר
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-[#0c1c44] dark:text-white leading-[1] tracking-tighter">
                            תכננו את העתיד <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f0cc60] drop-shadow-2xl">הכלכלי שלכם.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            אלגוריתמים מתקדמים פוגשים ליווי אנושי מעולה. אנחנו לא רק מנהלים כספים; אנחנו בונים חופש אמיתי למשפחות הישראליות.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 justify-center lg:justify-start">
                            <a href="#contact" className="btn-gold text-lg w-full sm:w-auto px-12">
                                בואו נתחיל
                                <ArrowRight className="w-6 h-6 rtl-flip" />
                            </a>
                            <a href="#testimonials" className="font-black text-[#0c1c44] dark:text-white hover:text-[#d4af37] transition-all flex items-center gap-2 group text-lg">
                                צפו בסיפורי ההצלחה
                                <div className="w-12 h-12 rounded-full bg-white/10 premium-glass flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-[#d4af37] border-b-[6px] border-b-transparent ml-1 rtl-flip" />
                                </div>
                            </a>
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-200 dark:border-slate-800/50">
                            {[
                                { label: "שביעות רצון", val: "100%" },
                                { label: "נכסים מנוהלים", val: "₪2.5B+" },
                                { label: "משפחות מרוצות", val: "5000+" }
                            ].map((s, i) => (
                                <div key={i} className="space-y-1">
                                    <p className="text-2xl md:text-3xl font-black text-[#0c1c44] dark:text-white">{s.val}</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group hidden lg:block">
                        <div className="relative z-10 animate-float">
                            <div className="premium-glass p-2 rounded-[3.5rem] overflow-hidden -rotate-2 group-hover:rotate-0 transition-all duration-1000 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
                                <img
                                    src="/hero_bg.png"
                                    alt="Premium Financial Mastery"
                                    className="rounded-[3rem] w-full aspect-square object-cover"
                                />
                            </div>

                            <div className="absolute -bottom-10 -right-10 premium-glass p-8 rounded-3xl z-20 shadow-2xl glow-gold border-white/50 text-right">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#f0cc60] flex items-center justify-center shadow-lg">
                                        <TrendingUp className="w-8 h-8 text-[#0c1c44] rtl-flip" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">חיסכון חודשי ממוצע</p>
                                        <p className="text-3xl font-black text-[#0c1c44] dark:text-white">₪4,820</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#d4af37]/5 rounded-full blur-[120px] -z-10" />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-32 relative z-10">
                    <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10 underline decoration-[#d4af37] underline-offset-8">הגופים המובילים שנתנו בנו אמון</p>
                    <div className="flex flex-wrap justify-between items-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-500 px-4">
                        {['Goldman Partners', 'Nexus Capital', 'Horizon Wealth', 'Elite Trust', 'Azure Banking'].map(l => (
                            <span key={l} className="text-2xl font-black text-slate-600 dark:text-white cursor-default uppercase">{l}</span>
                        ))}
                    </div>
                </div>
            </header>

            <ToolsNavigator />

            {/* FEATURES BENTO GRID */}
            <section id="services" className="py-32 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 text-right">
                        <div className="space-y-4 max-w-2xl">
                            <h2 className="text-5xl md:text-6xl font-black text-[#0c1c44] dark:text-white tracking-tighter">המעטפת <br /><span className="text-[#d4af37]">הפיננסית המושלמת.</span></h2>
                            <p className="text-lg text-slate-500 font-medium">מגוון פתרונות טכנולוגיים ואישיים המותאמים בדיוק לצרכים שלכם.</p>
                        </div>
                        <a href="#contact" className="px-10 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-black text-sm hover:border-[#d4af37] transition-all shadow-sm">צפו בכל השירותים</a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-8 premium-glass p-12 rounded-[3.5rem] relative overflow-hidden group text-right">
                            <div className="relative z-10 space-y-6">
                                <div className="w-16 h-16 rounded-2xl bg-[#0c1c44] dark:bg-[#d4af37]/20 flex items-center justify-center">
                                    <PieChart className="w-8 h-8 text-[#d4af37]" />
                                </div>
                                <h3 className="text-4xl font-black text-[#0c1c44] dark:text-white">ניתוח נכסים כולל</h3>
                                <p className="text-lg text-slate-500 max-w-md">המערכת שלנו מנתחת את כל פורטפוליו הנכסים שלכם—מפנסיה ועד נדל"ן—כדי למצוא הזדמנויות לצמיחה וייעוץ.</p>
                                <button className="btn-gold !px-8 !py-3 !text-xs !rounded-xl">הפעילו את המנתח</button>
                            </div>
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#d4af37]/5 to-transparent -z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-[80px]" />
                        </div>
                        <div className="md:col-span-4 premium-glass p-12 rounded-[3.5rem] bg-[#0c1c44] dark:bg-slate-900 border-none text-right">
                            <div className="space-y-6">
                                <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                                    <ShieldCheck className="w-7 h-7" />
                                </div>
                                <h3 className="text-3xl font-black text-white">הגנה מלאה</h3>
                                <p className="text-slate-400">הצפנה מתקדמת לכל המידע הפיננסי הרגיש שלכם. ביטחון ברמה בנקאית מוטמע ב-DNA שלנו.</p>
                                <div className="pt-8 flex items-center gap-4 justify-end">
                                    <span className="text-xs font-bold text-slate-500 tracking-wide">+5k USERS</span>
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#0c1c44]" />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI SECTIONS CONTAINER */}
            <div className="space-y-40 py-20">
                <div id="diagnosis" className="px-8 max-w-7xl mx-auto"><DiagnosisForm /></div>
                <div id="ai-voice" className="px-8 max-w-7xl mx-auto"><AiVoiceAnalyzer /></div>
                <div id="ai-plan" className="px-8 max-w-7xl mx-auto"><AiFinancialPlan /></div>
                <div id="ai-time" className="px-8 max-w-7xl mx-auto"><AiTimeMachine /></div>
                <div id="calculator" className="px-8 max-w-7xl mx-auto"><AdvancedCalculator /></div>
                <div id="ai-subscriptions" className="px-8 max-w-7xl mx-auto"><AiSubscriptionKiller /></div>
                <div id="ai-case-study" className="px-8 max-w-7xl mx-auto"><AiCaseStudy /></div>
                <div id="ai-vacation" className="px-8 max-w-7xl mx-auto"><AiVacationPlanner /></div>
                <div id="ai-debt" className="px-8 max-w-7xl mx-auto"><AiDebtConsolidator /></div>
                <div id="ai-mortgage" className="px-8 max-w-7xl mx-auto"><AiMortgageReadiness /></div>
                <div id="ai-freelance" className="px-8 max-w-7xl mx-auto"><AiFreelanceBalancer /></div>
                <div id="ai-receipt" className="px-8 max-w-7xl mx-auto"><AiReceiptScanner /></div>
                <div id="ai-pension" className="px-8 max-w-7xl mx-auto"><AiPensionNegotiator /></div>
                <div id="ai-couples" className="px-8 max-w-7xl mx-auto"><AiCouplesMatcher /></div>
                <div id="ai-challenge" className="px-8 max-w-7xl mx-auto"><AiSavingsChallenge /></div>
                <div id="ai-car-lease" className="px-8 max-w-7xl mx-auto"><AiCarLeasingVsBuying /></div>
                <div id="ai-salary" className="px-8 max-w-7xl mx-auto"><AiSalaryNegotiator /></div>
                <div id="ai-grocery" className="px-8 max-w-7xl mx-auto"><AiGroceryOptimizer /></div>
                <div id="ai-tax" className="px-8 max-w-7xl mx-auto"><AiTaxRefunder /></div>
                <div id="ai-kids" className="px-8 max-w-7xl mx-auto"><AiKidsAllowance /></div>
                <div id="testimonials" className="px-8 max-w-7xl mx-auto"><VideoTestimonials /></div>
            </div>

            <Calendly />

            {/* CONTACT SECTION REIMAGINED */}
            <section id="contact" className="py-40 px-8 relative overflow-hidden">
                <div className="max-w-7xl mx-auto premium-glass rounded-[4rem] p-16 md:p-24 relative overflow-hidden flex flex-col lg:flex-row gap-20 items-center">
                    <div className="relative z-10 lg:w-1/2 text-right">
                        <h2 className="text-5xl md:text-7xl font-black text-[#0c1c44] dark:text-white leading-[1] mb-10">
                            בנו את המורשת <br />
                            <span className="text-[#d4af37]">הכלכלית</span> שלכם היום.
                        </h2>
                        <div className="space-y-8">
                            {[
                                { i: Phone, t: "התקשרו אלינו", v: "077-8001234" },
                                { i: Mail, t: "שלחו מייל", v: "vip@finsmart.io" },
                                { i: MapPin, t: "בואו לבקר", v: "מגדלי עזריאלי, תל אביב" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-6 group justify-end">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.t}</p>
                                        <p className="text-2xl font-black text-[#0c1c44] dark:text-white">{item.v}</p>
                                    </div>
                                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center group-hover:bg-[#d4af37] transition-colors group-hover:text-white text-[#d4af37]">
                                        <item.i className="w-8 h-8 rtl-flip" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative z-10 w-full">
                        <div className="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
                            <form className="space-y-8 text-right" onSubmit={handleFormSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">שם מלא</label>
                                        <input type="text" name="name" required className="w-full px-6 py-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-[#d4af37] transition-all font-bold text-right" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">טלפון</label>
                                        <input type="tel" name="phone" required className="w-full px-6 py-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-[#d4af37] transition-all font-bold text-right" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">הודעה</label>
                                    <textarea rows={4} name="message" className="w-full px-6 py-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-[#d4af37] transition-all font-bold resize-none text-right" />
                                </div>
                                <button disabled={isSubmitting} className="btn-gold w-full text-xl !py-6">
                                    {isSubmitting ? "מבצע שידור..." : "בקשו שיחת ייעוץ Elite"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <div className="max-w-7xl mx-auto px-8 py-20">
                <FAQ />
            </div>

            <footer className="py-20 px-8 border-t border-slate-200 dark:border-slate-800/50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-2">
                        <span className="text-3xl font-black text-[#0c1c44] dark:text-white tracking-tighter">
                            Fin<span className="text-[#d4af37]">Smart</span>
                        </span>
                    </div>
                    <div className="flex gap-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <a href="/privacy" className="hover:text-[#d4af37]">מדיניות פרטיות</a>
                        <a href="/terms" className="hover:text-[#d4af37]">תנאי שימוש</a>
                        <a href="/careers" className="hover:text-[#d4af37]">קריירה</a>
                    </div>
                    <p className="text-slate-400 text-xs font-medium">© {new Date().getFullYear()} FINSMART GLOBAL LTD. ALL RIGHTS RESERVED.</p>
                </div>
            </footer>
        </div>
    );
}
