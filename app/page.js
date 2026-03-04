"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, CheckCircle, TrendingUp, ShieldCheck, PieChart, Wallet, Target, FileText, Award, Users, Phone, Mail, MapPin, MessageSquare, Menu, X as XIcon } from "lucide-react";
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
    const [scrolled, setScrolled] = useState(false);
    const [leadsCount] = useState(57); // Social proof counter
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
        <div className="flex flex-col min-h-screen relative overflow-hidden">
            {/* Global Overlays */}
            <ExitIntentPopup />
            <StickyCallToAction />



            {/* Dynamic Background Elements */}
            <div className="absolute top-0 right-0 w-2/3 h-[50%] bg-[#0c1c44]/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-1/3 h-[30%] bg-[#d4af37]/10 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

            {/* Navbar Container */}
            <nav
                className={`fixed left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${scrolled ? "top-0 bg-white/80 backdrop-blur-lg shadow-md py-3" : "top-12 bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-[#0c1c44] tracking-tight">
                            Fin<span className="text-[#d4af37]">Smart</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#0c1c44] dark:text-white/70">
                        <a href="#services" className="hover:text-[#d4af37] transition-colors">שירותים</a>
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-[#d4af37] transition-colors pb-1">כלים חכמים ▾</button>
                            <div className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 rounded-xl w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col translate-y-2 group-hover:translate-y-0 overflow-hidden z-50">
                                <a href="#diagnosis" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">אבחון פיננסי</a>
                                <a href="#ai-voice" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">היועץ הקולי</a>
                                <a href="#ai-plan" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">התוכנית שלנו</a>
                                <a href="#ai-time" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">מכונת זמן</a>
                                <a href="#calculator" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">מחשבון חכם</a>
                                <a href="#ai-subscriptions" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">צייד מנויים</a>
                                <a href="#ai-case-study" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">סיפורי הצלחה AI</a>
                                <a href="#ai-vacation" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">מתכנן חופשות</a>
                                <a href="#ai-debt" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">מאחד הלוואות</a>
                                <a href="#ai-mortgage" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">מוכנות למשכנתא</a>
                                <a href="#ai-freelance" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">מייצב עצמאיים</a>
                                <a href="#ai-receipt" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">סורק חשבוניות</a>
                                <a href="#ai-pension" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">ביטול עמלות פנסיה</a>
                                <a href="#ai-couples" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">המגשר הזוגי</a>
                                <a href="#ai-challenge" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">אתגר ה-30 יום</a>
                                <a href="#ai-car-lease" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">קונה או ליסינג?</a>
                                <a href="#ai-salary" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">מו"מ שכר</a>
                                <a href="#ai-grocery" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">מינימיזציית סופר</a>
                                <a href="#ai-tax" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 text-slate-700 dark:text-slate-300">בלש החזרי מס</a>
                                <a href="#ai-kids" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">חינוך פיננסי לילדים</a>
                            </div>
                        </div>
                        <a href="/pricing" className="hover:text-[#d4af37] transition-colors">חבילות</a>
                        <a href="/about" className="hover:text-[#d4af37] transition-colors">אודות</a>
                        <a href="/blog" className="hover:text-[#d4af37] transition-colors">בלוג</a>
                        <div className="flex items-center gap-4 mr-4 border-r border-slate-200 dark:border-slate-700 pr-4">
                            <DarkModeToggle />
                            <a href="#contact" className="hover:text-[#d4af37] transition-colors font-bold px-5 py-2 rounded-full border border-[#0c1c44]/20 dark:border-[#d4af37]/20 hover:border-[#d4af37]">צור קשר</a>
                        </div>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden p-2 rounded-xl hover:bg-[#0c1c44]/10 transition-colors"
                        onClick={() => setMobileMenuOpen(o => !o)}
                        aria-label="פתח תפריט"
                    >
                        {mobileMenuOpen
                            ? <XIcon className="w-7 h-7 text-[#0c1c44]" />
                            : <Menu className="w-7 h-7 text-[#0c1c44]" />
                        }
                    </button>
                </div>

                {/* Mobile Drawer */}
                <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-[36rem] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"}`}>
                    <div className="bg-white/95 backdrop-blur-lg rounded-2xl mx-2 mt-3 p-6 shadow-2xl border border-slate-100 dark:border-slate-800 dark:bg-slate-900/95 flex flex-col gap-4 text-[#0c1c44] dark:text-white font-bold text-base">
                        <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] transition-colors py-1 border-b border-slate-100 dark:border-slate-800">שירותים</a>

                        <div className="flex flex-col gap-3 py-1 border-b border-slate-100 dark:border-slate-800">
                            <span className="text-slate-500 text-sm">כלים חכמים שלנו:</span>
                            <div className="grid grid-cols-2 gap-3 text-sm font-medium">
                                <a href="#diagnosis" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">אבחון פיננסי</a>
                                <a href="#ai-voice" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">מנתח קול</a>
                                <a href="#ai-plan" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">התוכנית שלנו</a>
                                <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">מחשבון חכם</a>
                                <a href="#ai-time" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">מכונת זמן</a>
                                <a href="#ai-subscriptions" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">צייד ההוצאות</a>
                                <a href="#ai-debt" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">מאחד הלוואות</a>
                                <a href="#ai-mortgage" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">משכנתא</a>
                                <a href="#ai-freelance" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">מייצב עצמאיים</a>
                                <a href="#ai-receipt" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">סורק חשבוניות</a>
                                <a href="#ai-pension" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">מחסל עמלות</a>
                                <a href="#ai-couples" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">המגשר הזוגי</a>
                                <a href="#ai-challenge" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">אתגר ה-30 יום</a>
                                <a href="#ai-car-lease" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">קונה או ליסינג?</a>
                                <a href="#ai-salary" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">מו"מ שכר</a>
                                <a href="#ai-grocery" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">מינימיזציית סופר</a>
                                <a href="#ai-tax" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">בלש החזרי מס</a>
                                <a href="#ai-kids" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] dark:text-slate-300">חינוך פיננסי לילדים</a>
                            </div>
                        </div>

                        <a href="/pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] transition-colors py-1 border-b border-slate-100 dark:border-slate-800">חבילות</a>
                        <a href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] transition-colors py-1 border-b border-slate-100 dark:border-slate-800">אודות</a>
                        <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d4af37] transition-colors py-1 border-b border-slate-100 dark:border-slate-800">בלוג</a>
                        <a
                            href="#contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-1 w-full py-4 bg-[#d4af37] text-[#0c1c44] font-black rounded-xl text-center hover:bg-[#c29f30] transition-all flex items-center justify-center gap-2"
                        >
                            <Phone className="w-5 h-5" /> קבע פגישת ייעוץ חינם
                        </a>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <main className="flex-grow pt-32 pb-20 md:pt-48 md:pb-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Content Side */}
                    <div className="space-y-8 text-center lg:text-right animate-fade-in group">
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/15 text-[#8b6d13] text-sm font-bold border border-[#d4af37]/20">
                                <ShieldCheck className="w-4 h-4" />
                                ביטחון כלכלי למשפחה שלך
                            </div>
                            <div className="bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm flex items-center gap-2 animate-pulse-subtle cursor-default hover:bg-emerald-600 transition-colors">
                                <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                                {leadsCount} משפחות פנו אלינו החודש
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-[#0c1c44] leading-[1.1] tracking-tight">
                            המפתח לחופש כלכלי <br />
                            <span className="text-[#d4af37] drop-shadow-sm">בידיים שלכם.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            נמאס לכם לרדוף אחרי המינוס? אנחנו ב-FinSmart מציעים לכם ייעוץ פיננסי מקצועי, ליווי אישי בניהול תקציב, והשקעות חכמות. הצטרפו לאלפי משפחות שכבר שינו את עתידן הכלכלי.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
                            <a
                                href="#contact"
                                className="btn-primary w-full sm:w-auto"
                            >
                                קבע פגישת ייעוץ חינם
                                <ArrowLeft className="w-5 h-5" />
                            </a>

                            <a href="#testimonials" className="px-8 py-4 text-[#0c1c44] font-bold text-lg hover:text-[#d4af37] transition-all flex items-center gap-2">
                                צפו בסיפורי הצלחה
                            </a>
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-200">
                            <div>
                                <p className="text-3xl font-black text-[#0c1c44] leading-tight"><StatCounter target={100} suffix="%" /></p>
                                <p className="text-sm text-slate-500 font-medium">שקיפות מלאה</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-[#0c1c44] leading-tight"><StatCounter target={5000} suffix="+" /></p>
                                <p className="text-sm text-slate-500 font-medium">לקוחות מרוצים</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-[#0c1c44] leading-tight"><StatCounter target={15} suffix="+" /></p>
                                <p className="text-sm text-slate-500 font-medium">שנות ניסיון</p>
                            </div>
                        </div>
                    </div>

                    {/* Business Image / Visual Side */}
                    <div className="relative group perspective-1000 hidden lg:block">
                        <div className="glass-card p-4 relative z-10 overflow-hidden transform group-hover:rotate-1 group-hover:scale-[1.02] transition-all duration-700">
                            {/* Dynamic Financial Visualization Area */}
                            <div className="w-full aspect-[4/3] bg-[#0c1c44] rounded-xl overflow-hidden relative flex items-end">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                                {/* Visual Chart Mockup */}
                                <div className="absolute bottom-10 left-10 right-10 flex items-end gap-3 z-20 h-40">
                                    {[40, 70, 55, 90, 60, 100, 85].map((h, i) => (
                                        <div
                                            key={i}
                                            className="flex-grow bg-[#d4af37] rounded-t-sm transition-all duration-1000 ease-out"
                                            style={{ height: `${h}%`, transitionDelay: `${i * 100}ms` }}
                                        />
                                    ))}
                                </div>

                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                                    <TrendingUp className="w-48 h-48 text-white" />
                                </div>

                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164060897-42512a0d700b?auto=format&fit=crop&q=80&w=2069')] bg-cover opacity-40 mix-blend-overlay" />
                            </div>

                            {/* Overlapping Info Card */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-2xl rounded-xl z-30 animate-pulse-subtle border border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <PieChart className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">חיסכון ממוצע</p>
                                        <p className="text-2xl font-black text-[#0c1c44]">₪3,450 לחודש</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Decorative Rings */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#0c1c44]/5 rounded-full -z-10 animate-spin-slow" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-[#0c1c44]/5 rounded-full -z-20" />
                    </div>

                </div>
            </main>

            {/* PROCESS SECTION */}
            <section id="services" className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-[#0c1c44]">איך זה עובד?</h2>
                        <div className="w-20 h-1.5 bg-[#d4af37] mx-auto rounded-full" />
                        <p className="text-slate-500 font-medium max-w-2xl mx-auto text-center">תהליך פשוט ומדויק בדרך לחופש הכלכלי שלכם</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "שיחת אבחון", desc: "שיחה קצרה להבנת הצרכים והמצב הכלכלי הנוכחי." },
                            { step: "02", title: "ניתוח נתונים", desc: "צלילה עמוקה למספרים ובניית מפה פיננסית." },
                            { step: "03", title: "בניית תוכנית", desc: "יצירת אסטרטגיה מותאמת אישית להשגת היעדים." },
                            { step: "04", title: "ליווי שוטף", desc: "ליווי צמוד לאורך כל הדרך להבטחת התוצאות." }
                        ].map((item, i) => (
                            <div key={i} className="relative p-10 rounded-3xl bg-slate-50 border border-slate-100 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <span className="text-6xl font-black text-[#d4af37]/10 absolute top-4 left-4 group-hover:text-[#d4af37]/20 transition-colors">{item.step}</span>
                                <h3 className="text-2xl font-bold text-[#0c1c44] mb-4 relative z-10">{item.title}</h3>
                                <p className="text-slate-600 text-base leading-relaxed relative z-10 font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DIAGNOSIS SECTION */}
            <div id="diagnosis"><DiagnosisForm /></div>

            {/* AI VOICE ANALYZER SECTION */}
            <div id="ai-voice"><AiVoiceAnalyzer /></div>

            {/* AI FINANCIAL STRATEGY SECTION */}
            <div id="ai-plan"><AiFinancialPlan /></div>

            {/* AI TIME MACHINE SECTION */}
            <div id="ai-time"><AiTimeMachine /></div>

            {/* FINANCIAL CALCULATOR SECTION */}
            <div id="calculator"><AdvancedCalculator /></div>

            {/* AI SUBSCRIPTION KILLER SECTION */}
            <div id="ai-subscriptions"><AiSubscriptionKiller /></div>

            {/* AI CASE STUDY SECTION */}
            <div id="ai-case-study"><AiCaseStudy /></div>

            {/* AI VACATION PLANNER SECTION */}
            <div id="ai-vacation"><AiVacationPlanner /></div>

            {/* AI DEBT CONSOLIDATOR SECTION */}
            <div id="ai-debt"><AiDebtConsolidator /></div>

            {/* AI MORTGAGE READINESS SECTION */}
            <div id="ai-mortgage"><AiMortgageReadiness /></div>

            {/* AI FREELANCE BALANCER SECTION */}
            <div id="ai-freelance"><AiFreelanceBalancer /></div>

            {/* AI RECEIPT SCANNER SECTION */}
            <div id="ai-receipt"><AiReceiptScanner /></div>

            {/* AI PENSION NEGOTIATOR SECTION */}
            <div id="ai-pension"><AiPensionNegotiator /></div>

            {/* AI COUPLES MATCHER SECTION */}
            <div id="ai-couples"><AiCouplesMatcher /></div>

            {/* AI SAVINGS CHALLENGE SECTION */}
            <div id="ai-challenge"><AiSavingsChallenge /></div>

            {/* AI CAR LEASE VS BUYING SECTION */}
            <div id="ai-car-lease"><AiCarLeasingVsBuying /></div>

            {/* AI SALARY NEGOTIATOR SECTION */}
            <div id="ai-salary"><AiSalaryNegotiator /></div>

            {/* AI GROCERY OPTIMIZER SECTION */}
            <div id="ai-grocery"><AiGroceryOptimizer /></div>

            {/* AI TAX REFUNDER SECTION */}
            <div id="ai-tax"><AiTaxRefunder /></div>

            {/* AI KIDS ALLOWANCE SECTION */}
            <div id="ai-kids"><AiKidsAllowance /></div>

            {/* TESTIMONIALS SECTION */}
            <div id="testimonials">
                <VideoTestimonials />
            </div>

            {/* CALENDLY SECTION */}
            <Calendly />

            {/* ABOUT SECTION */}
            <section id="about" className="py-10 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="w-full aspect-square bg-[#0c1c44] rounded-3xl overflow-hidden shadow-2xl relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#0c1c44] to-[#1e3a8a] opacity-80" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Award className="w-32 h-32 text-[#d4af37]/30" />
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1974"
                                    alt="About FinSmart"
                                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                                />
                            </div>
                            <div className="absolute -bottom-8 -right-8 glass-card p-8 hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 flex items-center justify-center">
                                        <Users className="w-8 h-8 text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-black text-[#0c1c44]">15+</p>
                                        <p className="text-sm text-slate-500 font-bold">שנות הצלחה</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black text-[#0c1c44]">קצת עלינו</h2>
                                <div className="w-16 h-1.5 bg-[#d4af37] rounded-full" />
                            </div>
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                ב-FinSmart אנחנו מאמינים שכל אדם וכל משפחה יכולים להגיע לעצמאות כלכלית עם הכלים הנכונים.&rlm; הגישה שלנו משלבת ידע פיננסי עמוק יחד עם הבנה פסיכולוגית של הרגלי צריכה.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "ליווי אישי יד ביד עד להשגת היעדים",
                                    "מקצועיות ללא פשרות ושקיפות מלאה",
                                    "פתרונות טכנולוגיים מתקדמים לניהול תקציב",
                                    "גישה הוליסטית הכוללת מיסוי, השקעות ופנסיה"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <span className="text-[#0c1c44] font-bold">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* FAQ SECTION */}
            <FAQ />

            {/* CONTACT SECTION */}
            <section id="contact" className="py-10 md:py-16 bg-[#0c1c44] text-white relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/20 rounded-full blur-[100px] -z-0" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black">הגיע הזמן לקחת <br /><span className="text-[#d4af37]">שליטה על העתיד.</span></h2>
                            <p className="text-white/70 text-lg font-medium leading-relaxed">
                                השאירו פרטים ונחזור אליכם לתיאום שיחת ייעוץ ראשונית ללא עלות וללא התחייבות.&rlm;
                            </p>

                            <div className="space-y-6 pt-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/50 uppercase font-bold">טלפון</p>
                                        <p className="text-xl font-bold">077-8001234</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/50 uppercase font-bold">אימייל</p>
                                        <p className="text-xl font-bold">office@finsmart.co.il</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-[#d4af37]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/50 uppercase font-bold">מיקום</p>
                                        <p className="text-xl font-bold">מגדלי עזריאלי, תל אביב</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-2xl text-[#0c1c44]">
                            <form className="space-y-6" onSubmit={handleFormSubmit}>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wide">שם מלא</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="ישראל ישראלי"
                                        required
                                        minLength={2}
                                        className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/10 outline-none transition-all dark:bg-slate-800 dark:border-slate-700"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wide">טלפון</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="050-0000000"
                                            required
                                            pattern="[0-9]{9,10}"
                                            className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/10 outline-none transition-all dark:bg-slate-800 dark:border-slate-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wide">אימייל</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="name@company.com"
                                            required
                                            className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/10 outline-none transition-all dark:bg-slate-800 dark:border-slate-700"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-wide">הודעה (אופציונלי)</label>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        placeholder="איך נוכל לעזור?"
                                        className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/10 outline-none transition-all resize-none dark:bg-slate-800 dark:border-slate-700"
                                    />
                                </div>
                                <input type="hidden" name="source" value="landing_page_main" />
                                <button
                                    disabled={isSubmitting}
                                    className={`w-full py-5 bg-[#d4af37] text-[#0c1c44] font-black text-xl rounded-xl hover:bg-[#c29f30] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-3 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    {isSubmitting ? "שולח..." : "שלחו לי הצעה לשיחת ייעוץ"}
                                    <MessageSquare className="w-6 h-6" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section >

            {/* FOOTER MINI */}
            <footer className="py-10 md:py-16 border-t border-slate-100 dark:border-slate-800 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div className="space-y-4">
                        <span className="text-2xl font-black text-[#0c1c44] dark:text-white tracking-tight">
                            Fin<span className="text-[#d4af37]">Smart</span>
                        </span>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            השותף שלכם לביטחון וצמיחה כלכלית. ליווי מקצועי, אישי ושקוף לכל משפחה בישראל.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="font-bold text-[#0c1c44] dark:text-white uppercase text-xs tracking-widest">חברה</h4>
                            <ul className="space-y-2 text-sm text-slate-500">
                                <li><a href="/about" className="hover:text-[#d4af37]">אודותינו</a></li>
                                <li><a href="/pricing" className="hover:text-[#d4af37]">חבילות ליווי</a></li>
                                <li><a href="/blog" className="hover:text-[#d4af37]">הבלוג שלנו</a></li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold text-[#0c1c44] dark:text-white uppercase text-xs tracking-widest">שירותים</h4>
                            <ul className="space-y-2 text-sm text-slate-500">
                                <li><a href="/#services" className="hover:text-[#d4af37]">ניהול תקציב</a></li>
                                <li><a href="/#services" className="hover:text-[#d4af37]">ייעוץ השקעות</a></li>
                                <li><a href="/#services" className="hover:text-[#d4af37]">החזרי מס</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold text-[#0c1c44] dark:text-white uppercase text-xs tracking-widest">הצטרפו לקהילה</h4>
                        <p className="text-xs text-slate-500 mb-4">קבלו טיפים לתיבת המייל פעם בשבוע.</p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="אימייל" className="flex-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none text-sm" />
                            <button className="px-4 py-2 bg-[#0c1c44] dark:bg-[#d4af37] text-white dark:text-[#0c1c44] rounded-lg text-sm font-bold">הרשמה</button>
                        </form>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800 gap-6">
                    <p className="text-slate-500 text-xs font-medium">
                        © {new Date().getFullYear()} FinSmart. כל הזכויות שמורות. מגדלי עזריאלי, תל אביב.
                    </p>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1 text-[#0c1c44] dark:text-white text-xs font-bold">
                            <CheckCircle className="w-3 h-3 text-emerald-500" />
                            חבר בלשכת יועצי המס
                        </div>
                        <a href="/privacy" className="text-xs text-slate-400 hover:text-[#d4af37]">מדיניות פרטיות</a>
                    </div>
                </div>
            </footer>

            {/* Scroll Indicator */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hidden md:block">
                <div className="w-6 h-10 border-2 border-[#0c1c44] rounded-full flex justify-center p-1">
                    <div className="w-1 h-3 bg-[#0c1c44] rounded-full" />
                </div>
            </div>

        </div>
    );
}
