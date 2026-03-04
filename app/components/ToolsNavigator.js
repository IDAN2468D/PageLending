"use client";
import React from "react";
import {
    Activity, Mic, ClipboardList, Timer, Calculator, ShieldX,
    FileSearch, Plane, Landmark, Home, Briefcase, Scan,
    TrendingDown, Users, Puzzle, Car, Handshake, ShoppingCart,
    Search, Baby, Compass
} from "lucide-react";

/**
 * ToolsNavigator - Premium Sleek Explorer
 * Integrated horizontal scroll for the FinSmart AI Suite.
 */

const TOOLS = [
    { id: "diagnosis", name: "אבחון פיננסי", icon: Activity },
    { id: "ai-voice", name: "מנתח קולי", icon: Mic },
    { id: "ai-plan", name: "תוכנית עבודה", icon: ClipboardList },
    { id: "ai-time", name: "מכונת זמן", icon: Timer },
    { id: "calculator", name: "מחשבון חכם", icon: Calculator },
    { id: "ai-subscriptions", name: "צייד מנויים", icon: ShieldX },
    { id: "ai-pension", name: "בודק פנסיה", icon: TrendingDown },
    { id: "ai-tax", name: "החזרי מס", icon: Search },
    { id: "ai-kids", name: "חינוך ילדים", icon: Baby },
    { id: "ai-mortgage", name: "משכנתא", icon: Home },
    { id: "ai-debt", name: "איחוד חובות", icon: Landmark },
    { id: "ai-vacation", name: "תכנון חופשה", icon: Plane },
    { id: "ai-salary", name: "מו״מ שכר", icon: Handshake }
];

export default function ToolsNavigator() {
    return (
        <div className="sticky top-[140px] z-40 w-full overflow-hidden transition-all duration-700 select-none">
            <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-3xl border-b border-white/20 dark:border-white/5 py-4 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex items-center gap-12 overflow-x-auto no-scrollbar scroll-smooth">
                        {/* Status / Label */}
                        <div className="shrink-0 flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 ml-8 pl-8 hidden lg:flex group cursor-default">
                            <div className="p-2 rounded-xl bg-[#d4af37]/10 dark:bg-[#d4af37]/20 group-hover:scale-110 transition-transform">
                                <Compass className="w-4 h-4 text-[#d4af37]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Suite</span>
                                <span className="text-[13px] font-black text-[#0c1c44] dark:text-white leading-none">EXPLORER</span>
                            </div>
                        </div>

                        {/* Scroller */}
                        <div className="flex items-center gap-10 flex-nowrap">
                            {TOOLS.map((tool) => (
                                <a
                                    key={tool.id}
                                    href={`#${tool.id}`}
                                    className="flex items-center gap-3 whitespace-nowrap group transition-all"
                                >
                                    <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center group-hover:bg-[#d4af37] transition-all duration-500 shadow-sm border border-slate-100 dark:border-slate-800 group-hover:border-[#d4af37] group-hover:shadow-[0_10px_20px_-5px_rgba(212,175,55,0.4)]">
                                        <tool.icon className="w-4.5 h-4.5 text-slate-400 dark:text-slate-500 group-hover:text-white transition-colors rtl:scale-x-[-1]" />
                                    </div>
                                    <span className="text-xs font-black text-slate-500 dark:text-slate-400 group-hover:text-[#0c1c44] dark:group-hover:text-[#d4af37] transition-colors tracking-tighter">{tool.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
