"use client";
import { useState } from "react";
import { Play, Star, Quote, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
    {
        name: "יונתן רותם",
        role: "הייטקיסט, תל אביב",
        text: "השינוי הכי גדול שעשיתי. תוך חודשים בודדים הצלחתי לחסוך מעל 3,000 שקל בחודש רק מניהול תקציב נכון.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        videoSrc: "/success_story_1.mp4"
    },
    {
        name: "מעיין ועידן",
        role: "זוג צעיר, ראשל\"צ",
        text: "הגענו עם בלאגן שלם בחשבונות. היום יש לנו תכנית כלכלית ברורה ל-10 השנים הבאות ודירה בדרך.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200",
        videoSrc: ""
    },
    {
        name: "דוד לוי",
        role: "בעל עסק עצמאי",
        text: "כעצמאי שתמיד פחד מהפיננסים, קיבלתי כלים ששינו לי את החיים. היום אני משקיע בבורסה בביטחון מלא.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        videoSrc: ""
    }
];

export default function VideoTestimonials() {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <section className="py-10 md:py-16 bg-slate-50 dark:bg-slate-800/20 overflow-hidden relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-5xl font-black text-[#0c1c44] dark:text-white">סיפורי הצלחה <span className="text-[#d4af37]">בווידאו</span></h2>
                    <p className="text-xl text-slate-500 font-medium">אנשים אמיתיים, שינויים אמיתיים. אלפי משפחות כבר בחרו בדרך הכלכלית הנכונה.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl relative border border-slate-100 dark:border-slate-800 group"
                        >
                            <div className="absolute top-8 left-8 text-[#d4af37] opacity-20">
                                <Quote size={48} />
                            </div>

                            <div className="relative z-10 space-y-6">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="#d4af37" className="text-[#d4af37]" />)}
                                </div>
                                <p className="text-lg font-bold text-[#0c1c44] dark:text-slate-300 leading-relaxed italic">"{item.text}"</p>

                                <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-200">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-[#0c1c44] dark:text-white">{item.name}</h4>
                                        <p className="text-sm text-slate-400 font-bold">{item.role}</p>
                                    </div>
                                    {item.videoSrc && (
                                        <button
                                            onClick={() => setSelectedVideo(item.videoSrc)}
                                            className="mr-auto w-12 h-12 rounded-full bg-[#0c1c44] dark:bg-[#d4af37] flex items-center justify-center text-white dark:text-[#0c1c44] shadow-lg hover:scale-110 transition-transform focus:outline-none"
                                        >
                                            <Play size={20} fill="currentColor" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0c1c44]/90 backdrop-blur-sm"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-4 left-4 z-10 bg-black/50 hover:bg-[#d4af37] text-white hover:text-[#0c1c44] transition-colors p-2 rounded-full"
                            >
                                <X size={24} />
                            </button>
                            <div className="aspect-video w-full h-full bg-slate-900 border-4 border-slate-800">
                                <video
                                    className="w-full h-full object-contain"
                                    controls
                                    autoPlay
                                    src={selectedVideo}
                                >
                                    הדפדפן שלך לא תומך בהצגת וידאו.
                                </video>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
