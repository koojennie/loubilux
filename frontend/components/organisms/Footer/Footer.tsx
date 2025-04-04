import Image from "next/image";

export default function Footer() {
  return (
    <section className="footer pt-50">
      <footer>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 text-lg-start text-center">
              <a href="" className="mb-30">
                <Image
                  src="/icon/loubilux-logo.png"
                  width={80}
                  height={80}
                  alt="logo"
                />
              </a>
              <p className="mt-30 text-lg color-palette-1 mb-30">
                Selling Your Most Wanted Authentic
                <br />Luxury Since 2023, Trusted & Reliable
              </p>
              <p className="mt-30 text-lg color-palette-1 mb-30">
                Copyright 2025. All Rights Reserved.
              </p>
            </div>
            <div className="col-lg-8 mt-lg-0 mt-20">
              <div className="row gap-sm-0">
                <div className="col-md-4 col-6 mb-lg-0 mb-25">
                  <p className="text-lg fw-semibold color-palette-1 mb-12">
                    Marketplace
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-6">
                      <a
                        href="https://chat.whatsapp.com/DGoYM1AHpH36PYYS2qNRbK"
                        className="text-lg color-palette-1"
                      >
                        WhatsApp Group
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        href="https://shopee.co.id/loubi.shop24"
                        className="text-lg color-palette-1"
                      >
                        Shopee
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        href="https://www.tokopedia.com/loukiesshop"
                        className="text-lg color-palette-1"
                      >
                        Tokopedia
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        href="https://www.instagram.com/loubi.shop24/"
                        className="text-lg color-palette-1"
                      >
                        Instagram
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4 col-6 mb-lg-0 mb-25">
                  <p className="text-lg fw-semibold color-palette-1 mb-12">
                    Content
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-6">
                      <a
                        href="/"
                        className="text-lg color-palette-1"
                      >
                        Home
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        href="/catalog"
                        className="text-lg color-palette-1"
                      >
                        Catalog
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        href="/about-us"
                        className="text-lg color-palette-1"
                      >
                        About Us
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4 col-12 mt-lg-0 mt-md-0 mt-25">
                  <p className="text-lg fw-semibold color-palette-1 mb-12">
                    Business Hour
                  </p>
                  <ul className="list-unstyled">
                  <li className="mb-6">
                      <a
                        href="https://wa.me/6281212768921"
                        className="text-lg color-palette-1"
                      >
                        WhatsApp
                      </a>
                    </li>
                    <li className="mb-6">
                      <p
                        className="text-lg color-palette-1"
                      >
                        Monday - Friday: 09:00 - 21:00
                      </p>
                    </li>
                    <li className="mb-6">
                      <p
                        className="text-lg color-palette-1"
                      >
                        Saturday - Sunday: 10:00 - 18:00
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
