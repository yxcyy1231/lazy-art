"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

type Course = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  href: string;
  slug: string;
  active: boolean;
};

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("active", true);

    if (error) {
      console.error("讀取期間限定課程失敗：", error);
      return;
    }

    setCourses(data ?? []);
  }

  const regularCategories = [
    {
      title: "兒童美術",
      href: "/course/children-art",
      ready: true,
    },
    {
      title: "漫畫",
      href: "/course/comics",
      ready: true,
    },
    {
      title: "升學",
      href: "/course/exam-prep",
      ready: true,
    },
    {
      title: "黏土",
      href: "/course/clay-class",
      ready: true,
    },
    {
      title: "素描",
      href: "/course/sketch",
      ready: true,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        {/* ========================================
            頁面標題（白色底）
        ======================================== */}
        <div className="bg-white pt-20 md:pt-24">
          <section className="mx-auto max-w-7xl px-6 pb-10 pt-20">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8B1E2D]">
                LAZY ART
              </p>

              <h1 className="mt-4 text-5xl font-black text-slate-900">
                課程介紹
              </h1>

              <p className="mt-6 text-lg text-slate-600">
                從日常創作到主題課程，找到適合自己的藝術時光。
              </p>
            </div>
          </section>
        </div>

        {/* ========================================
            常態課程入口（米色底）
        ======================================== */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-[0.3em] text-[#8B1E2D]">
              REGULAR CLASSES
            </p>

            <h2 className="mt-3 text-4xl font-black text-slate-900">
              常態課程
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              每週固定開課，依照不同年齡與興趣，
              選擇適合自己的藝術課程。
            </p>

            <p className="mt-3 text-sm text-slate-500">
              兒童美術・漫畫・素描・黏土・水彩・升學
            </p>

            <Link
              href="/regular"
              className="mt-8 inline-flex rounded-full bg-[#8B1E2D] px-8 py-4 font-semibold text-white transition hover:bg-[#6f1724]"
            >
              前往常態課程報名 →
            </Link>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-[#E8E0DA]" />
        </div>

        {/* ========================================
            常態課程分類
        ======================================== */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-[0.3em] text-[#8B1E2D]">
              COURSE CATEGORIES
            </p>

            <h2 className="mt-3 text-4xl font-black text-slate-900">
              常態課程介紹
            </h2>

            <p className="mt-4 text-slate-600">
              點選課程類別，查看課程資訊、費用與注意事項。
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regularCategories.map((category) =>
              category.ready ? (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group rounded-[26px] border border-[#EEE8E3] bg-white p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-[#8B1E2D]">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm font-bold text-[#8B1E2D]">
                    查看課程介紹 →
                  </p>
                </Link>
              ) : (
                <div
                  key={category.title}
                  className="rounded-[26px] border border-dashed border-[#DED6D0] bg-white/60 p-8 text-center"
                >
                  <h3 className="text-2xl font-black text-slate-400">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-400">
                    即將推出
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-[#E8E0DA]" />
        </div>

        {/* ========================================
            當期限定課程
        ======================================== */}
        {courses.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-24">
            <div className="text-center">
              <p className="text-sm font-semibold tracking-[0.3em] text-[#8B1E2D]">
                CURRENT WORKSHOPS
              </p>

              <h2 className="mt-3 text-4xl font-black text-slate-900">
                當期限定課程
              </h2>

              <p className="mt-4 text-slate-600">
                不定期推出的主題課程與限定工作坊。
              </p>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/course/${course.slug}`}
                  className="group overflow-hidden rounded-[32px] bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  {course.cover && (
                    <div className="overflow-hidden bg-gray-100">
                      <Image
                        src={course.cover}
                        alt={course.title}
                        width={900}
                        height={1200}
                        className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-8">
                    {course.subtitle && (
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8B1E2D]">
                        {course.subtitle}
                      </p>
                    )}

                    <h3 className="mt-3 text-3xl font-bold text-slate-900">
                      {course.title}
                    </h3>

                    {course.description && (
                      <p className="mt-4 line-clamp-3 leading-8 text-slate-600">
                        {course.description}
                      </p>
                    )}

                    <div className="mt-7 text-sm font-bold text-[#8B1E2D]">
                      查看課程 →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
