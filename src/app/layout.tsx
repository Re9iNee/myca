import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const portada = localFont({ src: "../../public/portada.woff2" });

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
        className={`${portada.className} mx-auto h-screen max-w-150 antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
