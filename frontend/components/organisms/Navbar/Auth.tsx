'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaCartShopping } from "react-icons/fa6";
import { Toaster, toast } from "react-hot-toast";
import { useCart } from "@/context/CartContext";

export default function Auth() {
  const router = useRouter();
  const { totalItems } = useCart();

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/me`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setIsAuth(true);
          setRole(response.data.user.role);

        }
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setIsAuth(false);
            toast.error("Unauthorized: Please login first.");
          } else {
            toast.error(`Unexpected error: ${err.response?.statusText || err.message}`);
          }
        } else {
          toast.error(`Non-Axios error: ${err.message}`);
        }
      }
    };
    fetchUser();
  }, []);


  const handleLogout = async () => {
    try {

      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/logout`,
        {},
        {
          withCredentials: true
        }
      );

      toast.success("Logout successfully", { duration: 2000 })

      setTimeout(() => {
        router.replace("/");
        window.location.reload();
      }, 1000);

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    }
  }

  if (isAuth) {
    return (
      <li className="nav-item my-auto dropdown flex flex-col md:flex-col lg:flex-row gap-3 md:gap-6 lg:gap-6 lg:items-center">
        <div className="vertical-line d-lg-block d-none">
          <Toaster />
        </div>
        <div className="relative dropdown-toggle ms-lg-25">
          <Link href="/cart">
            <FaCartShopping className="text-3xl color-palette-1 cursor-pointer mb-16 mt-16" href="/cart" />
          </Link>
          <span className="absolute top-2 left-4 md:top-2 md:left-4 lg:top-2 lg:-right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {/* {} */}
            {totalItems}
          </span>
        </div>
        <div className="sm:relative">
          <a
            className="dropdown-toggle ms-lg-25"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="/img/user-loubilux.svg"
              className="rounded-circle"
              width="40"
              height="40"
              alt=""
            />
          </a>

          <ul
            className="dropdown-menu border-0"
            aria-labelledby="dropdownMenuLink"
          >
            {(role == 'superadmin' || role == 'admin') && (
              <li>
                <Link className="dropdown-item text-lg color-palette-2" href="/admin">
                  Admin Page
                </Link>
              </li>
            )}
            <li>
              <Link className="dropdown-item text-lg color-palette-2" href="/member/edit-profile">
                My Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item text-lg color-palette-2" href="/member/transactions">
                My Transactions
              </Link>
            </li>
            <li>
              <button className="dropdown-item text-lg color-palette-2" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </li>
    );
  }
  return (
    <li className="nav-item my-auto">
      <Link
        className="d-flex flex-column mx-auto !rounded-full py-3 px-7 text-center bg-[#493628] !font-semibold text-lg text-white flex transition-all duration-500 hover:bg-[#705C53]"
        role="button" href="/sign-in"
      >
        Sign In
      </Link>
    </li>
  );
}
