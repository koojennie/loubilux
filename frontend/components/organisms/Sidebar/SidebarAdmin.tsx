"use client"

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FcCamera } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { FaUser } from "react-icons/fa";

interface SidebarAdminProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarAdmin = ({isSidebarOpen, toggleSidebar}: SidebarAdminProps) => {
  const pathName = usePathname();

  return (
    <>
      <aside
        id="sidebar"
        className={`${ isSidebarOpen ? "w-48" : "w-15" } flex fixed top-0 left-0 z-20 flex-col  transition-all duration-300 flex-shrink-0 mt-16 pt-15 h-full lg:flex transition-width`}
        aria-label="Sidebar"
      >
        <div className="flex relative flex-col flex-1 pt-0 min-h-0 bg-white drop-shadow-lg">
          <div className="flex overflow-y-auto flex-col flex-1 pt-8 pb-4">
            <div className={`${ isSidebarOpen ? "px-3" : "" } flex-1`} id="sidebar-items">
                <ul className={`pb-2 pt-1`} 
                style={{ paddingLeft: isSidebarOpen ? '0px' : '13px' }}
                >
                <li>
                <button onClick={toggleSidebar} className={`text-3xl ml-5`}>
                  ☰
                </button>
                </li>
                <Link href={'/admin'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <li className="mt-3">
                    <div
                      className={` ${pathName === '/admin' ? 'bg-white shadow-lg ' : ''} ${ isSidebarOpen ? "pl-2" : "" } flex items-center py-2.5 rounded-lg hover:bg-gray-200 group shadow-gray-200 transition-all duration-200`}
                    >
                      <div className={` ${pathName === '/admin' ? 'bg-fuchsia-400' : 'bg-white'} shadow-lg shadow-gray-300 text-white text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center `}>
                        <FcHome />
                      </div>
                      { isSidebarOpen ? (
                      <span
                      className="pl-3 text-dark-500 text-sm font-semibold"
                      >
                        Dashboard
                      </span>
                      ) : (<span></span>)}
                    </div>
                  </li>
                </Link>
                <Link href={'/admin/products'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <li className="mt-2">
                    <div
                      className={` ${pathName === '/admin/products' ? 'bg-white shadow-lg ' : ''} ${ isSidebarOpen ? "pl-2" : "" } flex items-center py-2.5 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group shadow-gray-200 transition-all duration-200 no-underline`}
                    
                    >
                      <div className={` ${pathName === '/admin/products' ? 'bg-fuchsia-400' : ''} shadow-lg shadow-gray-300 !text-white  text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                        <FcCamera />
                      </div>

                      { isSidebarOpen ? (
                      <span
                      className="pl-3 text-dark-500 text-sm font-semibold"
                      >
                        Products
                      </span>
                      ) : (<span></span>)}
                    </div>
                  </li>
                </Link>
                <Link href={'/admin/orders'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <li className="mt-2">
                    <div
                      className={` ${pathName === '/admin/users' ? 'bg-white shadow-lg ' : ''} ${ isSidebarOpen ? "pl-2" : "" } flex items-center py-2.5 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group shadow-gray-200 transition-all duration-200 no-underline`}
                    
                    >
                      <div className={` ${pathName === '/admin/users' ? 'bg-fuchsia-400' : ''} shadow-lg shadow-gray-300 !text-white  text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center bg-white `}>
                        <FaUser className="bg-amber-300"/>
                      </div>

                      { isSidebarOpen ? (
                      <span
                      className="pl-3 text-dark-500 text-sm font-semibold"
                      >
                        Users
                      </span>
                      ) : (<span></span>)}
                    </div>
                  </li>
                </Link>
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