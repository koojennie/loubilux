import AboutDesc from "@/components/organisms/AboutContent/AboutDesc";
import FAQ from "@/components/organisms/AboutContent/Faqs";
import Footer from "@/components/organisms/Footer/Footer";
import Navbar from "@/components/organisms/Navbar/Navbar";

export default function page() {
  return (
    <>
      <Navbar activeMenu="about-us" />
      <AboutDesc />
      <FAQ />
      <Footer />
    </>
  );
}
