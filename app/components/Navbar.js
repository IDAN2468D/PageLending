"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Menu, X as XIcon, ChevronDown } from "lucide-react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`fixed left-0 right-0 z-[60] transition-all duration-500 px-6 md:px-8 ${scrolled
                    ? "top-[64px] mx-4 md:mx-auto max-w-6xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 dark:border-white/5 rounded-3xl py-3"
                    : "top-12 bg-transparent py-4 md:py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 order-last md:order-none">
                        <Link href="/" className="text-3xl font-black text-[#0c1c44] dark:text-white tracking-tighter hover:scale-105 transition-transform cursor-pointer">
                            Fin<span className="text-[#d4af37]">Smart</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-10">
                        <div className="flex items-center gap-8 text-[13px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                            <Link href="/#services" className="hover:text-[#d4af37] transition-all">שירותים</Link>
                            <Link href="/pricing" className="hover:text-[#d4af37] transition-all">חבילות</Link>
                            <Link href="/about" className="hover:text-[#d4af37] transition-all">אודות</Link>

                            <div className="relative group">
                                <button className="flex items-center gap-1.5 hover:text-[#d4af37] transition-all py-2">
                                    <span>AI SUITE</span>
                                    <ChevronDown className="w-3 h-3 text-[#d4af37]" />
                                </button>

                                <div className="absolute top-full right-0 mt-4 bg-white dark:bg-slate-900 shadow-[0_40px_100px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 rounded-[2.5rem] w-[540px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 scale-95 group-hover:scale-100 z-50 p-10 text-right">
                                    <div className="grid grid-cols-2 gap-12">
                                        <div className="space-y-6">
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Foundation</h4>
                                            <div className="flex flex-col gap-4">
                                                {[
                                                    { id: "diagnosis", name: "אבחון פיננסי מהיר" },
                                                    { id: "ai-plan", name: "תוכנית אסטרטגית AI" },
                                                    { id: "ai-voice", name: "מנתח תקציב קולי" },
                                                    { id: "ai-time", name: "מכונת הזמן הפיננסית" }
                                                ].map((tool) => (
                                                    <Link key={tool.id} href={`/#${tool.id}`} className="hover:text-[#d4af37] transition-all text-sm font-bold text-slate-600 dark:text-slate-300 flex items-center justify-between group/link">
                                                        {tool.name}
                                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 translate-x-2 group-hover/link:translate-x-0 transition-all rtl-flip" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Growth</h4>
                                            <div className="flex flex-col gap-4">
                                                {[
                                                    { id: "ai-pension", name: "מגן הפנסיה" },
                                                    { id: "ai-tax", name: "בלש החזרי מס" },
                                                    { id: "ai-salary", name: "אופטימיזציית שכר" },
                                                    { id: "ai-kids", name: "חינוך פיננסי לילדים", special: true }
                                                ].map((tool) => (
                                                    <Link key={tool.id} href={`/#${tool.id}`} className={`transition-all text-sm font-bold flex items-center justify-between group/link ${tool.special ? 'text-[#d4af37]' : 'text-slate-600 dark:text-slate-300 hover:text-[#d4af37]'}`}>
                                                        {tool.name}
                                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 translate-x-2 group-hover/link:translate-x-0 transition-all rtl-flip" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mr-8">
                            <DarkModeToggle />
                            <Link href="/#contact" className="btn-gold !py-3 !px-10 text-xs shadow-none">פגישת ייעוץ</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:hidden">
                        <DarkModeToggle />
                        <button className="p-2 text-[#0c1c44] dark:text-white" onClick={() => setMobileMenuOpen(true)}>
                            <Menu className="w-8 h-8" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Premium Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl ${mobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-10"}`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 mt-4">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-black text-[#0c1c44] dark:text-white tracking-tighter">Fin<span className="text-[#d4af37]">Smart</span></span>
                        </div>
                        <button className="p-3 text-[#0c1c44] dark:text-white bg-slate-100 dark:bg-slate-800 rounded-full hover:scale-110 transition-transform" onClick={() => setMobileMenuOpen(false)}>
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center gap-10 p-10">
                        <Link href="/#services" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-black text-[#0c1c44] dark:text-white hover:text-[#d4af37] transition-colors">שירותים</Link>
                        <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-black text-[#0c1c44] dark:text-white hover:text-[#d4af37] transition-colors">חבילות</Link>
                        <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-black text-[#0c1c44] dark:text-white hover:text-[#d4af37] transition-colors">אודות היועץ</Link>
                        <Link href="/#diagnosis" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-black text-[#0c1c44] dark:text-white hover:text-[#d4af37] transition-colors">כלים חכמים</Link>
                    </div>

                    <div className="p-10 mb-8 w-full">
                        <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="w-full flex justify-center text-xl btn-gold !py-5 shadow-2xl">
                            תאמו פגישה עכשיו
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
