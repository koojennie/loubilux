'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import ProductForm from "@/components/organisms/Form/ProductForm";
import { Product } from "@/types/type";
import toast, { Toaster } from "react-hot-toast";

const EditProduct = () => {

  const router = useRouter();
  const paramsProductId = useParams<{ id: string }>().id;

  const [product, setProduct] = useState<Product>();

  const fetchProduct = async () => {
    try {
      const fetchProduct = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${paramsProductId}`);
      const product = fetchProduct.data.data;

      // Format objek produk
      const formattedProduct = {
        ...product,
        // category: product.Category?.name || 'N/A',
      };
      
      setProduct(formattedProduct);
    } catch (error) {
      console.error('Error fetching product', error);
    }
  }


  useEffect(() => {
    fetchProduct()
  }, []);


  // handle edit product
  const handleEditProduct = async (formData: any) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/edit/${paramsProductId}`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Product update successfully");

        router.push("/admin/products");
      } else {
        toast.error(response.data.message || "Failed to add product!");
      }
    } catch (error) {
      console.error('Error when submitting new product', error);
    }
  }

  return (
      <div className="relative mx-3 my-2 m-auto flex flex-col rounded-2xl bg-white bg-clip-border text-[#493628]">
        <ProductForm onEditSubmit={handleEditProduct} isEdit={true} initialData={product} />
        <Toaster />
      </div>
  )
}

export default EditProduct;