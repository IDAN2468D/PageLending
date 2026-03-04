"use client";
import { useState, useEffect, useCallback } from "react";
import { ShoppingBag, Users, Zap, CheckCircle } from "lucide-react";

const REAL_NAMES = ["גלית", "יוסי", "ניר", "מיכל", "דניאל", "עמית", "שרון", "אורן", "ליאת", "גיא", "רוני", "נופר", "איתי", "אופיר", "סמדר"];
const CITIES = ["תל אביב", "ירושלים", "חיפה", "ראשון לציון", "פתח תקווה", "רמת גן", "הרצליה", "באר שבע", "נתניה"];

export default function SocialProof() {
    const [isVisible, setIsVisible] = useState(false);
    const [current, setCurrent] = useState({});

    const generateNotification = useCallback(() => {
        const name = REAL_NAMES[Math.floor(Math.random() * REAL_NAMES.length)];
        const city = CITIES[Math.floor(Math.random() * CITIES.length)];
        const time = Math.floor(Math.random() * 20) + 2;
        setCurrent({ name, city, time });
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 5000);
    }, []);

    useEffect(() => {
        const initialTimer = setTimeout(() => generateNotification(), 10000);
        const interval = setInterval(() => generateNotification(), 45000);
        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, [generateNotification]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-[160] max-w-[280px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-2xl shadow-2xl animate-slide-in flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-right">
                <p className="text-sm font-bold text-[#0c1c44] dark:text-white leading-tight">
                    {current.name} מ{current.city}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                    הצטרף לייעוץ לפני {current.time} דקות
                </p>
            </div>
        </div>
    );
}
