"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Product } from '@/types/type';
import toast, { Toaster } from "react-hot-toast";
import TableComponents from "@/components/organisms/Table/TableComponents";
import HeaderContentAdmin from "@/components/organisms/HeaderContetntAdmin/HeaderContentAdmin";
import ModalViewDetails from "@/components/organisms/Modal/ModalViewDetail";
import DeleteConfirmation from "@/components/Atoms/DeleteConfirmation";




const ProductPage = () => {
  
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedViewDetailProduct, setSelectedViewDetailProduct] = useState<Product | null>(null);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState<Product | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [orderBy, setOrderBy] = useState<string>('asc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalViewDetailOpen, setIsModalViewDetailOpen] = useState<boolean>(false);
  const [isModalConfirmationDeleteOpen, setIsModalConfirmationDeleteOpen] = useState<boolean>(false);
  const modalViewDetailRef = useRef<HTMLDivElement>(null);
  const modalConfirmationDeleteRef = useRef<HTMLDivElement>(null);


  // const limit = 5;

  // const [itemsToShow, setItemsToShow] = useState(5);
  useEffect(() => {
    fetchProducts();
  }, [page, limit, sortBy, orderBy, searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalViewDetailRef.current && !modalViewDetailRef.current.contains(event.target as Node)) {
        setIsModalViewDetailOpen(false);
      } else if (modalConfirmationDeleteRef.current && !modalConfirmationDeleteRef.current.contains(event.target as Node)) {
        setIsModalConfirmationDeleteOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isModalViewDetailOpen) {
          setIsModalViewDetailOpen(false);
        } else if (isModalConfirmationDeleteOpen) {
          setIsModalConfirmationDeleteOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalViewDetailOpen, isModalConfirmationDeleteOpen]);
  // }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${orderBy}&searchQuery=${searchQuery}`);
      const results = await response.json();
      results.data = results.data.map((product: any, index: number) => ({
        id: product.productId,
        ...product,
        no: (page - 1) * limit + (index + 1),
        category: product.Category?.name || "N/A",
      }));
      setProducts(results.data);
      setTotalItems(results.total);
    } catch (error) {
      console.error("Error fetching products", error);
    }
    setIsLoading(false);
  };

  const handleDeleteProduct = async (product: Product | null) => {
    if (!product) {
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${product.id}`,
        {
          withCredentials: true
        }
      );

      toast.success('Deleted Sucessfully');

      fetchProducts();

      setIsModalConfirmationDeleteOpen(!isModalConfirmationDeleteOpen);
    } catch (error) {
      console.error('Error when deleting products ', error);
    }

  };


  const handleOpenCloseModalConfirmationDelete = (product?: Product) => {
    setSelectedDeleteProduct(product || null);
    setIsModalConfirmationDeleteOpen(!isModalConfirmationDeleteOpen);
  };

  const handleOpenCloseModalViewDetail = (product?: Product) => {
    setSelectedViewDetailProduct(product || null);
    setIsModalViewDetailOpen(!isModalViewDetailOpen);
  }

  const handleToPageEdit = () => {

  }

  return (
    <>
      <div className="flex px-8 mx-3 my-2 flex-col rounded-2xl bg-white">
        {/*Title */}
        <HeaderContentAdmin
          header="Products"
          subHeader="List of all products"
          labelAdd="Add Product"
          tableType="products"
          columns={[
            // { key: 'no', label: 'Number' },
            { key: 'productId', label: 'Product Code' },
            { key: 'name', label: 'Name' },
            { key: 'quantity', label: 'Stock' },
            { key: 'price', label: 'Price' },
            { key: 'statusPublish', label: 'Status' },
            { key: 'categoryId', label: 'Category' },
          ]}
          totalItems={totalItems}
          onChangeDropDownLimitData={setLimit}
          onChangeDropDownOrderBy={setOrderBy}
          onChangeDropDownSortBy={setSortBy}
          onChangeSearchQuery={setSearchQuery}
          toAddPage={() => router.push('/admin/products/add')}
        />

        {!isLoading ? (
          <TableComponents
            data={products}
            columns={[
              // { key: 'no', label: 'Number' },  
              { key: 'productId', label: 'Product Code' },
              { key: 'name', label: 'Name' },
              { key: 'quantity', label: 'Stock' },
              { key: 'price', label: 'Price' },
              { key: 'statusPublish', label: 'Status' },
              { key: 'category', label: 'Category' },
            ]}
            onInfo={(id) => handleOpenCloseModalViewDetail(products.find(product => product.id === id))}
            onEdit={handleToPageEdit}
            onDelete={(id) => handleOpenCloseModalConfirmationDelete(products.find(product => product.id === id))}
            tableType="products"
            page={page}
            limit={limit}
            totalItems={totalItems}
            onPageChange={setPage}
          />
        ) : (<div>Loading...</div>)}

      </div>

      <ModalViewDetails
        isOpen={isModalViewDetailOpen}
        onClose={handleOpenCloseModalViewDetail}
        tableType="products"
        data={selectedViewDetailProduct}
        columns={[
          { key: 'productId', label: 'Product Code' },
          { key: 'name', label: 'Name' },
          { key: 'quantity', label: 'Stock' },
          { key: 'price', label: 'Price' },
          { key: 'statusPublish', label: 'Status' },
          { key: 'category', label: 'Category' },
        ]}
        ref={modalViewDetailRef}
      />

      <DeleteConfirmation
        isOpen={isModalConfirmationDeleteOpen}
        onClose={handleOpenCloseModalConfirmationDelete}
        // onConfirm={() => handleDeleteProduct} 
        onConfirm={() => handleDeleteProduct(selectedDeleteProduct)}
        title="Delete Product"
        message="Are you sure? This action cannot be undone."
      />

      <Toaster />
    </>
  );
};

export default ProductPage;
