"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignupForm from "@/components/SignupForm";
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

type RegularClass = {
  id: string;
  title: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  price: number;
  category: string;
  active: boolean;
  sort_order: number;
  registration_type: string;
};

const dayOrder: Record<string, number> = {
  週一: 1,
  週二: 2,
  週三: 3,
  週四: 4,
  週五: 5,
  週六: 6,
  週日: 7,
};

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [regularClasses, setRegularClasses] = useState<RegularClass[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<RegularClass | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<
  "single" | "12" | "14" | ""
>("");
const [parentName, setParentName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [lineId, setLineId] = useState("");
const [childName, setChildName] = useState("");
const [note, setNote] = useState("");
const [extraPerson, setExtraPerson] = useState(false);
const [polaroid, setPolaroid] = useState(false);

  useEffect(() => {
    loadCourses();
    loadRegularClasses();
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

  async function loadRegularClasses() {
    const { data, error } = await supabase
      .from("regular_classes")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("讀取常態課程失敗：", error);
      return;
    }

    setRegularClasses(data ?? []);
  }

  const groupedClasses = regularClasses.reduce<
    Record<string, RegularClass[]>
  >((groups, item) => {
    if (!groups[item.day_of_week]) {
      groups[item.day_of_week] = [];
    }

    groups[item.day_of_week].push(item);
    return groups;
  }, {});

  const availableDays = Object.keys(groupedClasses).sort(
    (a, b) => (dayOrder[a] ?? 99) - (dayOrder[b] ?? 99)
  );

  const selectedClasses = selectedDay
    ? groupedClasses[selectedDay] ?? []
    : [];

  function scrollToRegular() {
    document
      .getElementById("regular-classes")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5]">
        {/* ========================================
            頁面標題
        ======================================== */}
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
                {/* 分隔線：課程介紹 / 常態課程 */}
        <div className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-[#E8E0DA]" />
        </div>

        {/* ========================================
            常態課程入口
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

            <button
              type="button"
              onClick={scrollToRegular}
              className="mt-8 rounded-full bg-[#8B1E2D] px-8 py-4 font-semibold text-white transition hover:bg-[#6f1724]"
            >
              查看常態課程 ↓
            </button>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-6">
          {selectedClass && (
  <section
    id="regular-signup"
    className="mx-auto max-w-4xl scroll-mt-28 px-6 pb-24"
  >
    <div className="rounded-[32px] bg-white p-8 shadow-lg md:p-10">
      <p className="text-sm font-semibold tracking-[0.25em] text-[#8B1E2D]">
        REGISTRATION
      </p>

      <h2 className="mt-3 text-3xl font-black text-slate-900">
        常態課程報名
      </h2>

      {/* 已選課程 */}
      <div className="mt-8 rounded-[24px] bg-[#FAF8F5] p-6">
        <p className="text-sm font-semibold text-[#8B1E2D]">
          已選擇課程
        </p>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-2xl font-black text-slate-900">
              {selectedClass.title}
            </h3>

            <p className="mt-2 text-slate-500">
              {selectedClass.day_of_week}・
              {selectedClass.start_time}–{selectedClass.end_time}
            </p>
          </div>

          <p className="font-bold text-slate-700">
            NT${Number(selectedClass.price).toLocaleString("zh-TW")}／堂
          </p>
        </div>
      </div>

      {/* 方案 */}
      <div className="mt-10">
        <p className="text-lg font-bold text-slate-900">
          選擇報名方案
        </p>

   <div className="mt-5 grid gap-4 md:grid-cols-3">
  <button
    type="button"
    onClick={() => setSelectedPlan("single")}
    className={`rounded-[22px] border p-5 text-left transition ${
      selectedPlan === "single"
        ? "border-[#8B1E2D] bg-[#FFF9F9]"
        : "border-[#E4DDD8] hover:border-[#8B1E2D]"
    }`}
  >
    <p className="font-bold text-slate-900">
      單堂報名
    </p>

    <p className="mt-2 text-sm text-slate-500">
      NT${Number(selectedClass.price).toLocaleString("zh-TW")}
    </p>
  </button>

  <button
    type="button"
    onClick={() => setSelectedPlan("12")}
    className={`rounded-[22px] border p-5 text-left transition ${
      selectedPlan === "12"
        ? "border-[#8B1E2D] bg-[#FFF9F9]"
        : "border-[#E4DDD8] hover:border-[#8B1E2D]"
    }`}
  >
    <p className="font-bold text-slate-900">
      買 11 堂送 1 堂
    </p>

    <p className="mt-2 text-sm text-slate-500">
      共 12 堂課
    </p>
  </button>

  <button
    type="button"
    onClick={() => setSelectedPlan("14")}
    className={`rounded-[22px] border p-5 text-left transition ${
      selectedPlan === "14"
        ? "border-[#8B1E2D] bg-[#FFF9F9]"
        : "border-[#E4DDD8] hover:border-[#8B1E2D]"
    }`}
  >
    <p className="font-bold text-slate-900">
      買 12 堂送 2 堂
    </p>

    <p className="mt-2 text-sm text-slate-500">
      共 14 堂＋畫袋
    </p>
  </button>
</div>
</div>
{selectedPlan && (
  <SignupForm
      courseInfo={null}
      courseTitle={selectedClass.title}
      parentName={parentName}
      setParentName={setParentName}
      email={email}
      setEmail={setEmail}
      phone={phone}
      setPhone={setPhone}
      lineId={lineId}
      setLineId={setLineId}
      childName={childName}
      setChildName={setChildName}
      note={note}
      setNote={setNote}
      extraPerson={extraPerson}
      setExtraPerson={setExtraPerson}
      polaroid={polaroid}
      setPolaroid={setPolaroid}
    />
)}
    </div>
  </section>
)}
          <div className="h-px bg-[#E8E0DA]" />
        </div>

        {/* ========================================
            常態課程選擇
        ======================================== */}
        <section
          id="regular-classes"
          className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20"
        >
          <div className="text-center">
            <p className="text-sm font-semibold tracking-[0.3em] text-[#8B1E2D]">
              CLASS SCHEDULE
            </p>

            <h2 className="mt-3 text-4xl font-black text-slate-900">
              選擇上課時間
            </h2>

            <p className="mt-4 text-slate-600">
              先選擇方便的星期，再查看當天開設的課程。
            </p>
          </div>

          {/* 星期按鈕 */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {availableDays.map((day) => {
              const active = selectedDay === day;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`rounded-full px-6 py-3 font-semibold transition ${
                    active
                      ? "bg-[#8B1E2D] text-white shadow-lg"
                      : "border border-[#DED6D0] bg-white text-slate-700 hover:border-[#8B1E2D] hover:text-[#8B1E2D]"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* 尚未選星期 */}
          {!selectedDay && (
            <div className="mt-12 rounded-[28px] border border-dashed border-[#D8CEC7] px-6 py-14 text-center">
              <p className="text-lg font-semibold text-slate-700">
                請先選擇星期
              </p>

              <p className="mt-2 text-sm text-slate-400">
                選擇後會顯示當天的課程與上課時間。
              </p>
            </div>
          )}

          {/* 選擇後才顯示課程 */}
          {selectedDay && (
            <div className="mt-14">
              <div className="flex items-center gap-5">
                <h3 className="shrink-0 text-2xl font-black text-slate-900">
                  {selectedDay}
                </h3>

                <div className="h-px flex-1 bg-[#E5DDD7]" />

                <p className="shrink-0 text-sm text-slate-400">
                  {selectedClasses.length} 堂課程
                </p>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {selectedClasses.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[26px] border border-[#EEE8E3] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="text-sm font-semibold text-[#8B1E2D]">
                          {item.category}
                        </p>

                        <h4 className="mt-1 text-2xl font-black text-slate-900">
                          {item.title}
                        </h4>
                      </div>

                      {item.registration_type === "watercolor" && (
                        <span className="shrink-0 rounded-full bg-[#F5E9EA] px-3 py-1 text-xs font-bold text-[#8B1E2D]">
                          水彩專班
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                      <span>
                        {item.start_time}–{item.end_time}
                      </span>

                      {item.price && (
                        <span className="font-semibold text-slate-700">
                          NT${" "}
                          {Number(item.price).toLocaleString("zh-TW")}
                          ／堂
                        </span>
                      )}
                    </div>
<button
  type="button"
  onClick={() => {
    setSelectedClass(item);

    setTimeout(() => {
      document
        .getElementById("regular-signup")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  }}
  className="mt-6 text-sm font-bold text-[#8B1E2D] transition hover:opacity-60"
>
  選擇此課程 →
</button>
                  </div>
                ))}
              </div>

              {/* 優惠縮小放下面 */}
              <div className="mt-10 rounded-[26px] bg-[#8B1E2D] px-7 py-6 text-white">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-white/60">
                      REGULAR CLASS SPECIAL
                    </p>

                    <h4 className="mt-1 text-xl font-bold">
                      常態課程優惠
                    </h4>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-white/85 sm:flex-row sm:gap-6">
                    <span>
                      <strong className="text-white">
                        買 11 堂送 1 堂
                      </strong>
                      {" "}・共 12 堂
                    </span>

                    <span>
                      <strong className="text-white">
                        買 12 堂送 2 堂
                      </strong>
                      {" "}・共 14 堂＋畫袋
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
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
