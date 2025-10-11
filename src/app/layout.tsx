import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const portada: NextFontWithVariable = localFont({
  src: "../../public/portada.woff2",
  variable: "--font-portada",
});

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
        className={`${portada.variable} ${vazirmatn.variable} font-portada flex justify-center w-full h-svh antialiased`}
      >
        <span className="max-w-150 w-full">{children}</span>
        <Toaster />
      </body>
    </html>
  );
}
