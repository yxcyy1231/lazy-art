"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import CourseSummary from "./CourseSummary";
import SignupForm from "./SignupForm";
import PriceCard from "./PriceCard";
import ContactInfo from "./ContactInfo";

type SignupProps = {
  selectedSchedule: string;
};

type Course = {
  id: string;
  title: string;
  subtitle: string | null;

  price: number | null;
  early_bird_price: number | null;
  early_bird_remaining: number | null;

  duration: string | null;
  materials: string | null;
  target_age: string | null;
  notice: string | null;
  cover_title: string | null;
};
type CoursePlan = {
  id: string;
  course_id: string;
  title: string;
  price: number;
  gift: number;
  sort: number;
  class_count: number;
};
type Schedule = {
  id: string;
  title: string;
  class_date: string;
  start_time: string;
  end_time: string;
  remaining: number;
  course_id: string;
  courses: Course;
};
type WatercolorSchedule = {
  id: string;
  title: string;
  class_date: string;
  start_time: string;
  end_time: string;
  remaining: number;
};
export default function Signup({
  selectedSchedule,
}: SignupProps) {
const [parentName, setParentName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
  const [lineId, setLineId] = useState("");
  const [childName, setChildName] = useState("");
  const [note, setNote] = useState("");

  const [extraPerson, setExtraPerson] = useState(false);
  const [polaroid, setPolaroid] = useState(false);

  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(false);

  const [courseId, setCourseId] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [scheduleTitle, setScheduleTitle] = useState("");
  const [coursePlans, setCoursePlans] = useState<CoursePlan[]>([]);
const [selectedPlan, setSelectedPlan] = useState<CoursePlan | null>(null);
const [watercolorSchedules, setWatercolorSchedules] =
  useState<WatercolorSchedule[]>([]);

const [selectedScheduleIds, setSelectedScheduleIds] =
  useState<string[]>([]);
  const [scheduleTime, setScheduleTime] = useState("");
  const [remaining, setRemaining] = useState(0);

  const [courseInfo, setCourseInfo] =
    useState<Course | null>(null);

  useEffect(() => {
    if (selectedSchedule) {
      loadSchedule();
    }
  }, [selectedSchedule]);

  useEffect(() => {
    setTotalPrice(
      price +
        (extraPerson ? 500 : 0) +
        (polaroid ? 150 : 0)
    );
  }, [price, extraPerson, polaroid]);

  async function loadSchedule() {
    const { data, error } = await supabase
      .from("course_schedules")
      .select(`
        *,
       courses (
  id,
  title,
  subtitle,
  price,
  early_bird_price,
  early_bird_remaining,
  duration,
  materials,
  target_age,
  notice,
  cover_title
)
      `)
      .eq("id", selectedSchedule)
      .single();
if (error || !data) {
  console.log("selectedSchedule =", selectedSchedule);
  console.log("error =", error);
  console.log("data =", data);
  return;
}
    const schedule = data as Schedule;

    setCourseInfo(schedule.courses);
    setCourseId(schedule.course_id);

    setCourseTitle(schedule.courses.title);
    // 如果是水彩課，把同一門課的所有可報名日期一起抓進來
if (schedule.courses.cover_title === "watercolor") {
  const { data: watercolorData, error: watercolorError } =
    await supabase
      .from("course_schedules")
      .select(`
        id,
        title,
        class_date,
        start_time,
        end_time,
        remaining
      `)
      .eq("course_id", schedule.course_id)
      .eq("active", true)
      .order("class_date", { ascending: true });

  if (watercolorError) {
    console.error("讀取水彩梯次失敗：", watercolorError);
  } else {
    setWatercolorSchedules(watercolorData ?? []);
    setSelectedScheduleIds([]);
  }
}
const { data: plans, error: plansError } = await supabase
  .from("course_plans")
  .select("*")
  .eq("course_id", schedule.course_id)
  .order("sort", { ascending: true });
console.log("目前 schedule.course_id =", schedule.course_id);
console.log("抓到的 plans =", plans);
console.log("plansError =", plansError);
if (plansError) {
  console.error("讀取方案失敗：", plansError);
} else {
  setCoursePlans(plans ?? []);

  if (plans && plans.length > 0) {
    setSelectedPlan(plans[0]);
    setPrice(plans[0].price);
  }
}
    const date = new Date(schedule.class_date);
    const week = ["日","一","二","三","四","五","六"];

    setScheduleTitle(
      `${date.getMonth() + 1}/${date.getDate()}（${week[date.getDay()]}）`
    );

    setScheduleTime(
      `${schedule.start_time.slice(0,5)}－${schedule.end_time.slice(0,5)}`
    );

if (!plans || plans.length === 0) {
  const earlyBirdRemaining =
    schedule.courses.early_bird_remaining ?? 0;

  const basePrice =
    earlyBirdRemaining > 0 &&
    schedule.courses.early_bird_price != null
      ? schedule.courses.early_bird_price
      : schedule.courses.price;

  setPrice(basePrice ?? 0);
}
    setRemaining(schedule.remaining);
  }
    async function handleSubmit() {
    if (!selectedSchedule) {
      alert("請先選擇課程梯次");
      return;
    }
if (!parentName || !email || !phone || !lineId || !childName) {
  alert("請填寫完整資料");
  return;
}

    setLoading(true);

    const { data: latestSchedule, error: latestError } =
      await supabase
        .from("course_schedules")
        .select("*")
        .eq("id", selectedSchedule)
        .single();

    if (latestError || !latestSchedule) {
      setLoading(false);
      alert("找不到課程梯次");
      return;
    }

    if (latestSchedule.remaining <= 0) {
      setLoading(false);
      alert("❌ 此梯次已額滿");
      return;
    }

    const { error: insertError } = await supabase
      .from("registrations")
      .insert([
        {
          course_id: courseId,
          schedule_id: selectedSchedule,

          schedule: scheduleTitle,

          parent_name: parentName,
email,
phone,
          line_id: lineId,
          child_name: childName,
          note,

          extra_person: extraPerson,
          polaroid,

          price,
          total_price: totalPrice,

          payment_status: "待付款",
          paid: false,
        },
      ]);

    if (insertError) {
      console.error(insertError);
      setLoading(false);
      alert(insertError.message);
      return;
    }
try {
  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      parentName,
      courseName: courseTitle,
      phone,
      lineId,
      childName,
      note,
      scheduleTitle,
      scheduleTime,
      price,
      totalPrice,
    }),
  });

  const result = await res.json();

  console.log("寄信結果：", result);
} catch (err) {
  console.error("寄信失敗：", err);
}
const { data: updateData, error: updateError } = await supabase
  .from("course_schedules")
  .update({
    remaining: latestSchedule.remaining - 1,
  })
  .eq("id", selectedSchedule)
  .select();

