import Image from "next/image";

const NavbarAdmin = () => {
  return (
    <div>
      <nav className="fixed z-30 w-full bg-white border-b border-gray-200 shadow-md">
        <div className="py-1 px-4 lg:px-5 lg:pl-3">
          <div className="flex justify-between items-center">
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

                <span className="hidden pl-3 md:inline-block self-center text-xl font-bold whitespace-nowrap no-underline">
                  Loubilux
                </span>
              </p>
              <form action="#" method="GET" className="hidden lg:block lg:pl-8">
                <label htmlFor="topbar-search" className="sr-only">
                  Search
                </label>
                <div className="relative mt-1 lg:w-64">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="searchNavbarAdmin"
                    // id="topbar-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full pl-10 p-2.5"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center">
              <button
                id="toggleSidebarMobileSearch"
                type="button"
                className="p-2 text-gray-500 rounded-2xl lg:hidden hover:text-gray-900 hover:bg-gray-100"
              >
                <span className="sr-only">Search</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavbarAdmin;