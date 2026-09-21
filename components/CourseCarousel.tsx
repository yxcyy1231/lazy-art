"use client";

import { useEffect, useState } from "react";

type Props = {
  images: string[];
  alt: string;
};

export default function CourseCarousel({ images, alt }: Props) {
  const [current, setCurrent] = useState(0);
  const multiple = images.length > 1;

  useEffect(() => {
    if (!multiple) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [multiple, images.length]);

  const previousImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="mx-auto mt-7 w-[82%] max-w-[340px] sm:w-[88%] sm:max-w-[400px] md:w-full md:max-w-[440px]">

      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[22px] bg-[#FAF8F5]">

        <div
          className="flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {images.map((src, index) => (
            <div
              key={src}
              className="flex h-full w-full min-w-full flex-shrink-0 items-center justify-center"
            >
              <img
                src={src}
                alt={`${alt} ${index + 1}`}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>

        {multiple && (
          <>
            <button
              type="button"
              onClick={previousImage}
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow"
              aria-label="上一張"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={nextImage}
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow"
              aria-label="下一張"
            >
              ›
            </button>
          </>
        )}

      </div>

      {multiple && (
        <div className="mt-3 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all ${
                current === index
                  ? "w-6 bg-[#9F1D2D]"
                  : "w-2 bg-[#D8CCC5]"
              }`}
              aria-label={`第 ${index + 1} 張`}
            />
          ))}
        </div>
      )}

    </div>
  );
}
