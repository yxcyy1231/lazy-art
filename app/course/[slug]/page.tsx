import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCalendarPicker from "@/components/course/CourseCalendarPicker";
import WatercolorCarousel from "@/components/WatercolorCarousel";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  /* =========================
      取得課程資料
  ========================= */

  const { data: course, error: courseError } =
    await supabase
      .from("courses")
      .select("*")
      .eq("slug", slug)
      .single();

  if (courseError || !course) {
    notFound();
  }

  /* =========================
      價格
  ========================= */

  const formattedPrice =
    course.price !== null &&
    course.price !== undefined
      ? Number(course.price).toLocaleString("zh-TW")
      : null;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        <section className="mx-auto max-w-7xl px-6 py-16">

          {/* 返回 */}

          <Link
            href="/course-intro"
            className="mb-10 inline-flex items-center gap-2 font-semibold text-[#8B1E2D] hover:underline"
          >
            ← 返回所有課程
          </Link>

          <div className="grid items-start gap-16 lg:grid-cols-2">

            {/* =========================
                左側課程內容
            ========================= */}

            <div>

              {/* 標籤 */}

              <div className="flex flex-wrap items-center gap-3">

                {course.badge && (
                  <span className="rounded-full bg-[#8B1E2D] px-4 py-2 text-sm font-bold text-white">
                    {course.badge}
                  </span>
                )}

                {course.subtitle && (
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8B1E2D]">
                    {course.subtitle}
                  </p>
                )}

              </div>

              {/* 課程名稱 */}

              <h1 className="mt-4 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                {course.title}
              </h1>

              {/* 課程介紹 */}

              {course.description && (
                <p className="mt-8 whitespace-pre-line text-lg leading-9 text-slate-600">
                  {course.description}
                </p>
              )}

              {/* =========================
                  課程資訊
              ========================= */}

              {course.slug === "watercolor" ? (

                <div className="mt-10 space-y-8">

                  {/* 水彩建築 */}

                  <div className="rounded-3xl bg-white p-8 shadow-lg">

                    <div className="mb-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8B1E2D]">
                        SATURDAY
                      </p>

                      <h2 className="mt-2 text-3xl font-black text-slate-900">
                        水彩建築
                      </h2>
                    </div>

                    <div className="space-y-4 text-slate-700">

                      <div className="flex items-start gap-3">
                        <span>🕒</span>
                        <span>
                          每週六 15:10–16:40
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <span>🎨</span>
                        <span>
                          每堂 1.5 小時
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <span>👧</span>
                        <span>
                          九歲以上
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <span>🧰</span>
                        <span>
                          16K Arches 水彩紙、顏料及教材
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* 風景水彩 */}

                  <div className="rounded-3xl bg-white p-8 shadow-lg">

                    <div className="mb-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8B1E2D]">
                        SUNDAY
                      </p>

                      <h2 className="mt-2 text-3xl font-black text-slate-900">
                        風景水彩
                      </h2>
                    </div>

                    <div className="space-y-4 text-slate-700">

                      <div className="flex items-start gap-3">
                        <span>🕒</span>
                        <span>
                          每週日 13:30–15:00
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <span>🎨</span>
                        <span>
                          每堂 1.5 小時
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <span>👧</span>
                        <span>
                          九歲以上
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <span>🧰</span>
                        <span>
                          16K Arches 水彩紙、顏料及教材
                        </span>
                      </div>

                    </div>
                  </div>

                </div>

              ) : (

                /* =========================
                    其他課程資訊
                ========================= */

                <div className="mt-10 rounded-3xl bg-white p-8 shadow-lg">

                  <h2 className="text-2xl font-bold text-slate-900">
                    課程資訊
                  </h2>

                  <div className="mt-6 space-y-4 text-slate-700">

                    {course.start_date && (
                      <div className="flex items-start gap-3">
                        <span aria-hidden="true">
                          📅
                        </span>

                        <span>
                          {course.start_date}
                        </span>
                      </div>
                    )}

                    {course.class_time && (
                      <div className="flex items-start gap-3">
                        <span aria-hidden="true">
                          🕒
                        </span>

                        <span>
                          {course.class_time}
                        </span>
                      </div>
                    )}

                    {course.duration && (
                      <div className="flex items-start gap-3">
                        <span aria-hidden="true">
                          🎨
                        </span>

                        <span>
                          {course.duration}
                        </span>
                      </div>
                    )}

                    {course.target_age && (
                      <div className="flex items-start gap-3">
                        <span aria-hidden="true">
                          👧
                        </span>

                        <span>
                          {course.target_age}
                        </span>
                      </div>
                    )}

                    {course.materials && (
                      <div className="flex items-start gap-3">
                        <span aria-hidden="true">
                          🧰
                        </span>

                        <span className="whitespace-pre-line">
                          {course.materials}
                        </span>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* =========================
                  課程費用
              ========================= */}

              {(formattedPrice ||
                course.price_note) && (
                <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">

                  <h2 className="text-2xl font-bold text-slate-900">
                    課程費用
                  </h2>

                  {formattedPrice && (
                    <p className="mt-6 text-4xl font-black text-[#8B1E2D]">
                      NT$ {formattedPrice}
                    </p>
                  )}

                  {course.price_note && (
                    <p className="mt-4 whitespace-pre-line leading-8 text-slate-600">
                      {course.price_note}
                    </p>
                  )}

                </div>
              )}

              {/* =========================
                  注意事項
              ========================= */}

              {course.notice && (
                <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">

                  <h2 className="text-2xl font-bold text-slate-900">
                    注意事項
                  </h2>

                  <p className="mt-6 whitespace-pre-line leading-8 text-slate-600">
                    {course.notice}
                  </p>

                </div>
              )}

              {/* =========================
                  操作按鈕
              ========================= */}

              <div className="mt-10 flex flex-wrap gap-4">

                <a
                  href="#schedule"
                  className="rounded-full bg-[#8B1E2D] px-8 py-4 font-semibold text-white transition hover:bg-[#6f1724]"
                >
                  立即報名
                </a>

                <Link
                  href="/"
                  className="rounded-full border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:bg-white"
                >
                  返回首頁
                </Link>

              </div>

            </div>

            {/* =========================
                右側圖片
            ========================= */}

            <div className="lg:sticky lg:top-28">

              {course.slug === "watercolor" ? (

                /* 水彩課：三張作品輪播 */

                <div className="overflow-hidden rounded-[32px] bg-white p-4 shadow-2xl">
                  <WatercolorCarousel />
                </div>

              ) : (

                /* 其他課程：原本封面 */

                <Image
                  src={course.cover}
                  alt={course.title}
                  width={900}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full rounded-[32px] object-cover shadow-2xl"
                />

              )}

            </div>

          </div>

          {/* =========================
              報名梯次
          ========================= */}

          <div
            id="schedule"
            className="mt-20"
          >
            <CourseCalendarPicker
              allowedWeekdays={
                course.slug === "clay" ? [0] : [0, 6]
              }
            />
          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}
