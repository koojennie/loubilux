"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TableComponents from "@/components/organisms/Table/TableComponents";
import HeaderContentAdmin from "@/components/organisms/HeaderContetntAdmin/HeaderContentAdmin";
import ModalConfirmationDelete from "@/components/organisms/Modal/ModalConfirmationDelete";
import ModalViewDetails from "@/components/organisms/Modal/ModalViewDetails";

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
  statusPublish: string;
  image: string;
  category: Category;
  no: number;
}

type ProductsProps = {
  initialProducts: Product[];
}

const ProductPage = ({ initialProducts }: ProductsProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isModalConfirmationDeleteOpen, setIsModalConfirmationDeleteOpen] = useState<boolean>(false);
  const [isModalViewDetailOpen, setIsModalViewDetailOpen] = useState<boolean>(false);

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

  const openCloseModalViewDetail = (product?: Product) => {
    setSelectedProduct(product || null);
    setIsModalViewDetailOpen(!isModalViewDetailOpen);
  }

  const router = useRouter();

  const handleToPageEdit = () => {

  }

  return (
    <>
      <div className="flex flex-col px-8 rounded-2xl shadow-xl bg-white shadow-gray-200">
        {/*Title */}
        <HeaderContentAdmin
          header="Products"
          subHeader="List of all products"
          backPage={() => { console.log("Back") }}
        />

        {!isLoading ? (
        <TableComponents
          data={products}
          columns={[
            { key: 'no', label: 'Number' },
            { key: 'image', label: 'Image' },
            { key: 'name', label: 'Name' },
            { key: 'quantity', label: 'Quantity' },
            { key: 'price', label: 'Price' },
            { key: 'statusPublish', label: 'Status' },
            { key: 'category', label: 'Category' },
          ]}
          onInfo={(id) => openCloseModalViewDetail(products.find(product => product.id === id))}
          onEdit={handleToPageEdit}
          onDelete={openModalConfirmationDelete}
          tableType="products"
        />
        ): (<div>Loading...</div>)}


        {/* <TableComponents
          data={[
            { id: 1, name: 'Laptop ASUS', price: 8000000, image: '/laptop.jpg' },
            { id: 2, name: 'iPhone 13', price: 12000000, image: '/iphone.jpg' },
          ]}
          columns={[
            { key: 'name', label: 'Product Name' },
            { key: 'price', label: 'Price' },
            { key: 'image', label: 'Image' },
          ]}
          tableType="product"
          onInfo={(id) => console.log("Info", id)}
          onEdit={(id) => console.log("Edit", id)}
          onDelete={(id) => console.log("Delete", id)}
        /> */}

      </div>

      <ModalViewDetails
        isOpen={isModalViewDetailOpen}
        onClose={openCloseModalViewDetail}
        data={selectedProduct}
      />

      <ModalConfirmationDelete
        isOpen={isModalConfirmationDeleteOpen}
        onClose={closeModalConfirmationDelete}
        onConfirm={closeModalConfirmationDelete} />
    </>
  );
};

export default ProductPage;
