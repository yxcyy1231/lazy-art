"use client";

import { useState } from "react";
import Link from "next/link";

const WEEKDAY_LABELS = ["日", "一", "二", "三", "四", "五", "六"];

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDateParam(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isSameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

type Schedule = {
  id: string;
  class_date: string;
  start_time: string;
  end_time: string;
  remaining: number;
  capacity: number;
};

type Props = {
  /** 哪幾天可以點選，0 = 週日 ... 6 = 週六。預設週六、週日都開放。 */
  allowedWeekdays?: number[];
  /** 這堂課實際開放報名的梯次（來自 course_schedules）。 */
  schedules: Schedule[];
};

export default function CourseCalendarPicker({
  allowedWeekdays = [0, 6],
  schedules,
}: Props) {
  const today = startOfDay(new Date());

  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 用日期字串(YYYY-MM-DD)對應到梯次資料，方便查表
  const scheduleByDate = new Map<string, Schedule>();
  for (const schedule of schedules) {
    // class_date 可能是 "2026-10-18" 或帶時間的字串，取前 10 碼即可
    scheduleByDate.set(schedule.class_date.slice(0, 10), schedule);
  }

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = firstDayOfMonth.getDay(); // 0 = 日

  const cells: (Date | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1)
    ),
  ];

  const goToPrevMonth = () => {
    setVisibleMonth(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setVisibleMonth(new Date(year, month + 1, 1));
  };

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-900">
        可報名日期
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        僅開放{allowedWeekdays
          .slice()
          .sort()
          .map((d) => `週${WEEKDAY_LABELS[d]}`)
          .join("、")}
        ，請點選日期後報名
      </p>

      {/* 月份切換 */}
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPrevMonth}
          aria-label="上個月"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF8F5] text-lg font-semibold text-[#8B1E2D] transition hover:bg-[#F0E8E2]"
        >
          ‹
        </button>

        <p className="text-lg font-black text-slate-900">
          {year}年 {month + 1}月
        </p>

        <button
          type="button"
          onClick={goToNextMonth}
          aria-label="下個月"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF8F5] text-lg font-semibold text-[#8B1E2D] transition hover:bg-[#F0E8E2]"
        >
          ›
        </button>
      </div>

      {/* 星期標題 */}
      <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>

      {/* 日期格 */}
      <div className="mt-2 grid grid-cols-7 gap-2">
        {cells.map((date, index) => {
          if (!date) {
            return <div key={`blank-${index}`} />;
          }

          const dayOfWeek = date.getDay();
          const isAllowedDay = allowedWeekdays.includes(dayOfWeek);
          const isPast = date < today;

          const matchedSchedule = scheduleByDate.get(
            formatDateParam(date)
          );
          const isFull =
            !!matchedSchedule && matchedSchedule.remaining <= 0;

          // 要可以點：這天本來就開放、沒過期、而且資料庫裡真的有這梯次、還沒額滿
          const isSelectable =
            isAllowedDay &&
            !isPast &&
            !!matchedSchedule &&
            !isFull;

          const isSelected =
            selectedDate !== null && isSameDate(date, selectedDate);

          if (!isSelectable) {
            return (
              <div
                key={date.toISOString()}
                aria-disabled="true"
                className="relative flex aspect-square flex-col items-center justify-center rounded-xl bg-slate-100 text-sm font-medium text-slate-300"
              >
                {date.getDate()}
                {isFull && (
                  <span className="mt-0.5 text-[10px] font-semibold text-red-300">
                    已額滿
                  </span>
                )}
              </div>
            );
          }

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => handleSelect(date)}
              aria-pressed={isSelected}
              className={`flex aspect-square items-center justify-center rounded-xl text-sm font-bold transition ${
                isSelected
                  ? "bg-[#8B1E2D] text-white shadow-md"
                  : "bg-[#FAF8F5] text-[#8B1E2D] hover:bg-[#F0E8E2]"
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* 選取後顯示 */}
      {selectedDate && (() => {
        const matchedSchedule = scheduleByDate.get(
          formatDateParam(selectedDate)
        );

        if (!matchedSchedule) {
          return null;
        }

        return (
          <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl bg-[#FAF8F5] p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-slate-700">
              已選擇：
              <span className="font-bold text-slate-900">
                {selectedDate.getFullYear()}年
                {selectedDate.getMonth() + 1}月
                {selectedDate.getDate()}日（
                {WEEKDAY_LABELS[selectedDate.getDay()]}）
              </span>
            </p>

            <Link
              href={`/schedule?schedule=${matchedSchedule.id}`}
              className="inline-flex items-center rounded-full bg-[#8B1E2D] px-8 py-3 font-semibold text-white transition hover:bg-[#6f1724]"
            >
              立即報名 →
            </Link>
          </div>
        );
      })()}
    </div>
  );
}
