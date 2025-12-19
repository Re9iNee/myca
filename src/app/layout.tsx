import type { Metadata } from "next";
import localFont from "next/font/local";
import "../style/globals.css";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const vazirmatn: NextFontWithVariable = localFont({
  src: [
    {
      path: "../../public/fonts/vazirmatn-fd/Vazirmatn-FD-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-fd/Vazirmatn-FD-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-fd/Vazirmatn-FD-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-fd/Vazirmatn-FD-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-fd/Vazirmatn-FD-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-fd/Vazirmatn-FD-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-fd/Vazirmatn-FD-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-fd/Vazirmatn-FD-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/vazirmatn-fd/Vazirmatn-FD-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
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
        className={`${vazirmatn.variable} font-vazirmatn flex w-full justify-center antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
