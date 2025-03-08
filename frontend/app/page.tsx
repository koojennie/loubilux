"use client";
import { useEffect } from "react";
import AOS from "aos";
import Navbar from "@/components/organisms/Navbar/Navbar";
import MainBanner from "@/components/organisms/MainBanner/MainBanner";
import TransactionStep from "@/components/organisms/TransactionStep/TransactionStep";
import FeaturedGame from "@/components/organisms/FeaturedGame/FeaturedGame";
import Reached from "@/components/organisms/Reached/Reached";
import Story from "@/components/organisms/Story/Story";
import Footer from "@/components/organisms/Footer/Footer";

export default function Home() {
  useEffect(() => {
    AOS.init();
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      <Navbar />
      <MainBanner />
      <TransactionStep />
      <FeaturedGame />
      <Reached />
      <Story />
      <Footer />
    </>
  );
}
