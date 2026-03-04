"use client";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisible = () => {
            const scrolled = document.documentElement.scrollTop;
            if (scrolled > 600) {
                setVisible(true);
            } else if (scrolled <= 600) {
                setVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-[160px] md:bottom-24 right-6 z-[98] p-3 rounded-full bg-white md:bg-white/80 backdrop-blur-md border border-slate-200 shadow-xl text-[#0c1c44] hover:text-[#d4af37] transition-all duration-300 ${visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
                }`}
        >
            <ChevronUp className="w-6 h-6" />
        </button>
    );
}
