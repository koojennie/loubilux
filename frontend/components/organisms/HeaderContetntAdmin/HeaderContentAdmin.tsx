"use client";

import toast, { Toaster } from 'react-hot-toast';

interface HeaderContentAdminProps {
  header: string;
  subHeader: string;
  toAddPage: () => void;
  backPage: () => void;
}

const HeaderContentAdmin = ({header, subHeader, toAddPage}: HeaderContentAdminProps) => {

  const notify = () => toast('Here is your toast.');
 
    return (
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 rounded-none bg-clip-border">
          <div className="flex items-center justify-between gap-8 mb-8">
            <div>
              <h5 className="block font-sans text-2xl text-red-300 antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {header}
              </h5>
              <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                {subHeader}
              </p>
            </div>
              
              <Toaster />
            <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
              
              <button
                className="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={toAddPage}
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  strokeWidth={2}
                  className="w-4 h-4"
                >
                  <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                </svg>
                Add Product
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="block w-full overflow-hidden md:w-max">
              {/* <nav>
                <ul
                  role="tablist"
                  className="relative flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60"
                >
                  <li
                    role="tab"
                    className="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                    data-value="all"
                  >
                    <div className=" text-inherit">&nbsp;&nbsp;All&nbsp;&nbsp;</div>
                    <div className="absolute inset h-full bg-white rounded-md shadow-md" />
                  </li>
                  <li
                    role="tab"
                    className="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                    data-value="monitored"
                  >
                    <div className="text-inherit">
                      &nbsp;&nbsp;Active&nbsp;&nbsp;
                    </div>
                  </li>
                  <li
                    role="tab"
                    className="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                    data-value="unmonitored"
                  >
                    <div className="text-inherit">
                      &nbsp;&nbsp;Draft&nbsp;&nbsp;
                    </div>
                  </li>
                </ul>
              </nav> */}
            </div>
            <div className="w-full md:w-72">
              <div className="ml-3">
                <div className="w-full max-w-sm min-w-[200px] relative">
                  <input
                    className="w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                    placeholder="Search for products..."
                  />
                  <button className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded" type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-8 h-8 text-slate-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default HeaderContentAdmin;