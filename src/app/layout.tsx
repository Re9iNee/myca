import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const portada: NextFontWithVariable = localFont({
  src: "../../public/portada.woff2",
  variable: "--font-portada",
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
        className={`font-portada ${portada.variable} mx-auto h-screen max-w-150 antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
