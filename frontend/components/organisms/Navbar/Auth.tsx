'use client'
import React, { useEffect } from "react";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function Auth() {
  const { isAuthenticated, refreshUser , user, loading, logout } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    refreshUser();
  }, [isAuthenticated]);


  if (loading) return (
    <li className="nav-item my-auto">
      <Link
        className="d-flex flex-column mx-auto !rounded-full py-3 px-7 text-center bg-[#493628] !font-semibold text-lg text-white flex transition-all duration-500 hover:bg-[#705C53]"
        role="button" href="/sign-in"
      >
        Sign In
      </Link>
    </li>
  )

  if (isAuthenticated) {
    return (
      <li className="nav-item my-auto dropdown flex flex-col md:flex-col lg:flex-row gap-3 md:gap-6 lg:gap-6 lg:items-center">
        <div className="vertical-line d-lg-block d-none">
        </div>
        <div className="relative dropdown-toggle ms-lg-25">
          <Link href="/cart">
            <FaCartShopping className="text-3xl color-palette-1 cursor-pointer mb-16 mt-16" href="/cart" />
          </Link>
          <span className="absolute top-2 left-4 md:top-2 md:left-4 lg:top-2 lg:-right-3 bg-red-500 text-white text-center text-xs font-bold px-2 py-0.5 rounded-full">
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
            <Image
              src={user?.profilePicture || "/img/user-loubilux.svg"}
              className="rounded-full object-cover"
              width={40}
              height={40}
              alt=""
            />
          </a>

          <ul
            className="dropdown-menu border-0"
            aria-labelledby="dropdownMenuLink"
          >
            {(user && (user.role == 'superadmin' || user.role == 'admin')) && (
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
                My Orders
              </Link>
            </li>
            <li>
              <button className="dropdown-item text-lg color-palette-2" onClick={logout}>
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
