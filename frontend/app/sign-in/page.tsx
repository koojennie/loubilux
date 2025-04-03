"use client"

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import SignInForm from "@/components/organisms/SignInForm/SignInForm";


export default function SignIn() {
  const handleSigIn = async (formData: any) => {
    console.log("ini adalah data dari inputan user", formData);

    try {

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`,
        formData, {withCredentials: true}
      );

      console.log("Login Berhasil", response);

      if (response.status === 200) {
        const { role } = response.data;
        toast.success("Login successful!");

        if (role === "admin" || role === 'superadmin') {
          window.location.href = "/admin/";
        } else if(role==="user") {
          window.location.href = "/";
        }

      } else {
        toast.error("Login failed. Please try again.");
      }
      
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
      console.error("Login Error", error)
    }

  }

  return (
    <section className="sign-in mx-auto">
      <Toaster />
      <div className="row">
        <div className="col-xxl-5 col-lg-6 my-auto py-lg-0 pt-lg-50 pb-lg-50 pt-30 pb-47 px-0">
          <div>
            <div className="container mx-auto">
              <div className="pb-50">
                <Link className="navbar-brand" href="/">
                  <Image src="/icon/loubilux-logo.png" width={60} height={60} alt="Logo" />
                </Link>
              </div>
              <SignInForm onSubmit={handleSigIn} />
            </div>
          </div>
        </div>
        <div className="col-xxl-7 col-lg-6 bg-blue text-center pt-lg-145 pb-lg-145 d-lg-block d-none">
          <img src="/img/Header-9.png" width="502" height="391.21" className="img-fluid pb-50" alt="" />
          <h2 className="text-4xl fw-bold text-white mb-30">Win the battle.<br />
            Be the Champion.</h2>
          <p className="text-white m-0">Kami menyediakan jutaan cara untuk<br /> membantu players menjadi<br />
            pemenang
            sejati</p>
        </div>
      </div>
    </section>
  )
}
