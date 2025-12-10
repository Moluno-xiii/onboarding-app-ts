import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Raleway,
  Inter,
  Macondo_Swash_Caps,
  Quantico,
} from "next/font/google";
import "./globals.css";
import AuthProvider from "@/contexts/Authcontext";
import { Toaster } from "react-hot-toast";

// Configure the font
const raleway = Raleway({
  subsets: ["latin"], // required
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"], // optional
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
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

const quantico = Quantico({
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-quantico",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${raleway.className} flex min-h-dvh ${geistMono.variable} ${inter.variable} ${quantico.variable} ${macondoSwash.variable} antialiased`}
      >
        <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
