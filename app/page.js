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
const AiEmergencyFund = dynamic(() => import("./components/AiEmergencyFund"), { ssr: false });
const AiDreamFunder = dynamic(() => import("./components/AiDreamFunder"), { ssr: false });
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
            <header className="relative pt-24 pb-16 md:pt-48 md:pb-32 lg:pt-64 lg:pb-40 px-5 md:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                    <div className="space-y-6 md:space-y-10 text-center lg:text-right relative z-10 mt-10 md:mt-0">
                        <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 rounded-full bg-white/60 dark:bg-white/10 premium-glass border border-white/40 dark:border-white/5 text-[10px] md:text-sm font-black text-[#d4af37] tracking-[0.2em] uppercase mx-auto lg:mx-0 shadow-sm">
                            <ShieldCheck className="w-3.5 h-3.5 md:w-5 md:h-5 rtl-flip" />
                            ביטחון פיננסי ברמה הגבוהה ביותר
                        </div>

                        <h1 className="text-[2.75rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-8xl font-black text-[#0c1c44] dark:text-white tracking-tighter">
                            תכננו את העתיד <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f0cc60] to-[#d4af37] drop-shadow-2xl">הכלכלי שלכם.</span>
                        </h1>

                        <p className="text-base md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium px-2 md:px-0">
                            אלגוריתמים מתקדמים פוגשים ליווי אנושי מעולה. אנחנו לא רק מנהלים כספים; אנחנו בונים חופש אמיתי למשפחות הישראליות.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pt-4 md:pt-6 justify-center lg:justify-start w-full sm:w-auto px-4 md:px-0">
                            <a href="#contact" className="btn-gold text-base md:text-lg w-full sm:w-auto px-8 md:px-12 py-4 shadow-xl shadow-[#d4af37]/20">
                                בואו נתחיל
                                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 rtl-flip" />
                            </a>
                            <a href="#testimonials" className="font-black text-[#0c1c44] dark:text-white hover:text-[#d4af37] transition-all flex items-center justify-center gap-3 group text-sm md:text-lg w-full sm:w-auto py-3 md:py-0">
                                צפו בסיפורי ההצלחה
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#d4af37]/10 transition-all">
                                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-[#d4af37] border-b-[5px] border-b-transparent ml-1 rtl-flip" />
                                </div>
                            </a>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 pt-8 md:pt-12 mt-6 md:mt-0 border-t border-slate-200 dark:border-slate-800/50 relative">
                            <div className="space-y-1 bg-white/60 dark:bg-slate-900/40 rounded-2xl py-5 md:py-0 border border-slate-100 dark:border-slate-800 md:border-none shadow-sm md:shadow-none premium-glass md:bg-transparent md:backdrop-blur-none col-span-1">
                                <p className="text-2xl sm:text-3xl font-black text-[#0c1c44] dark:text-white">100%</p>
                                <p className="text-[9px] md:text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">שביעות רצון</p>
                            </div>
                            <div className="space-y-1 bg-white/60 dark:bg-slate-900/40 rounded-2xl py-5 md:py-0 border border-slate-100 dark:border-slate-800 md:border-none shadow-sm md:shadow-none premium-glass md:bg-transparent md:backdrop-blur-none col-span-1">
                                <p className="text-2xl sm:text-3xl font-black text-[#0c1c44] dark:text-white">₪2.5B+</p>
                                <p className="text-[9px] md:text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">נכסים מנוהלים</p>
                            </div>
                            <div className="space-y-1 bg-white/60 dark:bg-slate-900/40 rounded-2xl py-5 md:py-0 border border-slate-100 dark:border-slate-800 md:border-none shadow-sm md:shadow-none premium-glass md:bg-transparent md:backdrop-blur-none col-span-2 lg:col-span-1">
                                <p className="text-2xl sm:text-3xl font-black text-[#0c1c44] dark:text-white">5000+</p>
                                <p className="text-[9px] md:text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">משפחות מרוצות</p>
                            </div>
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

                <div className="max-w-7xl mx-auto mt-16 md:mt-32 relative z-10 px-5 md:px-0">
                    <p className="text-center text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-8 md:mb-10 underline decoration-[#d4af37] underline-offset-8">הגופים המובילים שנתנו בנו אמון</p>
                    <div className="grid grid-cols-2 md:flex md:flex-wrap justify-between items-center gap-x-4 gap-y-6 md:gap-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 text-center">
                        {['Goldman Partners', 'Nexus Capital', 'Horizon Wealth', 'Elite Trust', 'Azure Banking'].map((l, i) => (
                            <span key={l} className={`text-sm sm:text-base md:text-xl lg:text-2xl font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>{l}</span>
                        ))}
                    </div>
                </div>
            </header>

            <ToolsNavigator />

            {/* FEATURES BENTO GRID */}
            <section id="services" className="py-16 md:py-32 px-5 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-10 md:mb-20 text-right">
                        <div className="space-y-3 md:space-y-4 max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-black text-[#0c1c44] dark:text-white tracking-tighter leading-[1.1]">המעטפת <br className="hidden md:block" /><span className="text-[#d4af37]">הפיננסית המושלמת.</span></h2>
                            <p className="text-sm md:text-lg text-slate-500 font-medium">מגוון פתרונות טכנולוגיים ואישיים המותאמים בדיוק לצרכים שלכם.</p>
                        </div>
                        <a href="#contact" className="w-full md:w-auto px-6 md:px-10 py-4 md:py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-black text-sm hover:border-[#d4af37] transition-all shadow-sm text-center">צפו בכל השירותים</a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                        <div className="md:col-span-8 premium-glass p-6 sm:p-10 md:p-12 rounded-[1.5rem] md:rounded-[3.5rem] relative overflow-hidden group text-right">
                            <div className="relative z-10 space-y-4 md:space-y-6">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-[#0c1c44] dark:bg-[#d4af37]/20 flex items-center justify-center">
                                    <PieChart className="w-6 h-6 md:w-8 md:h-8 text-[#d4af37]" />
                                </div>
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0c1c44] dark:text-white tracking-tight">ניתוח נכסים כולל</h3>
                                <p className="text-sm md:text-lg text-slate-500 max-w-md leading-relaxed">המערכת שלנו מנתחת את כל פורטפוליו הנכסים שלכם—מפנסיה ועד נדל"ן—כדי למצוא הזדמנויות לצמיחה וייעוץ.</p>
                                <button className="btn-gold !px-6 sm:!px-8 !py-3 !text-xs !rounded-xl w-[calc(100%-1rem)] sm:w-auto">הפעילו את המנתח</button>
                            </div>
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#d4af37]/5 to-transparent -z-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 md:w-80 md:h-80 bg-[#d4af37]/10 rounded-full blur-[40px] md:blur-[80px]" />
                        </div>
                        <div className="md:col-span-4 premium-glass p-6 sm:p-10 md:p-12 rounded-[1.5rem] md:rounded-[3.5rem] bg-[#0c1c44] dark:bg-slate-900 border-none text-right flex flex-col justify-between">
                            <div className="space-y-4 md:space-y-6">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                                    <ShieldCheck className="w-5 h-5 md:w-7 md:h-7" />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">הגנה מלאה</h3>
                                <p className="text-sm md:text-base text-slate-300 md:text-slate-400 leading-relaxed">הצפנה מתקדמת לכל המידע הפיננסי הרגיש שלכם. ביטחון ברמה בנקאית.</p>
                            </div>
                            <div className="pt-8 sm:pt-10 flex items-center gap-4 justify-end">
                                <span className="text-[10px] md:text-xs font-bold text-slate-400 tracking-wider">+5k USERS</span>
                                <div className="flex -space-x-2 md:-space-x-3">
                                    {[...Array(4)].map((_, i) => <div key={i} className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-slate-800 border-2 border-[#0c1c44]" />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI SECTIONS CONTAINER */}
            <div className="space-y-20 md:space-y-40 py-10 md:py-20">
                <div id="diagnosis" className="px-5 md:px-8 max-w-7xl mx-auto"><DiagnosisForm /></div>
                <div id="ai-voice" className="px-5 md:px-8 max-w-7xl mx-auto"><AiVoiceAnalyzer /></div>
                <div id="ai-plan" className="px-5 md:px-8 max-w-7xl mx-auto"><AiFinancialPlan /></div>
                <div id="ai-time" className="px-5 md:px-8 max-w-7xl mx-auto"><AiTimeMachine /></div>
                <div id="calculator" className="px-5 md:px-8 max-w-7xl mx-auto"><AdvancedCalculator /></div>
                <div id="ai-subscriptions" className="px-5 md:px-8 max-w-7xl mx-auto"><AiSubscriptionKiller /></div>
                <div id="ai-case-study" className="px-5 md:px-8 max-w-7xl mx-auto"><AiCaseStudy /></div>
                <div id="ai-vacation" className="px-5 md:px-8 max-w-7xl mx-auto"><AiVacationPlanner /></div>
                <div id="ai-debt" className="px-5 md:px-8 max-w-7xl mx-auto"><AiDebtConsolidator /></div>
                <div id="ai-mortgage" className="px-5 md:px-8 max-w-7xl mx-auto"><AiMortgageReadiness /></div>
                <div id="ai-freelance" className="px-5 md:px-8 max-w-7xl mx-auto"><AiFreelanceBalancer /></div>
                <div id="ai-receipt" className="px-5 md:px-8 max-w-7xl mx-auto"><AiReceiptScanner /></div>
                <div id="ai-pension" className="px-5 md:px-8 max-w-7xl mx-auto"><AiPensionNegotiator /></div>
                <div id="ai-couples" className="px-5 md:px-8 max-w-7xl mx-auto"><AiCouplesMatcher /></div>
                <div id="ai-challenge" className="px-5 md:px-8 max-w-7xl mx-auto"><AiSavingsChallenge /></div>
                <div id="ai-car-lease" className="px-5 md:px-8 max-w-7xl mx-auto"><AiCarLeasingVsBuying /></div>
                <div id="ai-salary" className="px-5 md:px-8 max-w-7xl mx-auto"><AiSalaryNegotiator /></div>
                <div id="ai-grocery" className="px-5 md:px-8 max-w-7xl mx-auto"><AiGroceryOptimizer /></div>
                <div id="ai-tax" className="px-5 md:px-8 max-w-7xl mx-auto"><AiTaxRefunder /></div>
                <div id="ai-kids" className="px-5 md:px-8 max-w-7xl mx-auto"><AiKidsAllowance /></div>
                <div id="ai-emergency" className="px-5 md:px-8 max-w-7xl mx-auto"><AiEmergencyFund /></div>
                <div id="ai-dream" className="px-5 md:px-8 max-w-7xl mx-auto"><AiDreamFunder /></div>
                <div id="testimonials" className="px-5 md:px-8 max-w-7xl mx-auto"><VideoTestimonials /></div>
            </div>

            <Calendly />

            {/* CONTACT SECTION REIMAGINED */}
            <section id="contact" className="py-20 md:py-40 px-5 md:px-8 relative overflow-hidden">
                <div className="max-w-7xl mx-auto premium-glass rounded-[1.5rem] md:rounded-[4rem] p-6 sm:p-12 md:p-16 lg:p-24 relative overflow-hidden flex flex-col lg:flex-row gap-10 md:gap-20 items-center border-t border-t-white/60 dark:border-t-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.05)]">
                    <div className="relative z-10 lg:w-1/2 text-center md:text-right w-full">
                        <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-[#0c1c44] dark:text-white leading-[1.1] md:leading-[1] mb-8 md:mb-10 tracking-tight">
                            בנו את המורשת <br className="hidden md:block" />
                            <span className="text-[#d4af37]">הכלכלית</span> שלכם היום.
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:space-y-6 md:gap-0">
                            {[
                                { i: Phone, t: "התקשרו", v: "077-8001234" },
                                { i: Mail, t: "מייל", v: "vip@finsmart.io" },
                                { i: MapPin, t: "ביקור", v: "מגדלי עזריאלי" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-row-reverse md:flex-row items-center gap-4 md:gap-6 group justify-end bg-white/50 dark:bg-slate-800/40 lg:bg-transparent p-4 lg:p-0 rounded-2xl lg:rounded-none border border-slate-100 dark:border-slate-700/50 lg:border-none shadow-sm lg:shadow-none">
                                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white dark:bg-slate-800 shadow-md lg:shadow-lg flex items-center justify-center group-hover:bg-[#d4af37] transition-all group-hover:text-white text-[#d4af37] border border-slate-50 dark:border-slate-700">
                                        <item.i className="w-4 h-4 md:w-8 md:h-8 rtl-flip" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.t}</p>
                                        <p className="text-sm md:text-2xl font-black text-[#0c1c44] dark:text-white mt-0.5">{item.v}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative z-10 w-full mt-4 md:mt-0">
                        <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-slate-100 dark:border-slate-800">
                            <form className="space-y-4 md:space-y-8 text-right" onSubmit={handleFormSubmit}>
                                <div className="grid grid-cols-1 gap-4 md:gap-8 border-b border-slate-100 dark:border-slate-800/50 pb-6 md:pb-0 md:border-none">
                                    <div className="space-y-1.5 md:space-y-3">
                                        <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest px-2">שם מלא</label>
                                        <input type="text" name="name" required className="w-full px-4 py-3 md:px-6 md:py-5 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-[#d4af37] transition-all text-sm md:text-base font-bold text-right" placeholder="שם מלא" />
                                    </div>
                                    <div className="space-y-1.5 md:space-y-3">
                                        <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest px-2">טלפון נמוך</label>
                                        <input type="tel" name="phone" required className="w-full px-4 py-3 md:px-6 md:py-5 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-[#d4af37] transition-all text-sm md:text-base font-bold text-right" placeholder="טלפון נייד" />
                                    </div>
                                </div>
                                <div className="space-y-1.5 md:space-y-3">
                                    <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest px-2">אימייל (אופציונלי)</label>
                                    <input type="email" name="email" className="w-full px-4 py-3 md:px-6 md:py-5 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-[#d4af37] transition-all text-sm md:text-base font-bold text-right" dir="ltr" placeholder="example@email.com" />
                                </div>
                                <div className="space-y-1.5 md:space-y-3 hidden md:block">
                                    <label className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest px-2">הודעה</label>
                                    <textarea rows={3} name="message" className="w-full px-4 py-3 md:px-6 md:py-5 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-[#d4af37] transition-all text-sm md:text-base font-bold resize-none text-right" placeholder="איך נוכל לעזור?" />
                                </div>
                                <button disabled={isSubmitting} className="btn-gold w-full text-base md:text-xl !py-4 md:!py-6 mt-4">
                                    {isSubmitting ? "מבצע שידור..." : "בקשו שיחת ייעוץ"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
                <FAQ />
            </div>

            <footer className="py-12 md:py-20 px-5 md:px-8 border-t border-slate-200 dark:border-slate-800/50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10 text-center md:text-right">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl md:text-3xl font-black text-[#0c1c44] dark:text-white tracking-tighter">
                            Fin<span className="text-[#d4af37]">Smart</span>
                        </span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <a href="/privacy" className="hover:text-[#d4af37]">מדיניות פרטיות</a>
                        <a href="/terms" className="hover:text-[#d4af37]">תנאי שימוש</a>
                        <a href="/careers" className="hover:text-[#d4af37]">קריירה</a>
                    </div>
                    <p className="text-slate-400 text-[10px] md:text-xs font-medium">© {new Date().getFullYear()} FINSMART GLOBAL LTD. ALL RIGHTS RESERVED.</p>
                </div>
            </footer>
        </div>
    );
}
