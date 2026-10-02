import Image from "next/image";

export default function StudentWorks() {
  return (
    <section
      id="student-works"
      className="py-28 bg-[#faf7f2]"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-black text-center">
          學生作品
        </h2>

        <p className="text-center text-slate-600 mt-6 text-xl">
          探索創作的無限可能。
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <Image
            src="/images/student-works/1.jpg"
            alt=""
            width={700}
            height={500}
            className="rounded-3xl object-cover h-80"
          />

          <Image
            src="/images/student-works/2.jpg"
            alt=""
            width={700}
            height={500}
            className="rounded-3xl object-cover h-80"
          />

          <Image
            src="/images/student-works/3.jpg"
            alt=""
            width={700}
            height={500}
            className="rounded-3xl object-cover h-80"
          />

          <Image
            src="/images/student-works/4.jpg"
            alt=""
            width={700}
            height={500}
            className="rounded-3xl object-cover h-80"
          />

          <Image
            src="/images/student-works/5.jpg"
            alt=""
            width={700}
            height={500}
            className="rounded-3xl object-cover h-80"
          />

          <Image
            src="/images/student-works/6.jpg"
            alt=""
            width={700}
            height={500}
            className="rounded-3xl object-cover h-80"
          />

        </div>

        <div className="mx-auto my-20 max-w-3xl border-t border-[#E7E0D8]" />

        <p className="text-center text-slate-500 text-lg">
          暑期夏令營｜走出教室，開啟五感創作。
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <Image
            src="/images/student-works/7.jpg"
            alt=""
            width={700}
            height={500}
            className="rounded-3xl object-cover h-80"
          />

          <Image
            src="/images/student-works/8.jpg"
            alt=""
            width={700}
            height={500}
            className="rounded-3xl object-cover h-80"
          />

          <Image
            src="/images/student-works/9.jpg"
            alt=""
            width={700}
            height={500}
            className="rounded-3xl object-cover h-80"
          />

        </div>

      </div>
    </section>
  );
}
