"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            OS
          </div>
          <span className="text-lg font-semibold text-gray-900">
            OpenSolve AI
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/explore"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === "/explore"
                ? "font-semibold text-indigo-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Explore
          </Link>
          <Link
            href="/submit"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              pathname === "/submit"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Submit a Problem
          </Link>
        </nav>
      </div>
    </header>
  );
}
