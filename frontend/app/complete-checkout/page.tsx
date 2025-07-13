import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <section className="complete-checkout mx-auto pt-lg-145 pb-lg-145 pt-100 pb-80">
        <div className="container-fluid">
            <div className="text-center">
                <Image src="/img/complete-checkout.svg" width={400} height={400} alt="checkout-complete" className="mb-20" />
            </div>
            <div className="pt-70 pb-50">
                <h2 className="text-4xl fw-bold text-center color-palette-1 mb-10">Checkout Completed</h2>
                <p className="text-lg text-center color-palette-1 m-0">We will confirm your payment and update<br
                        className="d-sm-block d-none"/>the status in the orders menu.</p>
            </div>
            <div className="button-group flex flex-col mx-auto items-center max-w-[280px]">
                <Link href="../member/transactions" className="w-full">
                <button className="p-3 !rounded-full w-full border-2 border-[#493628] bg-white font-semibold text-lg text-[#493628] transition-all duration-500 hover:!bg-[#493628] hover:text-white !mb-5"
                    role="button">My Orders</button>
                </Link>
            </div>
        </div>
    </section>
  )
}
