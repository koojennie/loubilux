"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import TableComponents from "@/components/organisms/Table/TableComponents";
import HeaderContentAdmin from "@/components/organisms/HeaderContetntAdmin/HeaderContentAdmin";
import ModalConfirmationDelete from "@/components/organisms/Modal/ModalConfirmationDelete";
import ModalViewDetails from "@/components/organisms/Modal/ModalViewDetails";

type Category = {
  _id: string;
  id: string;
  name: string;
  description: string;
}

type Product = {
  _id: string;
  id: string;
  name: string;
  productCode: string;
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

  const router = useRouter();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedViewDetailProduct, setSelectedViewDetailProduct] = useState<Product | null>(null);
  const [selectedDeleteProduct, setSelectedDeleteProduct] = useState<Product | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  // const limit = 5;

  const [isModalConfirmationDeleteOpen, setIsModalConfirmationDeleteOpen] = useState<boolean>(false);
  const [isModalViewDetailOpen, setIsModalViewDetailOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');


  // const [itemsToShow, setItemsToShow] = useState(5);


  // fetch ulang data setelah halaman dimuat (CSR)
  useEffect(() => {
    
    fetchProducts();
    fetchToken();
  }, [page, limit]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products?page=${page}&limit=${limit}`);
      const results = await response.json();
      results.data = results.data.map((product: any, index: number) => ({
        id: product._id,
        ...product,
        no: (page - 1) * limit + (index + 1), 
        category: product.category?.name || " ",
        image: product.image || "/icon/loubilux-logo.png",
      }));
      setProducts(results.data);
      setTotalItems(results.total)
      console.log("Products", results.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
    setIsLoading(false);
  };

  const fetchToken = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`, {
        username: 'saniadmin1',
        password: 'saniadmin1.P'
      });
      const token = response.data.token;
      setToken(token);
      console.log('done get token', token);
      
    } catch (error) {
      console.error('Error fetching token', error);
    }
  };


  

  const handleDeleteProduct = async (product: Product | null) => {
  
     

    if (!product) {
      console.log("No product selected for deletion");  
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${product._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Deleted Sucessfully');

      fetchProducts();
      
      setIsModalConfirmationDeleteOpen(!isModalConfirmationDeleteOpen);
    } catch (error) {
      console.error('Error when deleting products ', error);
    } 
    
  };
  

  const handleOpenCloseModalConfirmationDelete = (product?:Product) => {
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
          onChangeDropDownShowLimitData={setLimit}
          backPage={() => { console.log("Back") }}
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
        ): (<div>Loading...</div>)}

      </div>

      <ModalViewDetails
        isOpen={isModalViewDetailOpen}
        onClose={handleOpenCloseModalViewDetail}
        data={selectedViewDetailProduct}
      />

      <ModalConfirmationDelete
        isOpen={isModalConfirmationDeleteOpen}
        onClose={handleOpenCloseModalConfirmationDelete}
        // onConfirm={() => handleDeleteProduct} 
        onConfirm={() => handleDeleteProduct(selectedDeleteProduct)} 
        />

        <Toaster />
    </>
  );
};

export default ProductPage;
