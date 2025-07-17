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
import { Product } from "@/types/type"



function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function CatalogPage() {
  const sortOptions = [
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
  ];

  const [filters, setFilters] = useState([
    {
      id: 'category',
      name: 'Category',
      options: [],
    },
    {
      id: 'price',
      name: 'Price',
      options: [
        { value: 'under-250k', label: 'Under IDR 250K' },
        { value: '250k-500k', label: 'IDR 250K – 500K' },
        { value: '500k-1m', label: 'IDR 500K – 1M' },
        { value: '1m-2m', label: 'IDR 1M – 2.5M' },
        { value: 'over-2m', label: 'Over IDR 2.5M' },
      ],
    },
  ]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: new Set<string>(),
    price: '', // 👈 single value instead of Set
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('Newest');

  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data: results } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/catalog`,
        );
        results.data = results.data.map((product: any) => ({
          id: product.productId,
          ...product,
          category: product.Category?.name || 'N/A',
        }));
        setProducts(results.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
      setIsLoading(false);
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`,
        );
        const categoryOptions = data.data.map((cat: any) => ({
          value: cat.name,
          label: cat.name,
        }));
        setFilters(prev =>
          prev.map(f => (f.id === 'category' ? { ...f, options: categoryOptions } : f)),
        );
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = useMemo(() => {
    const selectedCategories = selectedFilters.category;
    const selectedPrice = selectedFilters.price;

    let result = [...products];

  
    if (selectedCategories.size) {
      result = result.filter(p =>
        selectedCategories.has(
          typeof p.category === 'string' ? p.category : p.category?.name ?? '',
        ),
      );
    }

    if (selectedPrice) {
      result = result.filter(p => {
        const price = p.price;
        switch (selectedPrice) {
          case 'under-250k':
            return price < 250_000;
          case '250k-500k':
            return price >= 250_000 && price <= 500_000;
          case '500k-1m':
            return price > 500_000 && price <= 1_000_000;
          case '1m-2m':
            return price > 1_000_000 && price <= 2_500_000;
          case 'over-2m':
            return price > 2_500_000;
          default:
            return true;
        }
      });
    }

    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q),
      );
    }

    result.sort((a, b) => {
      switch (sortOption) {
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Newest':
          return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [products, selectedFilters, searchQuery, sortOption]);

  const renderFilterInput = (
    sectionId: string,
    optionValue: string,
    checked: boolean,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isMobile: boolean,
  ) => (
    <input
      id={`${isMobile ? 'filter-mobile' : 'filter'}-${sectionId}-${optionValue}`}
      name={sectionId} // groups the price radios
      value={optionValue}
      type={sectionId === 'price' ? 'radio' : 'checkbox'} /* 👈 */
      checked={checked}
      onChange={handleChange}
      className="col-start-1 row-start-1 rounded-sm border border-gray-300 accent-[#493628] size-4"
    />
  );

  const onFilterChange = (
    sectionId: keyof typeof selectedFilters,
    optionValue: string,
    checked: boolean,
  ) => {
    if (sectionId === 'price') {
      setSelectedFilters(prev => ({ ...prev, price: optionValue })); // overwrite
    } else {
      setSelectedFilters(prev => {
        const newSet = new Set(prev.category);
        checked ? newSet.add(optionValue) : newSet.delete(optionValue);
        return { ...prev, category: newSet };
      });
    }
  };
  return (
    <>
      <Navbar activeMenu="catalog" />
      <section className="text-brown">
        <div className="bg-white">
          <Dialog
            open={mobileFiltersOpen}
            onClose={setMobileFiltersOpen}
            className="relative z-40 lg:hidden"
          >
            <DialogBackdrop className="fixed inset-0 bg-black/25" />
            <div className="fixed inset-0 z-40 flex">
              <DialogPanel className="relative ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                {/* header */}
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <HiOutlineXMark className="size-6" />
                    <span className="sr-only">Close menu</span>
                  </button>
                </div>

                {/* body */}
                <form className="mt-4 border-t border-gray-200">
                  {filters.map(section => (
                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-1">
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-1 py-3">
                          <span className="text-lg font-semibold text-[#493628]">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <HiPlus className="size-5 group-data-open:hidden" />
                            <HiMinus className="size-5 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel>
                        <div className="pb-3">
                          {section.options.map(option => {
                            const checked =
                              section.id === 'price'
                                ? selectedFilters.price === option.value
                                : selectedFilters.category.has(option.value);
                            return (
                              <div key={option.value} className="flex gap-3 items-center">
                                <div className="grid size-4 grid-cols-1">
                                  {renderFilterInput(
                                    section.id,
                                    option.value,
                                    checked,
                                    e =>
                                      onFilterChange(section.id as keyof typeof selectedFilters, option.value, (e as any).target.checked),
                                    true,
                                  )}
                                </div>
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${option.value}`}
                                  className="flex-1 text-lg text-[#493628]"
                                >
                                  {option.label}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          {/* ------------------------------ DESKTOP LAYOUT -------------- */}
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* header */}
            <div className="flex items-baseline justify-between border-b border-gray-200 pt-6 pb-6">
              <h1 className="text-4xl font-semibold text-gray-900">Products</h1>
              <div className="flex items-center">
                {/* search */}
                <div className="relative w-full pr-5">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border px-10 py-2 text-lg font-medium focus:outline-primary"
                    placeholder="Search here..."
                  />
                  <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-6" />
                </div>

                {/* sort */}
                <Menu as="div" className="relative inline-block text-left">
                  <MenuButton className="group inline-flex items-center text-lg font-medium text-gray-700">
                    Sort
                    <HiChevronDown className="mx-2 size-7 shrink-0 text-gray-400" />
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-lg bg-white shadow-lg">
                    <div className="py-1">
                      {sortOptions.map(option => (
                        <MenuItem key={option.name}>
                          <button
                            onClick={() => setSortOption(option.name)}
                            className={classNames(
                              sortOption === option.name ? 'text-[#493628] font-medium' : 'text-[#BFB29E] font-medium',
                              'block w-full px-4 py-2 text-left',
                            )}
                          >
                            {option.name}
                          </button>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                {/* funnel icon on mobile */}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                >
                  <HiFunnel className="size-5" />
                  <span className="sr-only">Filters</span>
                </button>
              </div>
            </div>

            {/* body */}
            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">Products</h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* ------ filters (desktop) ----------------------------- */}
                <form className="hidden lg:block">
                  {filters.map(section => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between py-1">
                          <span className="pl-2 text-lg font-semibold text-[#493628]">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <HiPlus className="size-5 group-data-open:hidden" />
                            <HiMinus className="size-5 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map(option => {
                            const checked =
                              section.id === 'price'
                                ? selectedFilters.price === option.value
                                : selectedFilters.category.has(option.value);
                            return (
                              <div key={option.value} className="flex items-center gap-3 pl-2">
                                <div className="grid size-4 grid-cols-1">
                                  {renderFilterInput(
                                    section.id,
                                    option.value,
                                    checked,
                                    e =>
                                      onFilterChange(section.id as keyof typeof selectedFilters, option.value, (e as any).target.checked),
                                    false,
                                  )}
                                </div>
                                <label
                                  htmlFor={`filter-${section.id}-${option.value}`}
                                  className="text-lg text-[#493628]"
                                >
                                  {option.label}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>

                {/* ------ product grid --------------------------------- */}
                <div className="lg:col-span-3">
                  {isLoading ? (
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                          <div className="aspect-[1/1] w-full rounded-xl bg-secondary bg-opacity-10 placeholder-glow">
                            <div className="h-full w-full rounded-xl placeholder" />
                          </div>
                          <p className="placeholder-wave">
                            <span className="placeholder col-6 rounded" />
                          </p>
                          <p className="placeholder-wave">
                            <span className="placeholder col-4 rounded" />
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center text-[#705C53]">
                      <img src="/img/products-empty.svg" alt="No products found" className="mb-6 h-96 w-96" />
                      <h3 className="text-2xl font-semibold">No products found</h3>
                      <p className="mt-1 text-lg">Try adjusting your filters or come back later.</p>
                    </div>
                  ) : (
                    <ProductItem products={filteredProducts} />
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </section>
    </>
  );
}

// -------------------------------------------------------------------------
// End of file
