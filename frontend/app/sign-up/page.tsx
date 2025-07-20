"use client"

import Image from "next/image";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import SignUpForm from "@/components/organisms/SignUpForm/SignUpForm";


export default function SignUp() {

    const handleSignUp = async (formData: any) => {
      try {

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/register`,
          formData,
          {
            withCredentials: true
          }
        );
        
        if (response.status === 201) {
          toast.success("Register successfully");

          setTimeout(() => {
            window.location.href = "/sign-in";
          }, 1000);

      } else {
        toast.error("Login failed. Please try again.");
      }

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
      console.error("Sign up Error", error)
    }
  }

  return (
    <section className="sign-up mx-auto">
      <Toaster toastOptions={{
    style: {
      maxWidth: 500
    }
  }} />
      <div className="flex">
        <div className="flex-2 my-auto">
          {/* <form action=""> */}
          <div className="container mx-auto">
            <div className="pb-50">
              <Link className="navbar-brand" href="/">
                <Image src="/icon/loubishop-logo.svg" width={60} height={60} alt="Logo" />
              </Link>
            </div>
            <SignUpForm onSubmit={handleSignUp} />
          </div>
          {/* </form> */}
        </div>
        <div className="col-xxl-7 col-lg-6 bg-[#493628] text-center pt-lg-145 pb-lg-145 d-lg-block d-none">
          <img src="/img/sign-in-up.svg" width="500" height="500" className="img-fluid pb-50" alt="" />
          <h2 className="text-4xl fw-bold text-white mb-30">Own the Luxury.<br />
            Embrace the Elegance.</h2>
          <p className="text-white m-0">We bring you branded bags and<br />premium products guaranteed<br />
            100% original from Germany</p>
        </div>
      </div>
    </section>
  )
}
