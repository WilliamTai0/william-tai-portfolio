import type { Metadata } from "next";
import { Inter, Albert_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const albert = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "William Tai | Backend Systems & AI Integration",
  description: "Portfolio of William Tai - Computer Engineering Graduate, HKUST",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${albert.variable}`}>
      <body className="bg-obsidian-black text-text-secondary antialiased font-body min-h-screen">{children}</body>
    </html>
  );
}