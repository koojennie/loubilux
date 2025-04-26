"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import TableComponents from "@/components/organisms/Table/TableComponents";
import HeaderContentAdmin from "@/components/organisms/HeaderContetntAdmin/HeaderContentAdmin";
import ModalConfirmationDelete from "@/components/organisms/Modal/ModalConfirmationDelete";
import ModalViewDetails from "@/components/organisms/Modal/ModalViewDetail";

type Category = {
  _id: string;
  id: string;
  name: string;
  description: string;
}

export type Product = {
  _id: string;
  id: string;
  no: number;
  name: string;
  productCode: string;
  quantity: number;
  price: number;
  statusPublish: string;
  images: string[];
  description: string;
  category: Category;
}

type ProductsProps = {
  initialProducts: Product[];
}

const ProductPage = ({ initialProducts }: ProductsProps) => {

  const router = useRouter();

  const [products, setProducts] = useState<Product[]>(initialProducts);
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
        id: product._id,
        ...product,
        no: (page - 1) * limit + (index + 1),
        category: product.Category?.name || "N/A",
        image: product.image || "/icon/loubilux-logo.png",
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
      console.log("No product selected for deletion");
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
      <div className="flex flex-col px-8 rounded-2xl shadow-xl bg-white shadow-gray-200">
        {/*Title */}
        <HeaderContentAdmin
          header="Products"
          subHeader="List of all products"
          labelAdd="Add Product"
          tableType="products"
          columns={[
            { key: 'no', label: 'Number' },
            { key: 'productCode', label: 'Product Code' },
            { key: 'name', label: 'Name' },
            { key: 'quantity', label: 'Quantity' },
            { key: 'price', label: 'Price' },
            { key: 'statusPublish', label: 'Status' },
            { key: 'category', label: 'Category' },
          ]}
          totalItems={totalItems}
          onChangeDropDownLimitData={setLimit}
          onChangeDropDownOrderBy={setOrderBy}
          onChangeDropDownSortBy={setSortBy}
          onChangeSearchQuery={setSearchQuery}
          // backPage={() => { console.log("Back") }}
          toAddPage={() => router.push('/admin/products/add')}
        />

        {!isLoading ? (
          <TableComponents
            data={products}
            columns={[
              { key: 'no', label: 'Number' },
              { key: 'productCode', label: 'Product Code' },
              { key: 'name', label: 'Name' },
              { key: 'quantity', label: 'Quantity' },
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
          { key: 'productCode', label: 'Product Code' },
          { key: 'name', label: 'Name' },
          { key: 'quantity', label: 'Quantity' },
          { key: 'price', label: 'Price' },
          { key: 'statusPublish', label: 'Status' },
          { key: 'category', label: 'Category' },
        ]}
        ref={modalViewDetailRef}
      />

      <ModalConfirmationDelete
        isOpen={isModalConfirmationDeleteOpen}
        onClose={handleOpenCloseModalConfirmationDelete}
        // onConfirm={() => handleDeleteProduct} 
        onConfirm={() => handleDeleteProduct(selectedDeleteProduct)}
        ref={modalConfirmationDeleteRef}
      />

      <Toaster />
    </>
  );
};

export default ProductPage;
