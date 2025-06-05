'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { HiSearch } from "react-icons/hi";
import { HiChevronDown, HiFunnel, HiMinus, HiPlus, HiSquares2X2, HiOutlineXMark } from "react-icons/hi2";
import Navbar from "@/components/organisms/Navbar/Navbar";

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'bag', label: 'Bag', checked: false },
      { value: 'shoes', label: 'Shoes', checked: false },
      { value: 'wallet', label: 'Wallet', checked: true },
      { value: 'wrist-watch', label: 'Wrist Watch', checked: false },
      { value: 'bracelet', label: 'Bracelet', checked: false },
      { value: 'sunglasses', label: 'Sunglasses', checked: false },
      { value: 'bodycare', label: 'Bodycare', checked: false },
    ],
  },
  {
    id: 'price',
    name: 'Price',
    options: [
      { value: 'under-250k', label: 'Under IDR 250K', checked: false },
      { value: '250k-500k', label: 'IDR 250K – 500K', checked: false },
      { value: '500k-1m', label: 'IDR 500K – 1M', checked: true },
      { value: '1m-2m', label: 'IDR 1M – 2.5M', checked: false },
      { value: 'over-2m', label: 'Over IDR 2.5M', checked: false },
    ],
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function page() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  return (
    <>
    <Navbar activeMenu="catalog" />
    <section className="text-brown">
        <div className="bg-white">
        <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="!text-2xl !font-semibold text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <HiOutlineXMark aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-1">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-1 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-semibold text-[#493628] text-lg">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <HiPlus aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <HiMinus aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="">
                      <div className="pb-3">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3 flex-row items-center">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 rounded-sm border border-gray-300 accent-[#493628]"
                                />
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-lg text-[#493628]"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        {/* 🍭 large screen */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-6 pb-6">
            <h1 className="text-4xl !font-semibold tracking-tight text-gray-900">Products Catalog</h1>
              <div className="flex items-center">
                <div className="relative w-full pr-5">
                  <input type="text" id="search"
                      className="bg-white text-lg font-medium rounded-full border px-10 py-2 transition-all ease-in duration-300 w-full focus:outline-primary"
                      placeholder="Search here..." />
                  <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-6" />
                </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-lg font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <HiChevronDown
                      aria-hidden="true"
                      className="mx-2 size-7 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-lg bg-white shadow-[-8px_8px_58px_rgba(0,0,0,0.1)] border-0 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current ? '!font-medium !text-[#493628]' : '!text-[#BFB29E] !font-medium',
                            'block px-4 py-2 text-base data-focus:bg-gray-100 data-focus:outline-hidden !font-medium',
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <HiSquares2X2 aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <HiFunnel aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root !mb-0">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-1 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-semibold text-[#493628] text-lg pl-2">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <HiPlus aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <HiMinus aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3 flex-row items-center pl-2">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 rounded-sm border border-gray-300 accent-[#493628]"
                                />
                              </div>
                            </div>
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-lg text-[#493628]">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">{/* Your content */}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
    </section>
    </>
  )
};
