"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/images/clay-dessert-1.png",
    label: "SEPTEMBER THEME",
    title: "🍰 甜點黏土",
    text: "9/12（六）開始，把喜歡的甜點變成可愛的黏土作品。",
    buttonText: "查看課程",
    href: "/regular?day=週六&course=黏土&time=13:30#classes",
  },
  {
    image: "/images/watercolor-1.png",
    label: "CURRENT WORKSHOP",
    title: "暑末水彩漫漫",
    text: "用水彩畫下建築與風景，每堂 1.5 小時。",
    buttonText: "了解更多",
    href: "/course/watercolor",
  },
  {
    image: "/images/classroom/classroom1.jpg",
    label: "LAZY ART",
    title: "像咖啡廳一樣舒服的畫室",
    text: "讓孩子在沒有壓力的環境裡自在創作。",
    buttonText: "認識教室",
    href: "/classroom",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const previousSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[360px] w-full overflow-hidden bg-[#8B1E2D] md:h-[480px]">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.title}
            className="relative h-full w-full min-w-full flex-shrink-0"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

            <div className="relative mx-auto flex h-full max-w-6xl items-center px-6 md:px-16">
              <div className="max-w-xl text-white">
                <p className="text-xs font-semibold tracking-[0.25em] text-white/80 md:text-sm">
                  {slide.label}
                </p>

                <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
                  {slide.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/90 md:text-lg">
                  {slide.text}
                </p>

                <Link
                  href={slide.href}
                  className="mt-6 inline-flex rounded-full bg-white px-7 py-3 text-sm font-bold text-[#8B1E2D] transition hover:bg-[#F7E8EA] md:text-base"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={previousSlide}
        aria-label="上一張"
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-2xl text-slate-700 shadow transition hover:bg-white"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="下一張"
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-2xl text-slate-700 shadow transition hover:bg-white"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`第 ${index + 1} 張`}
            className={`h-2 rounded-full transition-all ${
              current === index ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
