import Image from "next/image";
import Illustration from "./Illustration";

export default function MainBanner() {
  return (
    <section className="header pt-lg-60 pb-50">
        <div className="container-xxl container-fluid">
          <div className="row gap-lg-0 gap-5">
            <div className="block lg:hidden text-center my-6">
              <img src="/img/main-banner-sm.png" className="w-[1000px] mx-auto mb-6" alt="" />
            </div>
            <div className="col-lg-6 col-12 my-auto">
              <p className="text-support text-lg color-palette-2">
                Hallo Luxusmamas!
              </p>
              <h1 className="header-title color-palette-1 fw-bold">
                Luxury from{" "}
                <span className="underline-brown">Germany</span>{" "}
                <br />
                Just a{" "}
                <span className="underline-brown">{" "}Click</span> away
              </h1>
              <p className="mt-30 mb-40 text-lg color-palette-1">
              We bring you branded bags and premium products
                <br className="d-md-block d-none" />guaranteed 💯% original from Germany
              </p>
              <div className="d-flex flex-lg-row flex-column gap-4">
                <a
                  className="btn btn-get text-lg text-white rounded-pill"
                  href="#feature"
                  role="button"
                >
                  Get Started
                </a>
                <a
                  className="btn-learn text-lg color-palette-1 my-auto text-center"
                  href="#"
                  role="button"
                >
                  Learn More
                </a>
              </div>
            </div>
            <Illustration />
          </div>
        </div>
      </section>
  )
}
