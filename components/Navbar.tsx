"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-100 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:h-24 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Lazy Art"
            width={55}
            height={55}
            priority
            className="h-12 w-12 object-contain md:h-14 md:w-14"
          />

          <div>
            <h1 className="text-2xl font-black leading-none text-[#8B1E2D] md:text-3xl">
              Lazy Art
            </h1>

            <p className="mt-1 text-xs tracking-wide text-[#8B1E2D]/80">
              懶得畫室
            </p>
          </div>
        </Link>

        {/* 桌機版 */}
        <nav className="hidden items-center gap-8 text-[15px] font-medium text-slate-700 lg:flex">
          <Link href="/about" className="transition hover:text-[#8B1E2D]">
            關於畫室
          </Link>

         <Link href="/course" className="transition hover:text-[#8B1E2D]">
  課程介紹
</Link>

          <Link href="/course" className="transition hover:text-[#8B1E2D]">
            立即報名
          </Link>

          <Link href="/teachers" className="transition hover:text-[#8B1E2D]">
            師資介紹
          </Link>

          <Link href="/classroom" className="transition hover:text-[#8B1E2D]">
            教室環境
          </Link>

          <Link href="/contact" className="transition hover:text-[#8B1E2D]">
            聯絡我們
          </Link>
        </nav>

        {/* 手機版 */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-[#8B1E2D]"
            aria-label="開啟選單"
          >
            ☰
          </button>
        </div>
      </div>

      {/* 手機選單 */}
      {menuOpen && (
        <div className="border-t bg-white shadow-md lg:hidden">
          <nav className="flex flex-col py-2">
            <Link
              href="/about"
              className="px-6 py-4 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              關於畫室
            </Link>

            <Link
              href="/course"
              className="px-6 py-4 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              課程介紹
            </Link>

            <Link
              href="/course"
              className="px-6 py-4 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              立即報名
            </Link>

            <Link
              href="/teachers"
              className="px-6 py-4 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              師資介紹
            </Link>

            <Link
              href="/classroom"
              className="px-6 py-4 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              教室環境
            </Link>

            <Link
              href="/contact"
              className="px-6 py-4 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              聯絡我們
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
