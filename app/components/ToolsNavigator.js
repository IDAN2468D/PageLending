"use client";
import {
    Activity, Mic, ClipboardList, Timer, Calculator, ShieldX,
    FileSearch, Plane, Landmark, Home, Briefcase, Scan,
    TrendingDown, Users, Puzzle, Car, Handshake, ShoppingCart,
    Search, Baby
} from "lucide-react";
import { motion } from "framer-motion";

const TOOLS = [
    { id: "diagnosis", name: "אבחון", icon: Activity },
    { id: "ai-voice", name: "קולי", icon: Mic },
    { id: "ai-plan", name: "תוכנית", icon: ClipboardList },
    { id: "calculator", name: "מחשבון", icon: Calculator },
    { id: "ai-time", name: "מכונת זמן", icon: Timer },
    { id: "ai-subscriptions", name: "מנויים", icon: ShieldX },
    { id: "ai-case-study", name: "הצלחות", icon: FileSearch },
    { id: "ai-vacation", name: "חופשה", icon: Plane },
    { id: "ai-debt", name: "הלוואות", icon: Landmark },
    { id: "ai-mortgage", name: "משכנתא", icon: Home },
    { id: "ai-freelance", name: "עצמאיים", icon: Briefcase },
    { id: "ai-receipt", name: "חשבוניות", icon: Scan },
    { id: "ai-pension", name: "פנסיה", icon: TrendingDown },
    { id: "ai-couples", name: "זוגות", icon: Users },
    { id: "ai-challenge", name: "אתגר", icon: Puzzle },
    { id: "ai-car-lease", name: "ליסינג", icon: Car },
    { id: "ai-salary", name: "שכר", icon: Handshake },
    { id: "ai-grocery", name: "סופר", icon: ShoppingCart },
    { id: "ai-tax", name: "מס", icon: Search },
    { id: "ai-kids", name: "ילדים", icon: Baby }
];

export default function ToolsNavigator() {
    return (
        <div className="sticky top-20 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-y border-slate-100 dark:border-slate-800 shadow-sm overflow-x-auto no-scrollbar font-heebo">
            <div className="max-w-7xl mx-auto px-6 flex items-center gap-1 py-3 min-w-max">
                <div className="pl-4 border-l border-slate-200 dark:border-slate-700 ml-4 hidden md:block">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter block mb-0.5">ניווט מהיר</span>
                    <span className="text-xs font-bold text-[#0c1c44] dark:text-white block whitespace-nowrap">כלים חכמים</span>
                </div>

                {TOOLS.map((tool, i) => (
                    <a
                        key={tool.id}
                        href={`#${tool.id}`}
                        className="flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all hover:bg-slate-100 dark:hover:bg-slate-800 group"
                    >
                        <tool.icon className="w-5 h-5 text-slate-400 group-hover:text-[#d4af37] transition-colors mb-1" />
                        <span className="text-[11px] font-bold text-slate-500 group-hover:text-[#0c1c44] dark:group-hover:text-white whitespace-nowrap">{tool.name}</span>
                    </a>
                ))}
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
