"use client";
import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, Wallet, Download, Percent, Briefcase } from "lucide-react";

export default function AdvancedCalculator() {
    const [initial, setInitial] = useState(50000);
    const [monthly, setMonthly] = useState(2500);
    const [years, setYears] = useState(10);
    const [rate, setRate] = useState(7);

    const data = useMemo(() => {
        let current = initial;
        const chartData = [];
        for (let i = 0; i <= years; i++) {
            chartData.push({
                year: i,
                balance: Math.round(current),
                invested: initial + (monthly * 12 * i)
            });
            current = (current + (monthly * 12)) * (1 + rate / 100);
        }
        return chartData;
    }, [initial, monthly, years, rate]);

    const totalBalance = data[data.length - 1].balance;
    const totalInvested = data[data.length - 1].invested;
    const profit = totalBalance - totalInvested;

    return (
        <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black text-[#0c1c44] dark:text-white">
                                כמה כסף מחכה לכם <span className="text-[#d4af37]">בעתיד?</span>
                            </h2>
                            <p className="text-xl text-slate-500 font-medium">כלי מקצועי לחישוב צמיחת ההון שלכם - עם גרף אינטראקטיבי בזמן אמת.</p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl space-y-8 border border-slate-100 dark:border-slate-800">
                            {/* Input Sliders */}
                            <div className="space-y-3">
                                <div className="flex justify-between font-bold text-[#0c1c44] dark:text-white">
                                    <span>הפקדה ראשונית: ₪{initial.toLocaleString()}</span>
                                    <Wallet size={18} className="text-[#d4af37]" />
                                </div>
                                <input type="range" min="0" max="1000000" step="5000" value={initial} onChange={(e) => setInitial(Number(e.target.value))} className="w-full accent-[#d4af37]" />
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between font-bold text-[#0c1c44] dark:text-white">
                                    <span>חיסכון חודשי: ₪{monthly.toLocaleString()}</span>
                                    <TrendingUp size={18} className="text-[#d4af37]" />
                                </div>
                                <input type="range" min="0" max="50000" step="500" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full accent-[#d4af37]" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between font-bold text-[#0c1c44] dark:text-white text-sm">
                                        <span>תקופה: {years} שנים</span>
                                    </div>
                                    <input type="range" min="1" max="40" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-[#d4af37]" />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between font-bold text-[#0c1c44] dark:text-white text-sm">
                                        <span>ריבית צפויה: {rate}%</span>
                                    </div>
                                    <input type="range" min="1" max="15" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-[#d4af37]" />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl border border-slate-100 dark:border-slate-800 h-[500px] flex flex-col justify-between">
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl">
                                <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">סכום סופי</p>
                                <p className="text-3xl font-black text-[#0c1c44] dark:text-white">₪{totalBalance.toLocaleString()}</p>
                            </div>
                            <div className="bg-[#d4af37]/10 p-5 rounded-2xl">
                                <p className="text-xs font-bold text-[#d4af37] mb-1 uppercase tracking-widest">רווח מהשקעה</p>
                                <p className="text-3xl font-black text-[#d4af37]">₪{profit.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="flex-1 w-full min-h-[250px]">
                            <ResponsiveContainer width="100%" height="100%" minHeight={250}>
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#d4af37" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                        labelStyle={{ fontWeight: 'bold' }}
                                        formatter={(val) => [`₪${val.toLocaleString()}`, 'יתרה']}
                                    />
                                    <Area type="monotone" dataKey="balance" stroke="#d4af37" strokeWidth={4} fillOpacity={1} fill="url(#colorBalance)" />
                                    <Area type="monotone" dataKey="invested" stroke="#0c1c44" strokeWidth={2} fillOpacity={0.1} fill="#0c1c44" strokeDasharray="5 5" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
