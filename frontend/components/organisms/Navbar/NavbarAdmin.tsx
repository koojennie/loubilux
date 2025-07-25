"use client"
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { FaArrowRightFromBracket, FaGear, FaHouseChimney, FaUser } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";

interface SidebarAdminProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  handleSignOut: () => void;
}

const NavbarAdmin = ({ isSidebarOpen, toggleSidebar, handleSignOut }: SidebarAdminProps) => {
  const { user } = useAuth();


  const [openCloseDropDown, setOpenCloseDropDown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenCloseDropDown(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenCloseDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setOpenCloseDropDown(false);
  }, [pathName])

  return (
    <div>
      <nav className="fixed z-30 w-full bg-[#AB886D]">
        <div className="py-1 px-4 lg:px-5 lg:pl-3">
          <div className="flex justify-between items-center">
            <div className="md:hidden">
              <button onClick={toggleSidebar} className="text-3xl ml-5">
                ☰
              </button>
            </div>

            <div className="flex justify-start items-center">
              <button
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                className="p-2 mr-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
              >
              </button>
              <div className="gap-3 flex flex-row justify-center items-center">
                <a className="" href="/#">
                  <Image
                    src="/icon/loubishop-brown.svg"
                    width={30}
                    height={30}
                    alt="Logo" />
                </a>
                <p className="text-xl font-semibold flex items-center justify-center text-white !mb-0">
                  LouBiShop
                </p>
              </div>
            </div>

            <div className="flex justify-end my-2">
              <button className=" mr-4"
                onClick={() => setOpenCloseDropDown(!openCloseDropDown)}
              >
                <Image
                  src={user?.profilePicture || "/img/user-loubilux.svg"}
                  className="rounded-circle"
                  width={40}
                  height={40}
                  alt="Logo" />
              </button>

              {/* dropdown item */}
              {openCloseDropDown && (
                <div
                  className={`absolute z-10 min-w-[150px] overflow-auto rounded-lg bg-white p-1.5 shadow-lg focus:outline-none top-14
                            origin-top-right transition-all duration-300 ease-out transform
                            ${openCloseDropDown ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  ref={dropdownRef}
                >
                  <Link href={"/"}>
                    <li
                      role="menuitem"
                      className="cursor-pointer gap-2 color-palette-2 flex w-full text-sm items-center rounded-md p-2 transition-all hover:bg-gray-100 focus:bg-slate-100 active:bg-slate-100"
                    >
                      <FaHouseChimney size={20} />
                      <p className="font-medium m-1">
                        Home Page
                      </p>
                    </li>
                  </Link>
                  <Link href={"/admin/profile"}>
                    <li
                      role="menuitem"
                      className="cursor-pointer color-palette-2 flex w-full text-sm items-center gap-2 rounded-md p-2 transition-all hover:bg-gray-100 focus:bg-slate-100 active:bg-slate-100"
                    >
                      <FaUser size={20} className="" />
                      <p className="font-medium m-1">
                        My Profile
                      </p>
                    </li>
                  </Link>
                  <Link href={"/admin/profile/edit"}>
                    <li
                      role="menuitem"
                      className="cursor-pointer color-palette-2 gap-2 flex w-full text-sm items-center rounded-md p-2 transition-all hover:bg-gray-100 focus:bg-slate-100 active:bg-slate-100"
                    >
                      <FaGear size={20} className="" />
                      <p className="font-medium m-1">
                        Edit Profile
                      </p>
                    </li>
                  </Link>
                  <li
                    role="menuitem"
                    className="cursor-pointer color-palette-2 gap-2 flex w-full text-sm items-center rounded-md p-2 transition-all hover:bg-gray-100 focus:bg-slate-100 active:bg-slate-100"
                  >
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#493628]">
                      <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z" clipRule="evenodd" />
                    </svg> */}
                    <FaArrowRightFromBracket size={20} className="" />

                    <p className="font-medium m-1">
                      <button onClick={handleSignOut}>
                        Sign Out
                      </button>
                    </p>
                  </li>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavbarAdmin;