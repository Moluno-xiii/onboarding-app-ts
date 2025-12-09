import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Raleway,
  Inter,
  Macondo_Swash_Caps,
} from "next/font/google";
import "./globals.css";

// Configure the font
const raleway = Raleway({
  subsets: ["latin"], // required
  weight: ["400", "700"], // optional, include weights you want
  style: ["normal", "italic"], // optional
  display: "swap",
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
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
      <body className={` ${raleway.className} antialiased`}>{children}</body>
    </html>
  );
}