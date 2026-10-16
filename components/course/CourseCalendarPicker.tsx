"use client";

import { useState } from "react";

const WEEKDAY_LABELS = ["日", "一", "二", "三", "四", "五", "六"];

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

type Props = {
  /** 哪幾天可以點選，0 = 週日 ... 6 = 週六。預設週六、週日都開放。 */
  allowedWeekdays?: number[];
};

export default function CourseCalendarPicker({
  allowedWeekdays = [0, 6],
}: Props) {
  const today = startOfDay(new Date());

  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
          const isSelectable = isAllowedDay && !isPast;
          const isSelected =
            selectedDate !== null && isSameDate(date, selectedDate);

          if (!isSelectable) {
            return (
              <div
                key={date.toISOString()}
                aria-disabled="true"
                className="flex aspect-square items-center justify-center rounded-xl bg-slate-100 text-sm font-medium text-slate-300"
              >
                {date.getDate()}
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
      {selectedDate && (
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

          <a
            href="#"
            className="inline-flex items-center rounded-full bg-[#8B1E2D] px-8 py-3 font-semibold text-white transition hover:bg-[#6f1724]"
          >
            立即報名 →
          </a>
        </div>
      )}
    </div>
  );
}
