import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="sidebar-footer pt-73 pe-30">
      <div className="footer-card">
        <div className="d-flex justify-content-between mb-20">
          <Image src="/img/sidebar-bottom.svg" width={50} height={50} alt="sidebar bottom" />
          <p className="font-semibold color-palette-1">
            Own the Luxury<br />
            Just for You
          </p>
        </div>
        <Link href="/">
          <button
            className="btn btn-get-started w-100 !font-semibold text-xs text-center text-white rounded-pill"
            role="button"
          >
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}
