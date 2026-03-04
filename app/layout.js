import "./globals.css";
import ChatWidget from "./components/ChatWidget";
import ScrollProgress from "./components/ScrollProgress";
import WhatsAppButton from "./components/WhatsAppButton";
import BackToTop from "./components/BackToTop";
import CookieConsent from "./components/CookieConsent";
import Toaster from "./components/Toaster";
import FinanceTicker from "./components/FinanceTicker";
import Navbar from "./components/Navbar";
import SocialProof from "./components/SocialProof";
import Script from "next/script";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});

export const metadata = {
  title: "FinSmart | ייעוץ פיננסי מקצועי",
  description: "הדרך שלכם לחופש כלכלי מתחילה בייעוץ פיננסי חכם ומותאם אישית.",
  openGraph: {
    title: "FinSmart | ייעוץ פיננסי מקצועי",
    description: "הדרך שלכם לחופש כלכלי מתחילה בייעוץ פיננסי חכם ומותאם אישית.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl" className={heebo.className} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0c1c44" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <FinanceTicker />
        <Navbar />
        <ScrollProgress />
        <Toaster />
        <div className="min-h-screen bg-transparent pt-12">
          {children}
          <ChatWidget />
          <WhatsAppButton />
          <BackToTop />
          <CookieConsent />
          <SocialProof />
        </div>
      </body>
    </html>
  );
}
