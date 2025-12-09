import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Macondo_Swash_Caps } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const macondoSwash = Macondo_Swash_Caps({
  variable: "--font-macondo-swash",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Onboardify",
  description:
    "A SaaS platform for creating effortless user onboarding tours and tooltips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${macondoSwash.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}