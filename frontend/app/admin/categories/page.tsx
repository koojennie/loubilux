"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from 'react-hot-toast'
import axios from "axios";
import HeaderContentAdmin from "@/components/organisms/HeaderContetntAdmin/HeaderContentAdmin";
import TableComponents from "@/components/organisms/Table/TableComponents";
import ModalViewDetails from "@/components/organisms/Modal/ModalViewDetail";
import ModalConfirmationDelete from "@/components/organisms/Modal/ModalConfirmationDelete";

export type Category = {
  _id: string;
  id: string;
  name: string;
  prefix: string;
  description: string;
}

const CategoriesPage = () => {
  const router = useRouter();

  const [category, setCategory] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalViewDetailOpen, setIsModalViewDetailOpen] = useState<boolean>(false);
  const [isModalConfirmationDeleteOpen, setIsModalConfirmationDeleteOpen] = useState<boolean>(false);
  const [selectedViewDetailCategory, setSelectedViewDetailCategory] = useState<Category | null>(null);
  const [selectedDeletedConfirmationCategory, setSelectedDeletedConfirmationCategory] = useState<Category | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");


  const fetchAllCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories??page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${orderBy}&searchQuery=${searchQuery}`);

      const result = response.data.data.map((category: any) => (
        {
          id: category._id,
          ...category
        }
      ))

      setCategory(result || []);
      setTotal(response.data.total);
    } catch (error) {
      console.error("error when fetch all categories");
    } finally {
      setIsLoading(false)
    }

  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const handleDeletedCategory = async (category: Category | null) => {
    if (!category) {
      toast.error("No Category selected for deletion");
      return;
    }

    try {

      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories/${category?._id}`,
        {
          withCredentials: true
        }
      );

      toast.success("Category deleted Successfully", { duration: 2000 });

      setTimeout(() => {
        setIsModalConfirmationDeleteOpen(false);
        fetchAllCategories();
      }, 1000);

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
      console.error('Error when submitting new category', error)
    }
  }


  // open & close Modal view detail
  const handleOpenCloseModalViewDetail = (category?: Category) => {
    setSelectedViewDetailCategory(category || null);
    setIsModalViewDetailOpen(!isModalViewDetailOpen);
  }

  // open & close Modal Close Confirmation
  const handleOpenCloseModalConfirmationDelete = (category?: Category) => {
    setSelectedDeletedConfirmationCategory(category || null);
    setIsModalConfirmationDeleteOpen(!isModalConfirmationDeleteOpen);
  }


  return (
    <>
      <div className="flex flex-col px-8 rounded-2xl shadow-xl bg-white shadow-gray-200">
        {/*Title */}
        <HeaderContentAdmin
          header="Category"
          subHeader="List of all Categories"
          labelAdd="Add Category"
          tableType="categories"
          columns={[
            { key: 'prefix', label: 'Prefix' },
            { key: "name", label: "Name" },
            { key: "description", label: "description" }
          ]}
          totalItems={total}
          onChangeDropDownLimitData={() => { }}
          onChangeDropDownOrderBy={() => { }}
          onChangeDropDownSortBy={() => { }}
          onChangeSearchQuery={() => { }}
          // backPage={() => { console.log("Back") }}
          toAddPage={() => router.push('/admin/categories/add')}
        />

        {!isLoading ? (
          <TableComponents
            data={category}
            columns={[
              { key: 'prefix', label: 'Prefix' },
              { key: "name", label: "Name" },
              { key: "description", label: "Description" }
            ]}
            onInfo={(id) => { handleOpenCloseModalViewDetail(category.find(category => category.id === id)) }}
            onEdit={() => { }}
            onDelete={(id) => { handleOpenCloseModalConfirmationDelete(category.find(category => category.id === id)) }}
            tableType="categories"
            page={page}
            limit={limit}
            totalItems={total}
            onPageChange={setPage}
          />
        ) : (<div>Loading...</div>)}

      </div>

      <ModalViewDetails
        isOpen={isModalViewDetailOpen}
        onClose={handleOpenCloseModalViewDetail}
        tableType="categories"
        data={selectedViewDetailCategory}
        columns={[
          { key: 'prefix', label: 'Prefix' },
          { key: "name", label: "Name" },
          { key: "description", label: "Description" }
        ]}
      />

      <ModalConfirmationDelete
        isOpen={isModalConfirmationDeleteOpen}
        onClose={handleOpenCloseModalConfirmationDelete}
        // onConfirm={() => handleDeleteProduct} 
        onConfirm={() => handleDeletedCategory(selectedDeletedConfirmationCategory)}
      />

      <Toaster />
    </>
  )
}

export default CategoriesPage;