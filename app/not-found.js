import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 text-center">
            <div className="space-y-8">
                <div className="relative inline-block">
                    <span className="text-[180px] font-black text-[#0c1c44]/5 leading-none select-none">404</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <AlertCircle className="w-24 h-24 text-[#d4af37] animate-bounce" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-4xl font-black text-[#0c1c44]">אופס... הדף לא נמצא</h1>
                    <p className="text-slate-500 font-medium text-lg max-w-md mx-auto leading-relaxed">
                        נראה שהדף שחיפשתם יצא לחופשה כלכלית. אל דאגה, אנחנו עדיין כאן בשבילכם.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link
                        href="/"
                        className="btn-primary w-full sm:w-auto px-10"
                    >
                        חזרה לדף הבית
                    </Link>
                    <Link
                        href="/blog"
                        className="px-8 py-4 font-bold text-[#0c1c44] hover:text-[#d4af37] transition-all flex items-center gap-2"
                    >
                        קראו בבלוג שלנו
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
