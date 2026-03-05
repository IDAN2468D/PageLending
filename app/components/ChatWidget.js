"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "שלום! איך אני יכול לעזור לכם היום לתכנן את העתיד הכלכלי שלכם?", sender: "bot", time: "" }
    ]);

    // Set initial message time client-side only to avoid hydration mismatch
    useEffect(() => {
        setMessages(prev => prev.map((m, i) => i === 0 ? { ...m, time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }) } : m));
    }, []);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isTyping) return;

        const newUserMessage = {
            id: messages.length + 1,
            text: inputValue,
            sender: "user",
            time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
        };

        const newMessagesContext = [...messages, newUserMessage];
        setMessages(newMessagesContext);
        setInputValue("");
        setIsTyping(true);

        try {
            // Map past messages for Gemini context
            const apiMessages = newMessagesContext.map(m => ({
                role: m.sender === "user" ? "user" : "model",
                parts: [{ text: m.text }]
            }));

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: apiMessages })
            });
            const data = await res.json();

            setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: data.text || "סליחה, חיבור הרשת איטי כרגע. תוכל להשאיר מספר ונחזור אליך?",
                sender: "bot",
                time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
            }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: "מצטער, חלה שגיאה בחיבור כרגע. נא נסה שוב או צור קשר בטלפון.",
                sender: "bot",
                time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-24 md:bottom-6 right-6 z-[100] flex flex-col items-end" dir="rtl">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 border border-slate-100">
                    {/* Header */}
                    <div className="bg-[#0c1c44] p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center shadow-lg transform -rotate-6">
                                <Bot className="w-6 h-6 text-[#0c1c44] rtl-flip" />
                            </div>
                            <div className="text-right">
                                <h3 className="font-bold text-sm">נציג FinSmart</h3>
                                <div className="flex items-center gap-1.5 mt-0.5 justify-start">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] text-white/70 font-medium tracking-wide">זמין כעת</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-grow overflow-y-auto p-4 bg-[#f8fafc] flex flex-col gap-4 custom-scrollbar">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"} items-end gap-2`}
                            >
                                {msg.sender === "user" && (
                                    <div className="w-8 h-8 rounded-full bg-[#0c1c44] flex items-center justify-center flex-shrink-0 shadow-md">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                )}

                                <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm text-right ${msg.sender === "user"
                                    ? "bg-white border border-slate-200 text-[#0c1c44] rounded-br-none"
                                    : "bg-[#0c1c44] text-white rounded-bl-none shadow-md"
                                    }`}>
                                    <p className="font-black whitespace-pre-wrap">{msg.text}</p>
                                    <p className={`text-[10px] mt-1.5 font-bold ${msg.sender === "user" ? "text-slate-400" : "text-[#d4af37]"}`}>
                                        {msg.time}
                                    </p>
                                </div>

                                {msg.sender === "bot" && (
                                    <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0 border border-[#d4af37]/30 shadow-sm">
                                        <Bot className="w-4 h-4 text-[#d4af37]" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-end items-end gap-2">
                                <div className="max-w-[80%] p-4 rounded-2xl bg-[#0c1c44] rounded-bl-none shadow-sm flex items-center gap-1.5 h-[52px]">
                                    <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce" style={{ animationDelay: "0ms" }}></span>
                                    <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                    <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0 border border-[#d4af37]/30">
                                    <Bot className="w-4 h-4 text-[#d4af37]" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-4 border-t border-slate-100 bg-white">
                        <div className="relative group">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="הקלידו הודעה..."
                                className="w-full pr-12 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/5 transition-all text-sm font-bold text-[#0c1c44] text-right"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#d4af37] hover:bg-[#d4af37]/10 rounded-lg transition-all"
                            >
                                <Send className="w-5 h-5 rtl:rotate-180" />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 group relative border-4 ${isOpen ? "bg-white text-[#0c1c44] border-slate-100" : "bg-[#0c1c44] text-[#d4af37] border-white/10"
                    }`}
            >
                <div className="absolute inset-0 rounded-full bg-[#d4af37] animate-ping opacity-20 group-hover:opacity-0 transition-opacity" style={{ animationDuration: '3s' }}></div>
                {isOpen ? (
                    <X className="w-8 h-8 relative z-10" />
                ) : (
                    <MessageCircle className="w-8 h-8 relative z-10 rtl-flip" />
                )}
            </button>
        </div>
    );
}
