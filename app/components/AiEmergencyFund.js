"use client";

import React, { useState } from "react";
import { ShieldAlert, TrendingUp, AlertTriangle, CheckCircle, ChevronDown, Activity, ShieldCheck, HeartPulse } from "lucide-react";

export default function AiEmergencyFund() {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    monthlyExpenses: 15000,
    dependents: 0,
    jobType: "salaried", // salaried, freelance, business, high-tech
    healthIssues: false,
    industryVolatility: "low" // low, medium, high
  });

  const analyzeFund = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // Logic for calculating emergency fund months
      let monthsNeeded = 3; // Base for single salaried
      let maxMonths = 6;
      let score = 85; 

      if (formData.jobType === "freelance" || formData.jobType === "business") {
        monthsNeeded += 2;
        maxMonths += 3;
        score -= 15;
      } else if (formData.jobType === "high-tech") {
        monthsNeeded += 1; // Tech is volatile
        maxMonths += 2;
        score -= 5;
      }

      if (formData.dependents > 0) {
        monthsNeeded += formData.dependents * 0.5;
        maxMonths += formData.dependents * 1;
        score -= 10;
      }

      if (formData.healthIssues) {
        monthsNeeded += 1;
        maxMonths += 2;
        score -= 10;
      }

      if (formData.industryVolatility === "high") {
        monthsNeeded += 2;
        maxMonths += 3;
        score -= 15;
      } else if (formData.industryVolatility === "medium") {
        monthsNeeded += 1;
        maxMonths += 1;
        score -= 5;
      }

      const totalTarget = formData.monthlyExpenses * Math.ceil(monthsNeeded);
      const idealTarget = formData.monthlyExpenses * Math.ceil(maxMonths);

      setResult({
        months: Math.ceil(monthsNeeded),
        maxMonths: Math.ceil(maxMonths),
        targetAmount: totalTarget,
        idealAmount: idealTarget,
        stabilityScore: Math.max(10, Math.min(99, score)),
        recommendation: "בהתבסס על ניתוח רמת הסיכון האישית והתעסוקתית שלך, זוהי כרית הביטחון המדויקת שעליך לשאוף אליה כדי להגן על משפחתך ממשברים."
      });
      setIsAnalyzing(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="premium-glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] relative overflow-hidden group text-right dir-rtl" dir="rtl">
      {/* Background Touches */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#0c1c44]/5 to-transparent -z-0" />
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-[80px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0c1c44] to-slate-800 flex items-center justify-center shadow-lg">
            <ShieldAlert className="w-8 h-8 text-[#d4af37] rtl-flip" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0c1c44] dark:text-white tracking-tighter">כיפת ברזל כלכלית</h2>
            <p className="text-slate-500 font-medium mt-1">חישוב חכם של קרן חירום אידאלית מבוסס פרופיל סיכון</p>
          </div>
        </div>

        {/* Step 1: Input */}
        {step === 1 && (
          <div className="space-y-8 animate-in mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-black text-slate-500 uppercase tracking-widest">הוצאות חודשיות ממוצעות (₪)</label>
                <input 
                  type="number" 
                  value={formData.monthlyExpenses}
                  onChange={(e) => setFormData({...formData, monthlyExpenses: Number(e.target.value)})}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-xl font-black text-[#0c1c44] dark:text-white focus:ring-2 focus:ring-[#d4af37] transition-all outline-none"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-black text-slate-500 uppercase tracking-widest">מספר ילדים סמוכים לשולחנך</label>
                <input 
                  type="number" 
                  min="0"
                  value={formData.dependents}
                  onChange={(e) => setFormData({...formData, dependents: Number(e.target.value)})}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-xl font-black text-[#0c1c44] dark:text-white focus:ring-2 focus:ring-[#d4af37] transition-all outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button 
                onClick={() => setFormData({...formData, jobType: "salaried"})}
                className={`p-6 rounded-2xl border-2 transition-all ${formData.jobType === 'salaried' ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
              >
                <div className="text-center space-y-2">
                  <div className="text-3xl">👔</div>
                  <h4 className="font-bold text-[#0c1c44] dark:text-white">שכיר סטנדרטי</h4>
                </div>
              </button>

              <button 
                onClick={() => setFormData({...formData, jobType: "high-tech"})}
                className={`p-6 rounded-2xl border-2 transition-all ${formData.jobType === 'high-tech' ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
              >
                <div className="text-center space-y-2">
                  <div className="text-3xl">💻</div>
                  <h4 className="font-bold text-[#0c1c44] dark:text-white">הייטק</h4>
                  <p className="text-[10px] text-slate-500">תנודתיות גבוהה יותר</p>
                </div>
              </button>

              <button 
                onClick={() => setFormData({...formData, jobType: "freelance"})}
                className={`p-6 rounded-2xl border-2 transition-all ${formData.jobType === 'freelance' || formData.jobType === 'business' ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
              >
                <div className="text-center space-y-2">
                  <div className="text-3xl">🚀</div>
                  <h4 className="font-bold text-[#0c1c44] dark:text-white">עצמאי/עסק</h4>
                  <p className="text-[10px] text-slate-500">הכנסה לא קבועה</p>
                </div>
              </button>
            </div>

            {/* Health & Industry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <label className="text-sm font-black text-slate-500 uppercase tracking-widest block mb-2">תנודתיות בתעשייה שלך</label>
                <select
                  value={formData.industryVolatility}
                  onChange={(e) => setFormData({...formData, industryVolatility: e.target.value})}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-lg font-bold text-[#0c1c44] dark:text-white focus:ring-2 focus:ring-[#d4af37] transition-all outline-none appearance-none"
                >
                  <option value="low">נמוכה (מגזר ציבורי, רפואה)</option>
                  <option value="medium">בינונית (מסחר, שירותים קלאסיים)</option>
                  <option value="high">גבוהה (הייטק, תיירות, נדל"ן)</option>
                </select>
              </div>

              <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <input 
                  type="checkbox"
                  id="health"
                  checked={formData.healthIssues}
                  onChange={(e) => setFormData({...formData, healthIssues: e.target.checked})}
                  className="w-6 h-6 rounded text-[#d4af37] focus:ring-[#d4af37]"
                />
                <label htmlFor="health" className="font-bold text-[#0c1c44] dark:text-white cursor-pointer select-none">
                  יש הוצאות רפואיות קבועות / מחלות רקע?
                </label>
              </div>
            </div>

            <button onClick={() => setStep(2)} className="btn-gold w-full text-xl mt-8 pb-4 pt-4">
              חשבו כרית ביטחון מומלצת
            </button>
          </div>
        )}

        {/* Step 2: Analyzing */}
        {step === 2 && (
          <div className="py-20 text-center space-y-8 animate-in">
            {useEffect(() => { analyzeFund() }, [])}
            <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto flex items-center justify-center border-4 border-[#d4af37] border-l-transparent animate-spin">
              <ShieldAlert className="w-10 h-10 text-[#d4af37]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-[#0c1c44] dark:text-white">מנתח סיכונים פיננסיים...</h3>
              <p className="text-slate-500 font-medium">משקלל תנודתיות, הרכב משפחתי ויציבות תעסוקתית...</p>
            </div>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 3 && result && (
          <div className="space-y-10 animate-in mt-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-6 ${result.stabilityScore > 75 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                <Activity className="w-4 h-4" />
                ציון יציבות הכנסה: {result.stabilityScore}/100
              </div>
              <h3 className="text-4xl font-black text-[#0c1c44] dark:text-white leading-tight">
                היעד המומלץ לקרן החירום שלך הוא <span className="text-[#d4af37]">₪{result.targetAmount.toLocaleString()}</span>
              </h3>
              <p className="text-slate-500 mt-4 text-lg">{result.recommendation}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-[#0c1c44]" />
                <AlertTriangle className="w-10 h-10 text-[#0c1c44] dark:text-slate-400 mx-auto mb-4" />
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">מינימום נדרש</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-black text-[#0c1c44] dark:text-white">{result.months}</span>
                  <span className="text-lg font-bold text-slate-500 mb-1">חודשים</span>
                </div>
                <p className="text-xl font-bold text-slate-500 mt-2">₪{result.targetAmount.toLocaleString()}</p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#0c1c44] p-8 rounded-3xl border border-[#0c1c44] text-center relative overflow-hidden transform md:-translate-y-4 shadow-2xl">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#d4af37] text-[#0c1c44] text-[10px] font-black px-2 py-1 rounded-lg uppercase">האידיאל</div>
                <ShieldCheck className="w-10 h-10 text-[#d4af37] mx-auto mb-4" />
                <p className="text-sm font-black text-[#d4af37]/80 uppercase tracking-widest mb-1">יעד מגן אופטימלי</p>
                <div className="flex items-end justify-center gap-1 relative z-10">
                  <span className="text-5xl font-black text-white">{result.maxMonths}</span>
                  <span className="text-lg font-bold text-slate-400 mb-1.5">חודשים</span>
                </div>
                <p className="text-2xl font-black text-[#d4af37] mt-2 relative z-10">₪{result.idealAmount.toLocaleString()}</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2 h-full bg-red-500" />
                <HeartPulse className="w-10 h-10 text-red-500 mx-auto mb-4" />
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">אם לא תערך</p>
                <p className="text-lg font-bold text-[#0c1c44] dark:text-white mt-4">חשיפה פיננסית גבוהה למשברים, לקיחת הלוואות בריבית נשך</p>
              </div>
            </div>

            <div className="pt-8 flex justify-center gap-4">
              <button onClick={() => setStep(1)} className="px-8 py-4 font-black text-slate-500 hover:text-[#0c1c44] dark:hover:text-white transition-colors">
                חשבו מחדש
              </button>
              <button className="btn-gold !px-10">
                קבעו שיחה להגנה פיננסית
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
