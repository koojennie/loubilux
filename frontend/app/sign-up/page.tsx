import SignUpForm from "@/components/organisms/SignUpForm/SignUpForm";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  return (
    <section className="sign-up mx-auto">
        <div className="row">
            <div className="col-xxl-5 col-lg-6 my-auto py-lg-0 pt-lg-50 pb-lg-50 pt-30 pb-47 px-0">
                <form action="">
                    <div className="container mx-auto">
                        <div className="pb-50">
                            <Link className="navbar-brand" href="/">
                                <Image src="/icon/loubilux-logo.png" width={60} height={60} alt="Logo"/>
                            </Link>
                        </div>
                        <SignUpForm />
                    </div>
                </form>
            </div>
            <div className="col-xxl-7 col-lg-6 bg-[#493628] text-center pt-lg-145 pb-lg-145 d-lg-block d-none">
                <img src="/img/sign-in-up.svg" width="500" height="500" className="img-fluid pb-50" alt=""/>
                <h2 className="text-4xl fw-bold text-white mb-30">Own the Luxury.<br/>
                    Embrace the Elegance.</h2>
                <p className="text-white m-0">We bring you branded bags and<br/>premium products guaranteed<br/>
                100% original from Germany</p>
            </div>
        </div>
    </section>
  )
}
