"use client";
import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

export default function Toaster() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handleToast = (e) => {
            const { message, type = "success" } = e.detail;
            const id = Math.random().toString(36).substr(2, 9);
            setToasts((prev) => [...prev, { id, message, type }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 4000);
        };

        window.addEventListener("show-toast", handleToast);
        return () => window.removeEventListener("show-toast", handleToast);
    }, []);

    return (
        <div className="fixed top-24 left-6 z-[150] flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="p-4 rounded-2xl shadow-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center gap-3 animate-fade-in pointer-events-auto min-w-[300px]"
                >
                    {toast.type === "success" ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-bold text-sm text-[#0c1c44] dark:text-white flex-1">{toast.message}</span>
                    <button
                        onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}

// Utility to trigger toast
export const toast = (message, type = "success") => {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("show-toast", { detail: { message, type } }));
    }
};
