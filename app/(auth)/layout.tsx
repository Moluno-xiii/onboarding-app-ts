import Link from "next/link";
import React from "react";
import { MdOutlineHub } from "react-icons/md";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      lang="en"
      className="flex min-h-full min-w-full flex-1 flex-col items-center justify-center gap-y-6 md:gap-10"
    >
      <Link href="/" className="flex items-center gap-2">
        <MdOutlineHub className="text-yellow text-3xl" />
        <span className="font-macondo-swash text-3xl font-bold tracking-[-0.015em] text-gray-900 md:text-6xl">
          Onboardify
        </span>
      </Link>
      <main>{children}</main>
    </div>
  );
}
