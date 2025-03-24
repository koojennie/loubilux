import Footer from "@/components/organisms/Footer/Footer";
import Navbar from "@/components/organisms/Navbar/Navbar";

export default function page() {
  return (
    <>
      <Navbar />
      <section className="text-brown header pt-lg-60 pb-50">
        <div className="container-xxl container-fluid">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-4xl fw-bold color-palette-1 text-center mb-30">
              The Story of Loubi: Built on Passion and Trust
            </h1>
            <p className="mx-auto leading-relaxed text-lg text-justify tracking-wide px-5 mt-2">
            Loubi Shop was founded in 2023 by Birgitte and her older sister, Louise. They started the business with a shared vision: to provide a trusted personal shopping service (jastip) for high-quality branded goods from Germany. Their inspiration came from the growing demand among Indonesians for authentic luxury items, especially bags from renowned brands like Longchamp and Aigner.
            <br/>
            <br/>
            Over the years, more and more Indonesians have been purchasing goods from abroad, seeking both exclusivity and better prices. Understanding this trend, Birgitte and Louise saw an opportunity to bridge the gap between Indonesian shoppers and premium international brands. With a strong commitment to honesty and trust, they ensure that every product sold is 100% original.
            <br/>
            <br/>
            Loubi Shop continues to grow, offering a seamless shopping experience through COD (available in Depok), WhatsApp, Shopee, and Tokopedia orders. While they are not affiliated with any specific brands, their mission remains the same: bringing authentic luxury closer to Indonesian customers.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
