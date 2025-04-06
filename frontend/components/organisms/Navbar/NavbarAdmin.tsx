"use client"
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";
import { VscSignOut } from "react-icons/vsc";

interface SidebarAdminProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  handleSignOut: () => void;
}

const NavbarAdmin = ({ isSidebarOpen, toggleSidebar, handleSignOut }: SidebarAdminProps) => {
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
      <nav className="fixed z-30 w-full bg-white border-b border-gray-200 shadow-md">
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
              <a className="navbar-brand" href="/#">
                <Image src="/icon/loubilux-logo.png" width={30} height={30} alt="Logo" />
              </a>
              <p className="text-md font-semibold flex items-center mt-3 lg:mr-1.5">

                <span className="hidden pl-3 md:inline-block text-[#493628] self-center text-xl font-bold whitespace-nowrap no-underline">
                  Loubilux
                </span>
              </p>
            </div>

            <div className="flex justify-end my-2">
              <button className=" mr-4"
                onClick={() => setOpenCloseDropDown(!openCloseDropDown)}
              >
                <Image src={`https://res.cloudinary.com/dqjlprqcy/image/upload/v1742188549/user-loubilux_ldr7fh.svg`} width={40} height={40} alt="Logo" />
              </button>

              {/* dropdown item */}
              {openCloseDropDown && (
              <div
                className={`absolute z-10 min-w-[150px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg focus:outline-none top-14
                            origin-top-right transition-all duration-300 ease-out transform
                            ${openCloseDropDown ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                ref={dropdownRef}
              >
                <Link href={"/admin/profile"}>
                  <li
                    role="menuitem"
                    className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                  >
                    <IoPersonCircleSharp size={24} className="text-slate-400" />
                    <p className="text-slate-800 font-medium m-1">
                      My Profile
                    </p>
                  </li>
                </Link>
                <Link href={"/admin/profile/edit"}>
                  <li
                    role="menuitem"
                    className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                  >
                    <FaGear size={18} className="text-slate-400" />
                    <p className="text-slate-800 font-medium m-1">
                      Edit Profile
                    </p>
                  </li>
                </Link>
                <hr className="my-2 border-slate-200" role="menuitem" />
                <li
                  role="menuitem"
                  className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                >
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
                      <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z" clipRule="evenodd" />
                    </svg> */}
                  <VscSignOut size={18} className="text-slate-400" />

                  <p className="text-slate-800 font-medium m-1">
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