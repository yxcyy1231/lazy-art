import Navbar from "@/components/Navbar";
import StudentWorks from "@/components/StudentWorks";
import Footer from "@/components/Footer";

export default function StudentWorksPage() {
  return (
    <>
      <Navbar />

      <main className="pt-24 md:pt-28 overflow-x-hidden">
        <StudentWorks />
      </main>

      <Footer />
    </>
  );
}
