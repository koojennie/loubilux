"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaHouse } from "react-icons/fa6";
import { FaBoxArchive } from "react-icons/fa6";
import { FaBasketShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";


interface SidebarAdminProps {
  isSidebarOpen: boolean;
  userRole: string;
  toggleSidebar: () => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const SidebarAdmin = ({ isSidebarOpen, toggleSidebar, setIsSidebarOpen, userRole }: SidebarAdminProps) => {
  const pathName = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [pathName])

  return (
    <>
      <aside
        id="sidebar"
        // className={`${ isSidebarOpen ? "w-48" : "w-15" } flex fixed top-0 left-0 z-20 flex-col  transition-all duration-300 flex-shrink-0 mt-16 pt-15 h-full lg:flex transition-width`}
        className={`${isSidebarOpen ? "translate-x-0 md:w-44" : "-translate-x-full md:translate-x-0"} flex fixed top-0 left-0 z-20 flex-col  transition-all duration-300 flex-shrink-0 mt-16 pt-15 h-full lg:flex transition-width md:mt-16`}
        aria-label="Sidebar"
      >

        <div className="flex relative flex-col flex-1 pt-0 min-h-0 bg-white drop-shadow-lg">
          <div className="flex overflow-y-auto flex-col flex-1 pt-8 pb-4">
            <div className={`${isSidebarOpen ? "px-3" : "pr-3"} flex-1`} id="sidebar-items">
              <ul className={`pb-2 pt-1`}
                style={{ paddingLeft: isSidebarOpen ? '0px' : '13px' }}
              >
                <li className="hidden md:flex">
                  <button onClick={toggleSidebar} className={`text-3xl ml-5`}>
                    ☰
                  </button>
                </li>
                <Link href={'/admin'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <li className="mt-3">
                    <div
                      className={` ${pathName === '/admin' ? 'bg-white shadow-lg ' : ''} ${isSidebarOpen ? "pl-2" : ""} flex items-center py-2.5 rounded-lg hover:bg-gray-200 group shadow-gray-200 transition-all duration-200`}
                    >
                      <div className={` ${pathName === '/admin' ? 'bg-white' : ''} shadow-lg shadow-gray-300 text-white text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center `}>
                        <FaHouse className="text-slate-700" />
                      </div>
                      {isSidebarOpen ? (
                        <span
                          className="pl-3 text-dark-500 text-sm font-semibold"
                        >
                          Dashboard
                        </span>
                      ) : (<span></span>)}
                    </div>
                  </li>
                </Link>
                {/* products */}
                <Link href={'/admin/products'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <li className="mt-2">
                    <div
                      className={` ${pathName === '/admin/products' ? 'bg-white shadow-lg ' : ''} ${isSidebarOpen ? "pl-2" : ""} flex items-center py-2.5 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group shadow-gray-200 transition-all duration-200 no-underline`}

                    >
                      <div className={` ${pathName === '/admin/products' ? 'bg-white' : ''} shadow-lg shadow-gray-300 !text-white  text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                        <FaBoxArchive className="text-slate-700" />
                      </div>

                      {isSidebarOpen ? (
                        <span
                          className="pl-3 text-dark-500 text-sm font-semibold"
                        >
                          Products
                        </span>
                      ) : (<span></span>)}
                    </div>
                  </li>
                </Link>

                {/* categories */}
                <Link href={'/admin/categories'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <li className="mt-2">
                    <div
                      className={` ${pathName === '/admin/categories' ? 'bg-white shadow-lg ' : ''} ${isSidebarOpen ? "pl-2" : ""} flex items-center py-2.5 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group shadow-gray-200 transition-all duration-200 no-underline`}

                    >
                      <div className={` ${pathName === '/admin/categories' ? 'bg-fuchsia-400' : ''} shadow-lg shadow-gray-300 !text-white  text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center bg-white `}>
                        <BiCategory className="text-slate-700" />
                      </div>

                      {isSidebarOpen ? (
                        <span
                          className="pl-3 text-dark-500 text-sm font-semibold"
                        >
                          Categories
                        </span>
                      ) : (<span></span>)}
                    </div>
                  </li>
                </Link>

                {/* orders */}
                <Link href={'/admin/orders'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <li className="mt-2">
                    <div
                      className={` ${pathName === '/admin/orders' ? 'bg-white shadow-lg ' : ''} ${isSidebarOpen ? "pl-2" : ""} flex items-center py-2.5 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group shadow-gray-200 transition-all duration-200 no-underline`}

                    >
                      <div className={` ${pathName === '/admin/orders' ? 'bg-fuchsia-400' : ''} shadow-lg shadow-gray-300 !text-white  text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center bg-white `}>
                        <FaBasketShopping className="text-slate-700" />
                      </div>

                      {isSidebarOpen ? (
                        <span
                          className="pl-3 text-dark-500 text-sm font-semibold"
                        >
                          Orders
                        </span>
                      ) : (<span></span>)}
                    </div>
                  </li>
                </Link>

                {/* orders */}
                <Link href={'/admin/opname'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <li className="mt-2">
                    <div
                      className={` ${pathName === '/admin/opname' ? 'bg-white shadow-lg ' : ''} ${isSidebarOpen ? "pl-2" : ""} flex items-center py-2.5 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group shadow-gray-200 transition-all duration-200 no-underline`}

                    >
                      <div className={` ${pathName === '/admin/opname' ? 'bg-fuchsia-400' : ''} shadow-lg shadow-gray-300 !text-white  text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center bg-white `}>
                        <HiOutlineDocumentMagnifyingGlass  className="text-slate-700" />
                      </div>

                      {isSidebarOpen ? (
                        <span
                          className="pl-3 text-dark-500 text-sm font-semibold"
                        >
                          Opname
                        </span>
                      ) : (<span></span>)}
                    </div>
                  </li>
                </Link>

                <hr className="my-2 border-slate-200" role="menuitem" />
                {/* users */}
                {userRole === 'superadmin' && (
                  <Link href={'/admin/users'}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <li className="mt-2">
                      <div
                        className={` ${pathName === '/admin/users' ? 'bg-white shadow-lg ' : ''} ${isSidebarOpen ? "pl-2" : ""} flex items-center py-2.5 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group shadow-gray-200 transition-all duration-200 no-underline`}

                      >
                        <div className={` ${pathName === '/admin/users' ? 'bg-fuchsia-400' : ''} shadow-lg shadow-gray-300 !text-white  text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center bg-white `}>
                          <FaUser className="text-slate-700" />
                        </div>

                        {isSidebarOpen ? (
                          <span
                            className="pl-3 text-dark-500 text-sm font-semibold"
                          >
                            Users
                          </span>
                        ) : (<span></span>)}
                      </div>
                    </li>
                  </Link>
                )}
              </ul>
              <hr className="border-0 h-px bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100" />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default SidebarAdmin;