console.log("updateData =", updateData);
console.log("updateError =", updateError);
    setRemaining((prev) => Math.max(prev - 1, 0));

    setLoading(false);

const successMessage =
  courseInfo?.cover_title === "father"
    ? `🎉 報名成功！

課程：
${courseTitle}

梯次：
${scheduleTitle}

時間：
${scheduleTime}

課程費：
NT$${price}

同行加購：
${extraPerson ? "有 (+500)" : "沒有"}

拍立得：
${polaroid ? "有 (+150)" : "沒有"}

總金額：
NT$${totalPrice}

請加入官方 LINE 完成付款。`
    : `🎉 報名成功！

課程：
${courseTitle}

梯次：
${scheduleTitle}

時間：
${scheduleTime}

課程費：
NT$${price}

總金額：
NT$${totalPrice}

請加入官方 LINE 完成付款。`;

alert(successMessage);
    setParentName("");
    setPhone("");
    setLineId("");
    setChildName("");
    setNote("");
    setEmail("");
    setExtraPerson(false);
    setPolaroid(false);
  }
    return (
    <section
      id="signup"
      className="bg-[#FAF7F2] py-28"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.25em] text-[#8B1E2D]">
            SIGN UP
          </p>

          <h2 className="mt-5 text-5xl font-black text-[#8B1E2D]">
            立即報名
          </h2>

       <p className="mt-4 text-base md:text-xl leading-relaxed text-slate-600">
            填寫以下資料，我們會盡快與您聯繫。
          </p>
        </div>

        <div className="mt-12 space-y-8 rounded-[36px] bg-white p-10 shadow-xl">
          <CourseSummary
            courseTitle={courseTitle}
            scheduleTitle={scheduleTitle}
            scheduleTime={scheduleTime}
            remaining={remaining}
          />

{coursePlans.length > 0 && (
    <div className="rounded-[28px] border border-[#EFE5DE] bg-[#FAF7F2] p-8">
      <h3 className="mb-6 text-2xl font-black text-[#8B1E2D]">
        選擇報名方案
      </h3>

      <div className="space-y-4">
        {coursePlans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => {
              setSelectedPlan(plan);
              setPrice(plan.price);
            }}
            className={`w-full rounded-2xl border p-5 text-left transition ${
              selectedPlan?.id === plan.id
                ? "border-[#8B1E2D] bg-white ring-2 ring-[#8B1E2D]/10"
                : "border-[#E5DDD7] bg-white hover:border-[#8B1E2D]"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-lg font-bold text-slate-800">
                  {plan.title}
                </p>

                {plan.gift > 0 && (
                  <p className="mt-1 text-sm text-[#8B1E2D]">
                    贈 16K 畫框 {plan.gift} 個
                  </p>
                )}
              </div>

              <p className="text-xl font-black text-[#8B1E2D]">
                NT${plan.price.toLocaleString()}
              </p>
            </div>
          </button>
        ))}
      </div>

    <p className="mt-5 text-sm leading-relaxed text-slate-500">
  單堂方案可任選 1 堂；兩堂方案可任選 2 堂；四堂方案可任選 4 堂。
  畫框顏色可於報名後選擇。
</p>
    </div>
  )}
  {courseInfo?.cover_title === "watercolor" &&
  selectedPlan &&
  watercolorSchedules.length > 0 && (
    <div className="rounded-[28px] border border-[#EFE5DE] bg-[#FAF7F2] p-8">
      <h3 className="text-2xl font-black text-[#8B1E2D]">
        選擇上課日期
      </h3>

      <p className="mt-2 text-slate-500">
        此方案請選擇 {selectedPlan.class_count} 堂課
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {watercolorSchedules.map((schedule) => {
          const selected = selectedScheduleIds.includes(schedule.id);
          const isFull = schedule.remaining <= 0;

          const maxSelected =
            selectedScheduleIds.length >= selectedPlan.class_count;

          const disabled =
            isFull || (!selected && maxSelected);

          const date = new Date(
            `${schedule.class_date}T00:00:00`
          );

          const week = [
            "日",
            "一",
            "二",
            "三",
            "四",
            "五",
            "六",
          ];

          return (
            <button
              key={schedule.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                setSelectedScheduleIds((prev) => {
                  if (prev.includes(schedule.id)) {
                    return prev.filter(
                      (id) => id !== schedule.id
                    );
                  }

                  if (
                    prev.length >= selectedPlan.class_count
                  ) {
                    return prev;
                  }

                  return [...prev, schedule.id];
                });
              }}
              className={`rounded-2xl border p-5 text-left transition ${
                selected
                  ? "border-[#8B1E2D] bg-white ring-2 ring-[#8B1E2D]/20"
                  : disabled
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 opacity-50"
                  : "border-[#E6D8D0] bg-white hover:border-[#8B1E2D]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-slate-800">
                    {date.getMonth() + 1}/{date.getDate()}
                    （{week[date.getDay()]}）
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {schedule.start_time.slice(0, 5)}
                    －
                    {schedule.end_time.slice(0, 5)}
                  </p>
                </div>

                <div className="text-right">
                  {isFull ? (
                    <span className="font-semibold text-red-500">
                      已額滿
                    </span>
                  ) : selected ? (
                    <span className="font-bold text-[#8B1E2D]">
                      ✓ 已選
                    </span>
                  ) : (
                    <span className="text-sm text-green-600">
                      剩 {schedule.remaining} 位
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-5 font-semibold text-[#8B1E2D]">
        已選 {selectedScheduleIds.length} /{" "}
        {selectedPlan.class_count} 堂
      </p>
    </div>
  )}
          <SignupForm
            courseInfo={courseInfo}
            courseTitle={courseTitle}
            parentName={parentName}
            setParentName={setParentName}
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
            email={email}
            setEmail={setEmail}
          />

          <PriceCard
            courseInfo={courseInfo}
            price={price}
            totalPrice={totalPrice}
            extraPerson={extraPerson}
            polaroid={polaroid}
            remaining={remaining}
            loading={loading}
            handleSubmit={handleSubmit}
          />

          {remaining <= 2 && remaining > 0 && (
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
              <p className="font-semibold text-orange-600">
                ⚠️ 剩餘名額僅剩 {remaining} 位，額滿即截止報名。
              </p>
            </div>
          )}

          {remaining === 0 && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <p className="font-semibold text-red-600">
                ❌ 此梯次已額滿，目前暫停報名。
              </p>
            </div>
          )}

          <ContactInfo />
        </div>
      </div>
    </section>
  );
}
