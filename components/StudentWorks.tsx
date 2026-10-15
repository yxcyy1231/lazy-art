
import Image from "next/image";

export default function StudentWorks() {
  return (
    <section
      id="student-works"
      className="py-20 bg-[#faf7f2]"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* 學生作品 */}
        <h2 className="text-4xl md:text-5xl font-black text-center">
          學生作品
        </h2>

        <p className="text-center text-slate-500 mt-5 text-lg md:text-xl">
          探索創作的無限可能。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-10">
          <Image
            src="/images/student-works/1.jpg"
            alt="學生作品一"
            width={700}
            height={500}
            className="w-full h-64 md:h-80 rounded-3xl object-cover"
          />

          <Image
            src="/images/student-works/2.jpg"
            alt="學生作品二"
            width={700}
            height={500}
            className="w-full h-64 md:h-80 rounded-3xl object-cover"
          />

          <Image
            src="/images/student-works/3.jpg"
            alt="學生作品三"
            width={700}
            height={500}
            className="w-full h-64 md:h-80 rounded-3xl object-cover"
          />

          <Image
            src="/images/student-works/4.jpg"
            alt="學生作品四"
            width={700}
            height={500}
            className="w-full h-64 md:h-80 rounded-3xl object-cover"
          />

          <Image
            src="/images/student-works/5.jpg"
            alt="學生作品五"
            width={700}
            height={500}
            className="w-full h-64 md:h-80 rounded-3xl object-cover"
          />

          <Image
            src="/images/student-works/6.jpg"
            alt="學生作品六"
            width={700}
            height={500}
            className="w-full h-64 md:h-80 rounded-3xl object-cover"
          />
        </div>

        {/* 分隔線 */}
        <div className="mx-auto my-16 md:my-20 max-w-3xl border-t border-[#E7E0D8]" />

        {/* 夏令營作品 */}
        <p className="text-center text-slate-500 text-lg md:text-xl">
          暑期夏令營｜走出教室，開啟五感創作。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-10">
          <Image
            src="/images/student-works/7.jpg"
            alt="暑期夏令營作品一"
            width={700}
            height={500}
            className="w-full h-64 md:h-80 rounded-3xl object-cover"
          />

          <Image
            src="/images/student-works/8.jpg"
            alt="暑期夏令營作品二"
            width={700}
            height={500}
            className="w-full h-64 md:h-80 rounded-3xl object-cover"
          />

          <Image
            src="/images/student-works/9.jpg"
            alt="暑期夏令營作品三"
            width={700}
            height={500}
            className="w-full h-64 md:h-80 rounded-3xl object-cover"
          />
        </div>

        {/* 分隔線 */}
        <div className="mx-auto my-16 md:my-20 max-w-3xl border-t border-[#E7E0D8]" />

        {/* 素描作品 */}
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-center">
            素描作品
          </h2>

          <p className="text-center text-slate-500 mt-5 text-lg md:text-xl">
            觀察光影與線條，描繪眼中的世界。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-10">
            <Image
              src="/images/courses/sketch 01.jpg"
              alt="素描作品一"
              width={700}
              height={500}
              className="w-full h-64 md:h-80 rounded-3xl object-cover"
            />

            <Image
              src="/images/courses/sketch 02.jpg"
              alt="素描作品二"
              width={700}
              height={500}
              className="w-full h-64 md:h-80 rounded-3xl object-cover"
            />

            <Image
              src="/images/courses/sketch 03.jpg"
              alt="素描作品三"
              width={700}
              height={500}
              className="w-full h-64 md:h-80 rounded-3xl object-cover"
            />
          </div>
        </div>

        {/* 分隔線 */}
        <div className="mx-auto my-16 md:my-20 max-w-3xl border-t border-[#E7E0D8]" />

        {/* 漫畫作品 */}
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-center">
            漫畫作品
          </h2>

          <p className="text-center text-slate-500 mt-5 text-lg md:text-xl">
            以畫筆描繪故事，讓想像力化為生動的畫面。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-10">
            <Image
              src="/images/courses/comic 01.jpg"
              alt="漫畫作品一"
              width={700}
              height={500}
              className="w-full h-64 md:h-80 rounded-3xl object-cover"
            />

            <Image
              src="/images/courses/comic 04.jpg"
              alt="漫畫作品二"
              width={700}
              height={500}
              className="w-full h-64 md:h-80 rounded-3xl object-cover"
            />

            <Image
              src="/images/courses/comic 03.jpg"
              alt="漫畫作品三"
              width={700}
              height={500}
              className="w-full h-64 md:h-80 rounded-3xl object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
