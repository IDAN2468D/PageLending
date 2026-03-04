"use client";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
    const phoneNumber = "972778001234"; // Replace with real phone
    const message = encodeURIComponent("שלום, הגעתי דרך האתר ואשמח לתאם שיחת ייעוץ.");
    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-[99] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
            title="דברו איתנו בוואטסאפ"
        >
            <MessageCircle className="w-8 h-8" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:mr-2 transition-all duration-300 font-bold whitespace-nowrap">
                דברו איתנו
            </span>
            {/* Ping animation indicator */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
        </a>
    );
}
