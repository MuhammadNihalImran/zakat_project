import type { Metadata } from "next";
import "./globals.css";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Zakat Companion — Guided Zakat Calculator",
  description: "Calculate your Zakat with confidence through a simple, guided, transparent, and privacy-conscious calculator.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <LanguageProvider>
          {children}
          <ChatbotWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}

