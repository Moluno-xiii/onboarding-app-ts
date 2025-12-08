import Link from "next/link";
import { MdOutlineHub } from "react-icons/md";

export const Header: React.FC = () => (
  <header className="bg-background/80 sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 p-4 backdrop-blur-sm dark:border-gray-800">
    <Link href="/" className="flex items-center gap-2">
      <MdOutlineHub className="text-primary text-3xl" />
      <h2 className="text-lg leading-tight font-bold tracking-[-0.015em] text-gray-900 font-macondo-swash">
        Onboardify
      </h2>
    </Link>
    <Link
      href="/auth"
      className="bg-primary hover:bg-primary-dark flex h-9 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg px-3 text-sm leading-normal font-bold tracking-[0.015em] text-white transition-colors"
    >
      <span className="truncate">Get Started</span>
    </Link>
  </header>
);