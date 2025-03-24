export default function Story() {
  return (
    <section className="story pt-50 pb-50">
      <div className="container-xxl container-fluid">
        <div className="row align-items-center px-lg-5 mx-auto gap-lg-0 gap-4">
          <div
            className="col-lg-7 col-12 d-lg-flex d-none justify-content-lg-end pe-lg-60"
            data-aos="zoom-in"
          >
            <img
              className="img-fluid"
              src="/img/story.svg"
              width={612}
              height={452}
              alt="header"
            />
          </div>
          <div className="col-lg-5 col-12 ps-lg-60">
            <div className="">
              <h2 className="text-4xl fw-bold color-palette-1 mb-30">
                Own the Luxury.
                <br /> Embrace the Elegance.
              </h2>
              <p className="text-lg color-palette-1 mb-30">
                We provide premium branded bags and 
                <br className="d-sm-block d-none" />
                luxury items with honesty and integrity,
                <br className="d-sm-block d-none" /> hassle-free service, and COD available for your convenience. 
              </p>
              <div className="d-md-block d-flex flex-column w-100">
                <a
                  className="btn btn-read text-white rounded-pill"
                  href="./about-us"
                  role="button"
                >
                  Read Our Story
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
