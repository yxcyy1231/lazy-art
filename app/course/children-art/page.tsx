import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ChildrenArtPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5] pt-20 md:pt-24">
        <section className="mx-auto max-w-3xl px-6 py-16">

          {/* 返回 */}
          <Link
            href="/course"
            className="mb-10 inline-flex items-center gap-2 font-semibold text-[#8B1E2D] hover:underline"
          >
            ← 返回所有課程
          </Link>

          {/* 標題 */}
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8B1E2D]">
              REGULAR CLASS
            </p>

            <h1 className="mt-4 text-5xl font-black text-slate-900">
              兒童美術
            </h1>
          </div>

          {/* 課程資訊 */}
          <div className="mt-12 rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900">
              課程資訊
            </h2>

            <div className="mt-6 space-y-5 text-slate-700">

              <div className="flex items-start gap-3">
                <span aria-hidden="true">🕒</span>

                <div className="space-y-1">
                  <p>週一 16:30－18:00</p>
                  <p>週三 16:30－18:00</p>
                  <p>週五 16:30－18:00</p>
                  <p>週六 10:30－12:00 | 13:30－15:00 | 15:10－16:40</p>
                  <p>週日 09:00－10:30 | 10:40－12:10 | 13:30－15:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span aria-hidden="true">🎨</span>
                <span>每堂 1.5 小時</span>
              </div>

              <div className="flex items-start gap-3">
                <span aria-hidden="true">👧</span>
                <span>三歲以上</span>
              </div>

              <div className="flex items-start gap-3">
                <span aria-hidden="true">🧰</span>
                <span>蠟筆、水彩顏料及教材</span>
              </div>

            </div>
          </div>

          {/* 課程費用 */}
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900">
              課程費用
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              課程方案
            </p>

            <div className="mt-6 space-y-4">

              <div className="rounded-2xl border border-[#E4DDD8] p-5">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900">單堂</p>
                  <p className="text-xl font-black text-[#8B1E2D]">NT$700</p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E4DDD8] p-5">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900">12 堂方案</p>
                  <p className="text-xl font-black text-[#8B1E2D]">NT$7,700</p>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  🎁 買 11 堂送 1 堂
                </p>
              </div>

              <div className="rounded-2xl border border-[#E4DDD8] p-5">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900">18 堂方案</p>
                  <p className="text-xl font-black text-[#8B1E2D]">NT$11,200</p>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  🎁 買 16 堂送 2 堂 + 畫袋 1 個
                </p>
              </div>

            </div>
          </div>

          {/* 注意事項 */}
          <div className="mt-8 rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900">
              注意事項
            </h2>

            <ul className="mt-6 space-y-2 leading-8 text-slate-600">
              <li>• 請提前 10 分鐘報到。</li>
              <li>• 活動開始後恕不接受退費。</li>
              <li>• 主辦單位保留修改活動內容之權利。</li>
            </ul>
          </div>

          {/* 操作按鈕 */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/regular"
              className="rounded-full bg-[#8B1E2D] px-8 py-4 font-semibold text-white transition hover:bg-[#6f1724]"
            >
              前往報名 →
            </Link>

            <Link
              href="/course"
              className="rounded-full border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:bg-white"
            >
              返回課程介紹
            </Link>
          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}
