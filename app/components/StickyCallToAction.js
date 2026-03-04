"use client";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

export default function StickyCallToAction() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-6 right-6 z-[99] md:hidden transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
                }`}
        >
            <a
                href="#contact"
                className="flex items-center gap-3 bg-[#d4af37] text-[#0c1c44] font-black px-6 py-4 rounded-2xl shadow-2xl hover:bg-[#c29f30] transition-all active:scale-95"
            >
                <Phone className="w-5 h-5" />
                קבע פגישה עכשיו
            </a>
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-2xl bg-[#d4af37] animate-ping opacity-20 pointer-events-none" />
        </div>
    );
}
