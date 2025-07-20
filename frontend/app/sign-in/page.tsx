"use client"

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import SignInForm from "@/components/organisms/SignInForm/SignInForm";


export default function SignIn() {
  const handleSigIn = async (formData: any) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`,
        formData, { withCredentials: true }
      );
      if (response.status === 200) {
        const { role } = response.data;
        toast.success("Login successful!", { duration: 2000 });

        setTimeout(() => {
          if (role === "admin" || role === 'superadmin') {
            window.location.href = "/admin/";
          } else if (role === "user") {
            window.location.href = "/";
          }
        }, 1000);

      } else {
        toast.error("Login failed. Please try again.");
      }


    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    }

  }

  return (
    <section className="sign-in mx-auto">
      <Toaster />
      <div className="flex">
        <div className="flex-2 my-auto">
          <div>
            <div className="container mx-auto">
              <div className="pb-50">
                <Link className="navbar-brand" href="/">
                  <Image src="/icon/loubishop-logo.svg" width={60} height={60} alt="Logo" />
                </Link>
              </div>
              <SignInForm onSubmit={handleSigIn} />
            </div>
          </div>
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
