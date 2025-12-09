"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdOutlineHub, MdMenu, MdClose } from "react-icons/md";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Docs", href: "/docs" },
  { label: "Dashboard", href: "/dashboard" },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      pathname === href ? "text-primary" : "text-gray-700"
    }`;

  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b border-gray-200 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <MdOutlineHub className="text-primary text-3xl" />
            <span className="font-macondo-swash text-lg font-bold tracking-[-0.015em] text-gray-900">
              Onboardify
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex md:items-center md:gap-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(item.href)}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/signup"
            className="bg-primary hover:bg-primary-dark ml-3 inline-flex items-center rounded-lg px-4 py-2 text-sm font-bold text-white transition-colors"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            aria-label="Toggle navigation"
            onClick={() => setOpen((s) => !s)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700"
          >
            {open ? (
              <MdClose className="text-2xl" />
            ) : (
              <MdMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {open && (
        <div className="bg-background/95 border-t border-gray-200 backdrop-blur-sm md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="flex flex-col gap-2">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={linkClass(item.href) + " block"}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="bg-primary hover:bg-primary-dark mt-2 inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-bold text-white transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
