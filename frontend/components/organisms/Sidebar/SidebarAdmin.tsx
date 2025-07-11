"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaHouse } from "react-icons/fa6";
import { FaBoxArchive } from "react-icons/fa6";
import { FaBasketShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { HiDocumentMagnifyingGlass, HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import { HiMenu } from "react-icons/hi";


interface SidebarAdminProps {
  isSidebarOpen: boolean;
  userRole?: string;
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

        <div className="flex relative flex-col flex-1 pt-0 min-h-0 bg-[#AB886D] color-palette-1 drop-shadow-md">
          <div className="flex overflow-y-auto flex-col flex-1 pt-8 pb-4">
            <div className={`${isSidebarOpen ? "px-3" : "pr-3"} flex-1`} id="sidebar-items">
              <ul className={`pb-2 pt-1`}
                style={{ paddingLeft: isSidebarOpen ? '0px' : '13px' }}
              >
                <li className="hidden md:flex">
                  <button onClick={toggleSidebar} className={`text-3xl text-white mt-3`}>
                    <HiMenu />
                  </button>
                </li>
                <Link href={'/admin'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <li className="mt-3">
                    <div
                      className={` ${pathName === '/admin' ? 'bg-[#7f6550] shadow-lg ' : ''} ${isSidebarOpen ? "pl-2" : ""} mt-3 flex items-center py-2.5 rounded-lg hover:bg-[#7f6550] transition-all duration-200`}
                    >
                      <div className={` ${pathName === '/admin' ? 'bg-[#AB886D]' : ''} shadow-lg shadow-gray-300 text-white w-8 h-8 mr-1 rounded-lg text-center grid place-items-center bg-white`}>
                        <FaHouse className="color-palette-1" />
                      </div>
                      {isSidebarOpen ? (
                        <span
                          className="pl-3 text-white text-sm font-semibold"
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
                      className={` ${pathName === '/admin/products' ? 'bg-[#7f6550] shadow-lg ' : ''} ${isSidebarOpen ? "pl-2" : ""} mt-3 flex items-center py-2.5 rounded-lg hover:bg-[#7f6550] transition-all duration-200`}

                    >
                      <div className={` ${pathName === '/admin/products' ? 'bg-[#7f6550]' : ''} shadow-lg shadow-gray-300 !text-white w-8 h-8 mr-1 rounded-lg text-center grid place-items-center bg-white`}>
                        <FaBoxArchive className="color-palette-1" />
                      </div>

                      {isSidebarOpen ? (
                        <span
                          className="pl-3 text-white text-sm font-semibold"
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
                      className={` ${pathName === '/admin/categories' ? 'bg-[#7f6550] shadow-lg ' : ''} ${isSidebarOpen ? "pl-2" : ""} mt-3 flex items-center py-2.5 rounded-lg hover:bg-[#7f6550] transition-all duration-200`}

                    >
                      <div className={` ${pathName === '/admin/categories' ? 'bg-[#AB886D]' : ''} shadow-lg shadow-gray-300 !text-white w-8 h-8 mr-1 rounded-lg text-center grid place-items-center bg-white`}>
                        <BiCategory className="color-palette-1" />
                      </div>

                      {isSidebarOpen ? (
                        <span
                          className="pl-3 text-white text-sm font-semibold"
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
                      className={` ${pathName === '/admin/orders' ? 'bg-[#7f6550] shadow-lg ' : ''} ${isSidebarOpen ? "pl-2" : ""} mt-3 flex items-center py-2.5 rounded-lg hover:bg-[#7f6550] transition-all duration-200`}

                    >
                      <div className={` ${pathName === '/admin/orders' ? 'bg-[#AB886D]' : ''} shadow-lg shadow-gray-300 !text-white w-8 h-8 mr-1 rounded-lg text-center grid place-items-center bg-white`}>
                        <FaBasketShopping className="color-palette-1" />
                      </div>

                      {isSidebarOpen ? (
                        <span
                          className="pl-3 text-white text-sm font-semibold"
                        >
                          Orders
                        </span>
                      ) : (<span></span>)}
                    </div>
                  </li>
                </Link>

                {/* opname */}
                <Link href={'/admin/opname'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <li className="mt-2">
                    <div
                      className={` ${pathName === '/admin/opname' ? 'bg-[#7f6550] shadow-lg ' : ''} ${isSidebarOpen ? "pl-2" : ""} mt-3 flex items-center py-2.5 rounded-lg hover:bg-[#7f6550] transition-all duration-200`}

                    >
                      <div className={` ${pathName === '/admin/opname' ? 'bg-[#AB886D]' : ''} shadow-lg shadow-gray-300 !text-white w-8 h-8 mr-1 rounded-lg text-center grid place-items-center bg-white`}>
                        <HiDocumentMagnifyingGlass className="color-palette-1" />
                      </div>

                      {isSidebarOpen ? (
                        <span
                          className="pl-3 text-white text-sm font-semibold"
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
                        className={` ${pathName === '/admin/users' ? 'bg-[#7f6550] shadow-lg ' : ''} ${isSidebarOpen ? "pl-2" : ""} mt-3 flex items-center py-2.5 rounded-lg hover:bg-[#7f6550] transition-all duration-200`}

                      >
                        <div className={` ${pathName === '/admin/users' ? 'bg-[#AB886D]' : ''} shadow-lg shadow-gray-300 !text-white w-8 h-8 mr-1 rounded-lg text-center grid place-items-center bg-white`}>
                          <FaUser className="color-palette-1" />
                        </div>

                        {isSidebarOpen ? (
                          <span
                            className="pl-3 text-white text-sm font-semibold"
                          >
                            Users
                          </span>
                        ) : (<span></span>)}
                      </div>
                    </li>
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default SidebarAdmin;