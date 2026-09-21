import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import HomeAbout from "@/components/HomeAbout";
import HomeCourseSection from "@/components/HomeCourseSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden pt-20 md:pt-24">
        <HeroBanner />

        <HomeAbout />

        {/* 分隔線 */}
        <div className="bg-[#FAF8F5] pt-16">
          <div className="mx-auto max-w-3xl border-t border-[#E7E0D8]" />
        </div>

        <HomeCourseSection />

        <div className="bg-[#FAF8F5] pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="overflow-hidden rounded-3xl border border-[#E8E2DD] shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7228.902706281145!2d121.53155804150845!3d25.052686780703254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abd02bf948ad%3A0xf88d117cc943af3e!2z5oe25b6X55Wr5a6kIExhenkgQXJ0!5e0!3m2!1szh-TW!2stw!4v1783234406738!5m2!1szh-TW!2stw"
                title="Lazy Art 地圖位置"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
