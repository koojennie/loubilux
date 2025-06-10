'use client'

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
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
import { HiChevronDown, HiFunnel, HiMinus, HiPlus, HiOutlineXMark } from "react-icons/hi2";
import Navbar from "@/components/organisms/Navbar/Navbar";
import ProductItem from "@/components/organisms/Products/ProductItem";
import productsData from "@/utils/data";
import { Product } from "@/types/type"



function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function page() {

  const sortOptions = [
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
  ]

  // initial state
  const [filters, setFilters] = useState([
    {
      id: 'category',
      name: 'Category',
      // options: [
      //   { value: 'bag', label: 'Bag', checked: false },
      //   { value: 'shoes', label: 'Shoes', checked: false },
      //   { value: 'wallet', label: 'Wallet', checked: false },
      //   { value: 'wrist-watch', label: 'Wrist Watch', checked: false },
      //   { value: 'bracelet', label: 'Bracelet', checked: false },
      //   { value: 'sunglasses', label: 'Sunglasses', checked: false },
      //   { value: 'bodycare', label: 'Bodycare', checked: false },
      // ],
      options: [],
    },
    {
      id: 'price',
      name: 'Price',
      options: [
        { value: 'under-250k', label: 'Under IDR 250K', checked: false },
        { value: '250k-500k', label: 'IDR 250K – 500K', checked: false },
        { value: '500k-1m', label: 'IDR 500K – 1M', checked: false },
        { value: '1m-2m', label: 'IDR 1M – 2.5M', checked: false },
        { value: 'over-2m', label: 'Over IDR 2.5M', checked: false },
      ],
    },
  ]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    category: new Set<string>(),
    price: new Set<string>(),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Newest");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products`);
        const results = response.data;
        results.data = results.data.map((product: any, index: number) => ({
          id: product.productId,
          ...product,
          category: product.Category?.name || "N/A",
        }));
        setProducts(results.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
      setIsLoading(false);
    };

    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`);

        const categoryOptions = response.data.data.map((cat: any) => ({
          value: cat.name,
          label: cat.name,
          checked: false,
        }));

        setFilters((prevFilters) =>
          prevFilters.map((filter) =>
            filter.id === 'category'
              ? { ...filter, options: categoryOptions }
              : filter
          )
        );

      } catch (error) {
        console.error('Error Fetching Categories');
      }
    }


    fetchProducts();
    fetchCategories();
  }, []);



  const filteredProducts = useMemo(() => {
    const selectedCategories = selectedFilters.category;
    const selectedPrices = selectedFilters.price;

    let result = [...products];

    console.log(result);

    // Filter
    result = result.filter((product) => {
      const matchCategory =
        selectedCategories.size === 0 || selectedCategories.has(
          typeof product.category === 'string'
            ? product.category
            : (product.category?.name ?? '')
        );

      const matchPrice =
        selectedPrices.size === 0 ||
        Array.from(selectedPrices).some((priceRange) => {
          const price = product.price;
          switch (priceRange) {
            case "under-250k":
              return price < 250000;
            case "250k-500k":
              return price >= 250000 && price <= 500000;
            case "500k-1m":
              return price > 500000 && price <= 1000000;
            case "1m-2m":
              return price > 1000000 && price <= 2500000;
            case "over-2m":
              return price > 2500000;
            default:
              return true;
          }
        });

      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

      return matchCategory && matchPrice && matchSearch;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortOption) {
        case "Price: Low to High":
          return a.price - b.price;
        case "Price: High to Low":
          return b.price - a.price;
        case "Newest":
          return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [products, selectedFilters, searchQuery, sortOption]);


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
                                      value={option.value}
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      type="checkbox"
                                      checked={selectedFilters[section.id as keyof typeof selectedFilters]?.has(option.value)}
                                      onChange={(e) => {
                                        const filterType = section.id as keyof typeof selectedFilters;
                                        const newSet = new Set(selectedFilters[filterType]);

                                        if (e.target.checked) {
                                          newSet.add(option.value);
                                        } else {
                                          newSet.delete(option.value);
                                        }

                                        setSelectedFilters({
                                          ...selectedFilters,
                                          [filterType]: newSet,
                                        });
                                      }}
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
                <h1 className="text-4xl !font-semibold tracking-tight text-gray-900">Products</h1>
                <div className="flex items-center">
                  <div className="relative w-full pr-5">
                    <input
                      type="text"
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
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
                            <button
                              onClick={() => setSortOption(option.name)}
                              className={classNames(
                                sortOption === option.name ? '!font-medium !text-[#493628] !text-left !w-full' : '!text-[#BFB29E] !font-medium !text-left !w-full',
                                'block px-4 py-2 text-base data-focus:bg-gray-100 data-focus:outline-hidden',
                              )}
                            >
                              {option.name}
                            </button>
                          </MenuItem>
                        ))}
                      </div>
                    </MenuItems>
                  </Menu>
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
                                      type="checkbox"
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      value={option.value}
                                      checked={selectedFilters[section.id as keyof typeof selectedFilters]?.has(option.value)}
                                      onChange={(e) => {
                                        const filterType = section.id as keyof typeof selectedFilters;
                                        const newSet = new Set(selectedFilters[filterType]);

                                        if (e.target.checked) {
                                          newSet.add(option.value);
                                        } else {
                                          newSet.delete(option.value);
                                        }

                                        setSelectedFilters({
                                          ...selectedFilters,
                                          [filterType]: newSet,
                                        });
                                      }}
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
                  <div className="lg:col-span-3">
                    {isLoading ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="space-y-2">
                            <div className="bg-secondary bg-opacity-10 rounded-xl w-full aspect-[1/1] placeholder-glow">
                              <div className="w-full h-full placeholder rounded-xl"></div>
                            </div>
                            <p className="placeholder-wave">
                              <span className="placeholder col-6 rounded"></span>
                            </p>
                            <p className="placeholder-wave">
                              <span className="placeholder col-4 rounded"></span>
                            </p>
                            <div className="d-flex justify-center gap-1">
                              <span className="placeholder btn btn-sm col-2 rounded-pill"></span>
                              <span className="placeholder btn btn-sm col-3 rounded-pill"></span>
                              <span className="placeholder btn btn-sm col-2 rounded-pill"></span>
                            </div>
                          </div>
                        ))}
                      </div>     
                  ) : filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center text-[#705C53]">
                      <img
                        src="/img/products-empty.svg" 
                        alt="No products found"
                        className="w-96 h-96 mb-6"
                      />
                      <h3 className="text-2xl font-semibold">No products found</h3>
                      <p className="mt-1 text-lg">Try adjusting your filters or come back later.</p>
                    </div>
                  ) :   
                  (<ProductItem products={filteredProducts} />)}
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </section>
    </>
  )
};
