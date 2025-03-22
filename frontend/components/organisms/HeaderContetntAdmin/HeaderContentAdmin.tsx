"use client";

import React, { useState } from 'react';
import { Column } from '../Table/RenderCellComponent'
import {Product} from '../../../app/admin/products/page'

interface HeaderContentAdminProps {
  header: string;
  subHeader: string;
  columns: Column<Product>[]
  totalItems: number;
  onChangeDropDownSortBy: (value:string) => void;
  onChangeDropDownOrderBy: (value:string) => void;
  onChangeDropDownLimitData: (value: number) => void;
  onChangeSearchQuery: (value:string) => void;
  toAddPage: () => void;
  backPage: () => void;
}

const HeaderContentAdmin = ({ header, subHeader, toAddPage, totalItems, columns, onChangeDropDownLimitData, onChangeDropDownSortBy, onChangeDropDownOrderBy, onChangeSearchQuery}: HeaderContentAdminProps) => {

  const [selectedLimit, setSelectedLimit] = useState<number>(5);
  const [selectedSortBy, setSelectedSortBy] = useState<string>('no');
  const [selectedSortOrderBy, setSelectedSortOrderBy] = useState<string>('asc');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
  }

  const handleSearchQuery = (value: string) => {
    setSearchQuery(value);
    onChangeSearchQuery(value);
  }

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
      <div className="flex flex-col items-center justify-between mb-3 gap-4 md:flex-row">

        {/* Dropdown show data */}
        <div className="block w-full overflow-hidden md:w-max">
          <p className="block mt-2 font-sans text-xs antialiased font-normal leading-relaxed text-gray-700">
            Show Data
          </p>
          <div className="relative">
            <select
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-xs border border-slate-200 rounded pl-3 pr-6 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              value={selectedLimit}
              onChange={(e) => handleSelectLimit(Number(e.target.value))}
            >
              {[5, 10, 20, totalItems].map((value) => (
                <option key={value} value={value}>
                  {value === totalItems ? "All" : `${value} Data`}
                </option>
              ))}
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2 right-2 text-slate-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </div>


        </div>
         {/* Dropdown Sort By */}
         <div className="block w-full md:w-max">
          <p className="mt-2 text-xs text-gray-700">Order By</p>
          <div className="relative">
            <select
              className="w-full text-xs border rounded pl-2 py-2 focus:outline-none cursor-pointer"
              value={selectedSortBy}
              onChange={(e) => handleSelectSortBy(e.target.value)}
            >
              {columns.map((column) => (
              <option
                key={String(column.key)}
                value={String(column.key === 'no' ? 'createdAt' : column.key)}
                disabled={selectedSortBy === String(column.key === 'no' ? 'createdAt' : column.key)}
              >
                {column.label}
              </option>
              ))}
            </select>
          </div>
        </div>

        {/* DropDown Order By*/}
        <div className="block w-full md:w-max">
          <p className="mt-2 text-xs text-gray-700">Sort By</p>
          <div className="relative">
            <select
              className="w-full text-xs border rounded pl-2 py-2 focus:outline-none cursor-pointer"
              value={selectedSortOrderBy}
              onChange={(e) => handleSelectOrderBy(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
              
            </select>
          </div>
        </div>
        
        <div className="block min-w-[100px] md:min-w-[400px]"></div>

        <div className="w-full md:w-72">
          <div className="ml-3">
            <div className="w-full max-w-sm min-w-[150px] relative">
              <input
                className="w-full pr-11 h-10 pl-3 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                placeholder="Search for products name..."
                value={searchQuery}
                onChange={(e) => handleSearchQuery(e.target.value)}
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