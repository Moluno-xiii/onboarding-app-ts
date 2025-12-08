import Link from "next/link";
import { MdOutlineHub } from "react-icons/md";

export const Footer: React.FC = () => (
  <footer className="border-t border-gray-400 p-8">
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex items-center gap-2">
        <MdOutlineHub className="text-primary text-3xl" />

        <h2 className="text-base font-bold text-gray-900 font-macondo-swash">Onboardify</h2>
      </div>
      <div className="flex gap-6 text-sm text-gray-600">
        <Link href="/about" className="hover:text-primary">
          About
        </Link>
        <Link href="/docs" className="hover:text-primary">
          Docs
        </Link>
        <a className="hover:text-primary" href="#">
          Privacy
        </a>
      </div>
      <p className="text-xs text-gray-500 font-macondo-swash">
        © {new Date().getFullYear()} Onboardify. All rights reserved.
      </p>
    </div>
  </footer>
);
