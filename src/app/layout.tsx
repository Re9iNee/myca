import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../style/globals.css";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const vazirmatn: NextFontWithVariable = localFont({
  src: "../../public/vazirmatn.woff2",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "مایکا",
  description: "سرویس خدمات دوره ای ماشین",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.variable} font-vazirmatn flex h-svh w-full justify-center antialiased`}
      >
        <span className="w-full max-w-150">{children}</span>
        <Toaster />
      </body>
    </html>
  );
}
