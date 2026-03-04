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
            className={`fixed bottom-0 left-0 right-0 z-[80] md:hidden transition-transform duration-500 ${show ? "translate-y-0" : "translate-y-full pointer-events-none"
                }`}
        >
            <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex justify-center">
                <a
                    href="#contact"
                    className="flex w-full max-w-sm justify-center items-center gap-3 bg-[#0c1c44] text-white font-black px-6 py-4 rounded-full shadow-lg hover:bg-[#1a2f66] transition-all active:scale-95"
                >
                    <Phone className="w-5 h-5 text-[#d4af37]" />
                    קבע פגישה עכשיו
                </a>
            </div>
        </div>
    );
}
