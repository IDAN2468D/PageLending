"use client";
import { useState, useRef } from "react";
import { Mic, MicOff, Settings, ListChecks, HeartHandshake, PhoneCall, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiVoiceAnalyzer() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const recognitionRef = useRef(null);

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const startRecording = () => {
        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                setErrorMsg("הדפדפן שלך לא תומך בהקלטה. נסה בכרום (Chrome) או ספארי מעודכן.");
                return;
            }

            const recognition = new SpeechRecognition();
            recognition.lang = 'he-IL'; // Hebrew
            recognition.continuous = false; // Stop after a pause
            recognition.interimResults = true;

            recognition.onstart = () => {
                setIsRecording(true);
                setErrorMsg("");
                setTranscript("");
                setResult(null);
            };

            recognition.onresult = (event) => {
                let text = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                setTranscript(text);
            };

            recognition.onerror = (event) => {
                console.error("Speech rec error", event.error);
                if (event.error === 'not-allowed') {
                    setErrorMsg("נא לאשר גישה למיקרופון בדפדפן.");
                } else {
                    setErrorMsg("אירעה שגיאה. ההקלטה הופסקה.");
                }
                setIsRecording(false);
            };

            recognition.onend = () => {
                if (isRecording) {
                    setIsRecording(false);
                    if (transcript.trim().length > 10) {
                        analyzeText(transcript);
                    } else if (transcript.trim().length > 0) {
                        setErrorMsg("ההקלטה קצרה מדי. נסה לפרט יותר.");
                    }
                }
            };

            recognitionRef.current = recognition;
            recognition.start();
        } catch (e) {
            setErrorMsg("שגיאה בהפעלת המיקרופון.");
        }
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsRecording(false);
    };

    const analyzeText = async (textToProcess) => {
        setIsAnalyzing(true);
        try {
            const res = await fetch("/api/ai-voice-budget", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: textToProcess })
            });
            const data = await res.json();
            if (!data.error) {
                setResult(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <section className="py-24 bg-[#0c1c44] text-white relative overflow-hidden" dir="rtl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-sm font-bold">
                        <Mic className="w-4 h-4" /> בינה מלאכותית קולית לזיהוי כשלים כלכליים
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black">
                        שפוך את הלב. ה-AI שלנו מקשיב.
                    </h2>
                    <p className="text-white/60 font-medium text-lg max-w-2xl mx-auto">
                        לחץ על המיקרופון, ופשוט ספר לנו בקול מה מטריד אותך בחשבון הבנק שלך (מינוס, הלוואה, או סתם חוסר סדר). המערכת תקשיב לך ותפלוט משימות לביצוע מידי. זה יעבוד כמו קסם.
                    </p>
                </div>

                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative">

                    <div className="flex flex-col items-center justify-center space-y-6">

                        {/* Mic Button */}
                        <button
                            onClick={toggleRecording}
                            disabled={isAnalyzing}
                            className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all ${isRecording
                                    ? "bg-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.6)] animate-pulse"
                                    : "bg-[#d4af37] text-[#0c1c44] hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                } disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed`}
                        >
                            {isRecording ? (
                                <>
                                    <div className="absolute inset-0 border-4 border-rose-400 rounded-full animate-ping opacity-50"></div>
                                    <MicOff className="w-10 h-10 text-white" />
                                </>
                            ) : (
                                <Mic className="w-10 h-10 flex-shrink-0" />
                            )}
                        </button>

                        <p className={`font-bold transition-colors ${isRecording ? "text-rose-400" : "text-[#d4af37]"}`}>
                            {isRecording ? "מקשיב... (לחץ שוב לעצירה)" : "לחץ להקלטה (חובה לאשר דפדפן)"}
                        </p>

                        {errorMsg && (
                            <div className="flex items-center gap-2 bg-rose-500/10 text-rose-400 px-4 py-2 rounded-lg border border-rose-500/30 text-sm">
                                <AlertCircle className="w-4 h-4" /> {errorMsg}
                            </div>
                        )}

                        {/* Transcript Area */}
                        {(transcript || isAnalyzing) && (
                            <div className="w-full max-w-xl mx-auto bg-black/30 rounded-2xl p-6 min-h-[100px] border border-white/5 relative">
                                {isAnalyzing && (
                                    <div className="absolute inset-0 z-10 bg-slate-900/80 rounded-2xl flex flex-col items-center justify-center gap-3">
                                        <Settings className="w-8 h-8 text-emerald-400 animate-spin" />
                                        <span className="text-emerald-400 font-bold tracking-widest text-sm">מפענח ומנתח משמעויות פיננסיות...</span>
                                    </div>
                                )}
                                <p className="text-white/80 leading-relaxed font-medium">"{transcript}"</p>
                            </div>
                        )}
                    </div>

                    {/* Results Area */}
                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-8 text-right overflow-hidden"
                            >
                                <div className="border-t border-white/10 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/30">
                                        <HeartHandshake className="w-8 h-8 text-emerald-400 mb-4" />
                                        <p className="text-white font-medium leading-relaxed">{result.empathy_msg}</p>
                                    </div>
                                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                                        <ListChecks className="w-8 h-8 text-[#d4af37] mb-4" />
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <span className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-xs text-[#d4af37] font-bold border border-slate-700 shrink-0 mt-0.5">1</span>
                                                <p className="text-white/80 text-sm">{result.task_1}</p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-xs text-[#d4af37] font-bold border border-slate-700 shrink-0 mt-0.5">2</span>
                                                <p className="text-white/80 text-sm">{result.task_2}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-col items-center justify-center p-6 bg-gradient-to-l from-[#d4af37]/20 to-transparent rounded-2xl border border-[#d4af37]/30">
                                    <p className="text-white/90 text-center mb-4">{result.action_call}</p>
                                    <a href="#contact" className="px-8 py-3 bg-[#d4af37] text-[#0c1c44] flex items-center gap-2 font-black rounded-xl hover:bg-[#c29f30] transition shadow-lg">
                                        <PhoneCall className="w-4 h-4 ml-2" /> תאם פגישה עם יועץ
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </section>
    );
}
