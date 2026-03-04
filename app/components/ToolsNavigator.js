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
        <div className="sticky top-[72px] z-40 w-full py-2 pointer-events-none group/nav">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 flex justify-center">
                <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-3xl border border-white/40 dark:border-slate-800 shadow-[0_15px_60px_-15px_rgba(0,0,0,0.15)] rounded-full flex items-center gap-0.5 p-1 overflow-x-auto no-scrollbar pointer-events-auto max-w-full font-heebo scale-95 hover:scale-100 transition-transform duration-500">
                    <div className="flex items-center shrink-0 pr-2 pl-3 border-l border-slate-200 dark:border-slate-800 ml-1">
                        <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse mr-2 md:mr-0 ml-1" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest hidden md:block">AI SUITE</span>
                    </div>

                    <div className="flex items-center shrink-0">
                        {TOOLS.map((tool, i) => (
                            <a
                                key={tool.id}
                                href={`#${tool.id}`}
                                className="flex flex-col items-center justify-center p-2 rounded-full transition-all hover:bg-slate-100 dark:hover:bg-slate-800/80 group shrink-0 min-w-[64px]"
                            >
                                <tool.icon className="w-4 h-4 text-slate-400 group-hover:text-[#d4af37] transition-all duration-300 group-hover:scale-110" />
                                <span className="text-[10px] font-bold text-slate-500 group-hover:text-[#0c1c44] dark:group-hover:text-white mt-0.5 whitespace-nowrap transition-colors">{tool.name}</span>
                            </a>
                        ))}
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
