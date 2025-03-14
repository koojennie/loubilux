"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ModalConfirmationDelete from "@/components/organisms/Modal/ModalConfirmationDelete";
import TableComponents from "@/components/organisms/Table/TableComponents";
import HeaderContentAdmin from "@/components/organisms/HeaderContetntAdmin/HeaderContentAdmin";

type Category = {
  id: string;
  name: string;
  description: string;
}

type Product = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  status: string;
  image: string;
  category: Category;
  no: number;
}

type ProductsProps = {
  initialProducts: Product[];
}

const ProductPage = ({initialProducts} : ProductsProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [isModalConfirmationDeleteOpen, setIsModalConfirmationDeleteOpen] = useState<boolean>(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
  


  // fetch ulang data setelah halaman dimuat (CSR)
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products`);
        const results = await response.json();
        results.data = results.data.map((product: any, index: number) => ({
          id: product._id,
          ...product,
          no: index + 1,
          category: product.category?.name || " ", 
          image: product.image || "/icon/loubilux-logo.png",
        }));
        setProducts(results.data);
        console.log("Products", results.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const openModalConfirmationDelete = () => {
    setIsModalConfirmationDeleteOpen(true);
  };

  const closeModalConfirmationDelete = () => {
    setIsModalConfirmationDeleteOpen(false);
  };

  const openModalEdit = () => {
    setIsModalEditOpen(true);
  }

  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  }

  const router = useRouter();

  const handleToPageEdit = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push('/admin/products/1/edit');
    }, 0);
  }


  return (
    
    <>

      <div className="flex flex-col px-8 rounded-2xl shadow-xl bg-gray-50 shadow-gray-200">
        {/*Title */}
        <HeaderContentAdmin
          header="Products"
          subHeader="List of all products"
          backPage={openModalEdit}
        />

        <TableComponents
          data={products}
          columns = {[
          { key: 'no', label: 'Number' },
          { key: 'image', label: 'Image' },
          { key: 'name', label: 'Name' },
          { key: 'quantity', label: 'Quantity' },
          { key: 'price', label: 'Price' },
          { key: 'status', label: 'Status' },
          { key: 'category', label: 'Category' },
        ]}
          toPageEdit={handleToPageEdit}
          onDelete={openModalConfirmationDelete}
          tableType="product"
        /> 
      </div>

      <ModalConfirmationDelete
        isOpen={isModalConfirmationDeleteOpen}
        onClose={closeModalConfirmationDelete}
        onConfirm={closeModalConfirmationDelete} />
    </>
  );
};

export default ProductPage;
