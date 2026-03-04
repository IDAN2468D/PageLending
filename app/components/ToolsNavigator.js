"use client";
import React from "react";
import {
    Activity, Mic, ClipboardList, Timer, Calculator, ShieldX,
    FileSearch, Plane, Landmark, Home, Briefcase, Scan,
    TrendingDown, Users, Puzzle, Car, Handshake, ShoppingCart,
    Search, Baby
} from "lucide-react";

const TOOLS = [
    { id: "diagnosis", name: "אבחון", icon: Activity },
    { id: "ai-voice", name: "קולי", icon: Mic },
    { id: "ai-plan", name: "תוכנית", icon: ClipboardList },
    { id: "calculator", name: "מחשבון", icon: Calculator },
    { id: "ai-time", name: "זמן", icon: Timer },
    { id: "ai-subscriptions", name: "מנויים", icon: ShieldX },
    { id: "ai-case-study", name: "סיפורי הצלחה", icon: FileSearch },
    { id: "ai-vacation", name: "חופשה", icon: Plane },
    { id: "ai-debt", name: "הלוואות", icon: Landmark },
    { id: "ai-mortgage", name: "משכנתא", icon: Home },
    { id: "ai-freelance", name: "עצמאיים", icon: Briefcase },
    { id: "ai-receipt", name: "חשבונית", icon: Scan },
    { id: "ai-pension", name: "פנסיה", icon: TrendingDown },
    { id: "ai-couples", name: "זוגות", icon: Users },
    { id: "ai-challenge", name: "אתגר", icon: Puzzle },
    { id: "ai-car-lease", name: "ליסינג", icon: Car },
    { id: "ai-salary", name: "שכר", icon: Handshake },
    { id: "ai-grocery", name: "מינימיזציה", icon: ShoppingCart },
    { id: "ai-tax", name: "מס", icon: Search },
    { id: "ai-kids", name: "ילדים", icon: Baby }
];

export default function ToolsNavigator() {
    return (
        <div className="sticky top-[60px] md:top-[68px] z-40 w-full overflow-hidden transition-all duration-300">
            <div className="bg-white/95 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 py-3 shadow-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-10 overflow-x-auto no-scrollbar scroll-smooth">
                        <div className="shrink-0 flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 ml-6 pl-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] hidden md:inline">Explorer</span>
                            <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse shadow-[0_0_10px_#d4af37]" />
                        </div>

                        <div className="flex items-center gap-10">
                            {TOOLS.map((tool) => (
                                <a
                                    key={tool.id}
                                    href={`#${tool.id}`}
                                    className="flex items-center gap-2.5 whitespace-nowrap group transition-all"
                                >
                                    <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 group-hover:bg-[#d4af37]/20 border border-transparent group-hover:border-[#d4af37]/30 transition-all duration-300">
                                        <tool.icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#d4af37] transition-colors" />
                                    </div>
                                    <span className="text-xs font-black text-slate-500 group-hover:text-[#0c1c44] dark:group-hover:text-white transition-colors tracking-tight">{tool.name}</span>
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
