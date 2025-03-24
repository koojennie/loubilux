import NoStar from "./NoStar";
import Star from "./Star";

export default function FeaturedProducts() {
  return (
    <section className="feature pt-50 pb-50">
      <div className="container-fluid">
          <h2 className="text-4xl fw-bold color-palette-1 text-center mb-30">
            Our Featured Products
          </h2>

        <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4" data-aos="fade-up">
          <div className="relative group">
            <div className="overflow-hidden aspect-w-1 aspect-h-1">
              <img
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src="/img/featured-item1.png"
                alt=""
              />
            </div>
            <div className="absolute left-3 top-3">
              <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-lg font-bold tracking-wide text-[#493628] uppercase bg-white rounded-full">
                New
              </p>
            </div>
            <div className="flex items-start justify-between mt-4 space-x-4">
              <div>
                <h3 className="text-lg no-underline font-bold text-gray-900 sm:text-sm md:text-base">
                  <a href="" title="">
                  Coach Mollie Tote
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
                <div className="flex items-center mt-2.5 space-x-px">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <NoStar />
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-[#705C53] sm:text-sm md:text-base">
                  IDR 3.19M
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="overflow-hidden aspect-w-1 aspect-h-1">
              <img
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src="/img/featured-item2.png"
                alt=""
              />
            </div>
            <div className="absolute left-3 top-3">
              <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-lg font-bold tracking-wide text-white uppercase bg-[#493628] rounded-full">
                Sale
              </p>
            </div>
            <div className="flex items-start justify-between mt-4 space-x-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-sm md:text-base">
                  <a href="#" title="">
                    Michael Kors Crossbody
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
                <div className="flex items-center mt-2.5 space-x-px">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-[#705C53] sm:text-sm md:text-base">
                  IDR 1,29M
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="overflow-hidden aspect-w-1 aspect-h-1">
              <img
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src="/img/featured-item3.png"
                alt=""
              />
            </div>
            <div className="flex items-start justify-between mt-4 space-x-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-sm md:text-base">
                  <a href="#" title="">
                    Lacoste Geneva 2001138
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
                <div className="flex items-center mt-2.5 space-x-px">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-[#705C53] sm:text-sm md:text-base">
                  IDR 1.95M
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="overflow-hidden aspect-w-1 aspect-h-1">
              <img
                className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                src="/img/featured-item4.png"
                alt=""
              />
            </div>
            <div className="flex items-start justify-between mt-4 space-x-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-sm md:text-base">
                  <a href="#" title="">
                    Longchamp Sunglasses
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </a>
                </h3>
                <div className="flex items-center mt-2.5 space-x-px">
                  <Star />
                  <Star />
                  <Star />
                  <NoStar />
                  <NoStar />
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-[#705C53] sm:text-sm md:text-base">
                  IDR 1.35M
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
