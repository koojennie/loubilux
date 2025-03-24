"use client";
import Navbar from "@/components/organisms/Navbar/Navbar";
import MainBanner from "@/components/organisms/MainBanner/MainBanner";
import TransactionStep from "@/components/organisms/TransactionStep/TransactionStep";
import Reached from "@/components/organisms/Reached/Reached";
import Story from "@/components/organisms/Story/Story";
import Footer from "@/components/organisms/Footer/Footer";
import FeaturedProducts from "@/components/organisms/FeaturedProducts/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Navbar />
      <MainBanner />
      <TransactionStep />
      <FeaturedProducts />
      <Reached />
      <Story />
      <Footer />
    </>
  );
}
