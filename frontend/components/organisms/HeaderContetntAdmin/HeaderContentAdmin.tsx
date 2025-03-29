"use client";

import React, { useState } from "react";
import { Column } from "../Table/RenderCellComponent";

interface HeaderContentAdminProps<T> {
  header: string;
  subHeader: string;
  columns: Column<T>[]; 
  totalItems: number;
  onChangeDropDownSortBy: (value: string) => void;
  onChangeDropDownOrderBy: (value: string) => void;
  onChangeDropDownLimitData: (value: number) => void;
  onChangeSearchQuery: (value: string) => void;
  toAddPage: () => void;
  searchPlaceholder?: string; 
}

const HeaderContentAdmin = <T,>({
  header,
  subHeader,
  toAddPage,
  totalItems,
  columns,
  onChangeDropDownLimitData,
  onChangeDropDownSortBy,
  onChangeDropDownOrderBy,
  onChangeSearchQuery,
  searchPlaceholder = "Search...",
}: HeaderContentAdminProps<T>) => {
  const [selectedLimit, setSelectedLimit] = useState<number>(5);
  const [selectedSortBy, setSelectedSortBy] = useState<string>("no");
  const [selectedSortOrderBy, setSelectedSortOrderBy] = useState<string>("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSelectLimit = (value: number) => {
    setSelectedLimit(value);
    onChangeDropDownLimitData(value);
  };

  const handleSelectSortBy = (value: string) => {
    setSelectedSortBy(value);
    onChangeDropDownSortBy(value);
  };

  const handleSelectOrderBy = (value: string) => {
    setSelectedSortOrderBy(value);
    onChangeDropDownOrderBy(value);
  };

  const handleSearchQuery = (value: string) => {
    setSearchQuery(value);
    onChangeSearchQuery(value);
  };

  return (
    <div className="relative mx-0 mt-4 md:mx-4 text-gray-700">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h5 className="text-2xl font-semibold text-blue-gray-900">{header}</h5>
          <p className="mt-1 text-base text-gray-700">{subHeader}</p>
        </div>
        <button
          className="flex items-center gap-2 bg-gray-900 py-2 px-4 text-white text-xs font-bold uppercase rounded-lg shadow-md hover:shadow-lg"
          type="button"
          onClick={toAddPage}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
          </svg>
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 mt-3 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {/* Dropdown Show Data */}
        <div>
          <p className="text-xs text-gray-700">Show Data</p>
          <select
            className="w-full text-xs border rounded p-2 cursor-pointer"
            value={selectedLimit}
            onChange={(e) => handleSelectLimit(Number(e.target.value))}
          >
            {[5, 10, 20, totalItems].map((value) => (
              <option key={value} value={value}>
                {value === totalItems ? "All" : `${value} Data`}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Sort By */}
        <div>
          <p className="text-xs text-gray-700">Order By</p>
          <select
            className="w-full text-xs border rounded p-2 cursor-pointer"
            value={selectedSortBy}
            onChange={(e) => handleSelectSortBy(e.target.value)}
          >
            {columns.map((column) => (
              <option
                key={String(column.key)}
                value={String(column.key === "no" ? "createdAt" : column.key)}
                disabled={selectedSortBy === String(column.key === "no" ? "createdAt" : column.key)}
              >
                {column.label}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Order By */}
        <div>
          <p className="text-xs text-gray-700">Sort By</p>
          <select
            className="w-full text-xs border rounded p-2 cursor-pointer"
            value={selectedSortOrderBy}
            onChange={(e) => handleSelectOrderBy(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Search Input */}
        <div>
          <p className="text-xs text-gray-700">Search</p>
          <div className="relative">
            <input
              className="w-full pr-11 h-10 pl-3 text-sm border rounded focus:outline-none"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearchQuery(e.target.value)}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderContentAdmin;
