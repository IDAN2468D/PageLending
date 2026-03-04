"use client";
import { ArrowLeft, Clock, Calendar, Share2, Facebook, Twitter } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const postsData = {
    "10-mistakes-families-make": {
        title: "10 טעויות כספיות שכל משפחה עושה (ואיך להימנע מהן)",
        date: "3 במרץ, 2026",
        readTime: "5 דקות",
        content: `
            <p>ניהול כלכלת משפחה הוא אתגר יומיומי. במדינת ישראל, יוקר המחיה והלחץ החברתי מובילים משפחות רבות לקבל החלטות שגויות שעולות להן ביוקר בטווח הארוך.</p>
            <h3>1. חוסר במעקב אחר הוצאות</h3>
            <p>משפחות רבות לא יודעות לאן הכסף שלהן הולך. בלי מעקב מדויק, אי אפשר לבצע אופטימיזציה.</p>
            <h3>2. קניית רגשית</h3>
            <p>הרבה מההוצאות שלנו נובעות מהרגש ולא מצורך אמיתי. תכנון מראש של קניות יכול לחסוך עד 20% מההוצאות החודשיות.</p>
            <h3>3. התעלמות מהחזרי מס</h3>
            <p>מיליארדי שקלים שוכבים בקופת המדינה וממתינים לשכירים שידרשו אותם. אל תוותרו על מה שמגיע לכם.</p>
        `,
        image: "https://images.unsplash.com/photo-1573164060897-42512a0d700b?auto=format&fit=crop&q=80&w=2069"
    }
    // and more...
};

export default function BlogPost() {
    const params = useParams();
    const post = postsData[params.slug] || postsData["10-mistakes-families-make"];

    return (
        <article className="min-h-screen bg-white dark:bg-slate-950">
            {/* Header Area */}
            <div className="pt-40 pb-20 px-6 max-w-4xl mx-auto space-y-6">
                <Link href="/blog" className="inline-flex items-center gap-2 text-[#d4af37] font-bold hover:underline mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    חזרה לבלוג
                </Link>
                <h1 className="text-4xl md:text-6xl font-black text-[#0c1c44] dark:text-white leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center gap-6 text-slate-400 font-medium">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {post.readTime} קריאה
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="max-w-7xl mx-auto px-6 mb-20">
                <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 pb-24">
                <div
                    className="prose prose-xl prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-headings:text-[#0c1c44] dark:prose-headings:text-white prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-[#0c1c44] dark:text-white">שתפו את המאמר:</span>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:scale-110 transition-transform"><Facebook className="w-5 h-5" /></button>
                            <button className="p-2 rounded-full bg-sky-100 text-sky-500 hover:scale-110 transition-transform"><Twitter className="w-5 h-5" /></button>
                            <button className="p-2 rounded-full bg-slate-100 text-slate-500 hover:scale-110 transition-transform"><Share2 className="w-5 h-5" /></button>
                        </div>
                    </div>
                    <Link href="/#contact" className="px-8 py-4 bg-[#d4af37] text-[#0c1c44] font-black rounded-xl hover:bg-[#c29f30] transition-colors shadow-lg">
                        רוצים ייעוץ אישי? לחצו כאן
                    </Link>
                </div>
            </div>
        </article>
    );
}
