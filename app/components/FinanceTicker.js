"use client";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const MOCK_DATA = [
    { label: "דולר/שקל", price: 3.65, change: "+0.12%", up: true },
    { label: "אירו/שקל", price: 3.98, change: "-0.25%", up: false },
    { label: "ת״א 35", price: 2355.40, change: "+0.65%", up: true },
    { label: "S&P 500", price: 6100.25, change: "+1.10%", up: true },
    { label: "NASDAQ", price: 20120.80, change: "-0.40%", up: false },
    { label: "ביטקוין ($)", price: 98000.00, change: "+2.15%", up: true },
    { label: "זהב ($)", price: 2750.30, change: "+0.45%", up: true },
];

export default function FinanceTicker() {
    const [data, setData] = useState(MOCK_DATA);

    useEffect(() => {
        // Fetch real market data from our API
        const fetchMarketData = async () => {
            try {
                const res = await fetch('/api/finance-ticker');
                if (res.ok) {
                    const realData = await res.json();
                    if (realData && realData.length > 0) {
                        setData(realData);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch live market data", error);
            }
        };

        fetchMarketData();

        // Visual "live" tick effect
        const interval = setInterval(() => {
            setData(prev => prev.map(item => ({
                ...item,
                price: item.price + (Math.random() - 0.5) * (item.price * 0.0005)
            })));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 bg-[#07112c] border-b border-[#d4af37]/20 shadow-[0_5px_15px_rgba(0,0,0,0.3)] z-[100] h-12 flex items-center overflow-hidden" dir="ltr">
            {/* Live Indicator */}
            <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center px-4 bg-gradient-to-r from-[#07112c] via-[#07112c] to-transparent border-r border-white/5 pr-12">
                <div className="flex items-center gap-2 px-2.5 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-white/80 text-[10px] font-bold tracking-wider uppercase">Live Markets</span>
                </div>
            </div>

            {/* Edge Fade Right */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#07112c] to-transparent z-10 pointer-events-none" />

            {/* Scrolling Ticker */}
            <div className="flex animate-ticker gap-8 items-center min-w-full w-max pl-[150px]">
                {[...data, ...data].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 font-mono whitespace-nowrap group">
                        <span className="font-bold text-[#d4af37] tracking-wider text-xs md:text-sm drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">{item.label}</span>
                        <span className="text-white font-medium text-xs md:text-sm">
                            {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md font-bold text-[11px] md:text-xs transition-colors duration-300 ${item.up ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:bg-rose-500/20"}`}>
                            <span dir="ltr">{item.change}</span>
                            {item.up ? <TrendingUp size={12} strokeWidth={3} /> : <TrendingDown size={12} strokeWidth={3} />}
                        </span>
                        {/* Separator Dot */}
                        <div className="w-1 h-1 rounded-full bg-white/10 ml-5" />
                    </div>
                ))}
            </div>
        </div>
    );
}
