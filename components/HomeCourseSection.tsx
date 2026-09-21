import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import ClayCarousel from "./ClayCarousel";
import WatercolorCarousel from "./WatercolorCarousel";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Course = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number | null;
  sort_order: number | null;
};

export default async function HomeCourseSection() {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      id,
      slug,
      title,
      subtitle,
      description,
      price,
      sort_order
    `)
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error(error);
  }

  const courses = (data ?? []) as Course[];

  return (
    <section className="bg-[#FAF8F5] py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* =========================
            常態課程
        ========================= */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-[#8B1E2D]">
            REGULAR CLASSES
          </p>

          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            常態課程
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-slate-600">
            每週固定開課，依照不同年齡與興趣，
            選擇適合自己的藝術課程。
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-slate-500">
            兒童美術・漫畫・素描・黏土・水彩・升學
          </p>

          <div className="mt-10">
            <Link
              href="/regular"
              className="inline-flex items-center rounded-full bg-[#8B1E2D] px-10 py-4 text-lg font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#741826] hover:shadow-lg"
            >
              查看常態課程 →
            </Link>
          </div>
        </div>

        {/* 分隔線 */}
        <div className="mx-auto my-24 max-w-3xl border-t border-[#E7E0D8]" />

        {/* =========================
            9 月常態課主題
        ========================= */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[32px] border border-[#E7E0D8] bg-white px-6 py-12 text-center shadow-sm md:px-12 md:py-16">

            <p className="font-semibold uppercase tracking-[0.3em] text-[#8B1E2D]">
              SEPTEMBER THEME
            </p>

            <p className="mt-5 text-sm font-bold tracking-[0.2em] text-slate-400">
              週六黏土常態班
            </p>

            <h2 className="mt-3 text-4xl font-black text-slate-900 md:text-5xl">
              🍰 秋季限定甜點黏土
            </h2>

            <ClayCarousel />

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-9 text-slate-600">
              把喜歡的蛋糕、餅乾與甜點變成可愛的黏土作品！
              <br className="hidden md:block" />
              從造型、配色到裝飾，完成自己的迷你甜點世界。
            </p>

            {/* 日期時間 */}
            <div className="mx-auto mt-9 max-w-xl rounded-[24px] bg-[#FAF8F5] px-6 py-6">
              <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-8">

                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-slate-400">
                    START DATE
                  </p>

                  <p className="mt-1 text-lg font-black text-slate-900">
                    9/12（六）開始
                  </p>
                </div>

                <div className="hidden h-10 w-px bg-[#E7E0D8] md:block" />

                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-slate-400">
                    CLASS TIME
                  </p>

                  <p className="mt-1 text-lg font-black text-slate-900">
                    13:30–15:00
                  </p>
                </div>

              </div>
            </div>

            <p className="mt-7 text-sm leading-7 text-slate-500">
              週六黏土常態班・可單堂報名・亦可使用常態課方案
            </p>

            <div className="mt-9">
              <Link
                href="/regular?day=週六&course=黏土&time=13:30#classes"
                className="inline-flex items-center rounded-full bg-[#8B1E2D] px-10 py-4 text-lg font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#741826] hover:shadow-lg"
              >
                查看課程・立即報名 →
              </Link>
            </div>

          </div>
        </div>

        {/* 分隔線 */}
        <div className="mx-auto my-24 max-w-3xl border-t border-[#E7E0D8]" />

        {/* =========================
            當期限定課程
        ========================= */}
        {courses.length > 0 && (
          <>
            <div className="text-center">
              <p className="font-semibold uppercase tracking-[0.3em] text-[#8B1E2D]">
                CURRENT WORKSHOPS
              </p>

              <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
                當期限定課程
              </h2>
            </div>

            <div className="mt-16 space-y-20">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="mx-auto max-w-3xl border-b border-[#E7E0D8] pb-20 last:border-0"
                >
                  <div className="text-center">

                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8B1E2D]">
                      {course.subtitle}
                    </p>

                    <h3 className="mt-5 text-4xl font-black text-slate-900 md:text-5xl">
                      {course.title}
                    </h3>

                    {/* =========================
                        暑末水彩漫漫照片輪播
                    ========================= */}
                    {course.title === "暑末水彩漫漫" && (
                      <WatercolorCarousel />
                    )}

                    <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-slate-600">
                      {course.description}
                    </p>

                    {course.price && (
                      <div className="mt-10">
                        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
                          PRICE
                        </p>

                        <p className="mt-2 text-4xl font-black text-[#8B1E2D]">
                          NT$ {course.price.toLocaleString()}
                        </p>
                      </div>
                    )}

                    <div className="mt-12">
                      <Link
                        href={`/course/${course.slug}`}
                        className="inline-flex items-center rounded-full bg-[#8B1E2D] px-10 py-4 text-lg font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#741826] hover:shadow-lg"
                      >
                        了解更多 →
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
