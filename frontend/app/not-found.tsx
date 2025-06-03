import Image from "next/image";
import Link from "next/link";

export default function Page404() {
  return (
    <section className="not-found mx-auto pt-100 pb-100">
        <div className="container-fluid">
            <div className="text-center">
                <Image src="/img/404-error-loubilux.svg" alt="" width="500" height="500"/>
            </div>
            <div className="pt-10 pb-30">
                <h2 className="text-4xl fw-bold text-center color-palette-1 mb-10">Oops! Not Found</h2>
                <p className="text-lg text-center color-palette-1 m-0">The page you are trying to access is no longer available<br
                        className="d-sm-block d-none"/>
                    in our system. Please contact us for further assistance.</p>
            </div>
            <Link href="/">
                <button className="d-flex flex-column mx-auto !rounded-full py-3 px-10 text-center bg-[#493628] font-semibold text-lg text-white flex transition-all duration-500 hover:bg-[#705C53]">Home</button>
            </Link>
        </div>
    </section>
  )
}
