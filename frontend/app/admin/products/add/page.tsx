'use client';

import React, { useState, useEffect, DragEvent } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import ModalConfirmation from "@/components/organisms/Modal/ModalConfirmation";


const AddProduct = () => {
  const router = useRouter();

  // category get
  const [categories, setCategories] = useState([]);
  
  // action & event
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // state form
  const [generatedProductCode, setGenerateProductCode] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [status, setStatus] = useState<string>("draft");


  // state for image
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  useEffect(() => {
    // Fetch kategori dari backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`);
        setCategories(response.data.data);
        console.log('ini adalah category', response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const openModalConfirmation = () => {
    setIsModalConfirmationOpen(true);
  }

  const closeModalConfirmation = () => {
    setIsModalConfirmationOpen(false);
  }

  const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId: string = e.target.value;
    setSelectedCategory(categoryId);

    if (!categoryId) {
      setGenerateProductCode("");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/count?categoryId=${categoryId}`
      );

      const { prefix, countProductByCategory } = response.data;

      // temporary generate product code
      const newProductCodeTemporary = String(countProductByCategory + 1).padStart(5, "0");
      setGenerateProductCode(`${prefix}-${newProductCodeTemporary}`);

    } catch (error) {
      console.error("Error fetching data product count : ", error);
    }
  }

  // image
  // ✅ Handle File Select
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    validateFile(file);
  };

  // ✅ Handle Drag & Drop
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    validateFile(file);
  };

  // ✅ Validasi File (Format & Ukuran)
  const validateFile = (file?: File) => {
    if (!file) return;

    // Validasi ukuran file (maks 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage("File size must be under 2MB");
      resetFile();
      return;
    }

    // Validasi format file (PNG, JPG, GIF)
    if (!["image/png", "image/jpeg", "image/gif"].includes(file.type)) {
      setErrorMessage("Only PNG, JPG, and GIF files are allowed");
      resetFile();
      return;
    }

    // Simpan preview dan file
    setImagePreview(URL.createObjectURL(file));
    setSelectedFile(file);
    setErrorMessage(null);
  };

  // ✅ Reset jika terjadi error
  const resetFile = () => {
    setImagePreview(null);
    setSelectedFile(null);
  };

  // ✅ Handle Submit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      setErrorMessage("Please upload an image before submitting");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      console.log(formData);

    } catch (error) {
      console.error("Upload error:", error);
      setErrorMessage("An error occurred while uploading");
    }
  };


  return (
    <div className="p-8 md:p-8 ">
      <div className="relative m-auto flex flex-col rounded-2xl bg-white bg-clip-border text-slate-700 shadow-lg">
        <form onSubmit={handleSubmit} action="">
          <div className="flex flex-col py-8 pt-8 mb-12 px-8 ">
            <h4
              className="flex text-lg mb-1 font-semibold text-slate-700">
              Add New Products
            </h4>
            <p className="mb-4 text-sm mt-1 text-slate-400">
              Fill in the information below to add a new product.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Code */}
                <div className="w-full">
                  <p className="block mb-2 font-semibold text-base text-slate-600">Product Code</p>
                  <p className="text-slate-500 text-sm truncate">{generatedProductCode || `Please Choose Category first`} </p>
                </div>

                {/* Quantity */}
                <div className="w-full max-w-24">
                  <label className="block mb-2 text-sm text-slate-700">Quantity</label>
                  <input
                    type="number"
                    className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                    placeholder="0"
                    min="0"
                  />
                </div>

                {/* Product Name */}
                <div className="w-full">
                  <label className="block mb-1 text-sm text-slate-700">Product Name</label>
                  <input
                    type="text"
                    className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                    placeholder="Enter Product Name"
                  />
                </div>

                {/* Amount */}
                <div className="w-full">
                  <label className="block mb-1 text-sm text-slate-700">Price</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full h-10 pl-12 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                      placeholder="Enter Price"
                      min='1'
                      step={'any'}
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="w-full">
                  <label className="block mb-1 text-sm text-slate-700">Category</label>
                  <select
                    className="w-full h-10 bg-transparent text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                    value={selectedCategory} 
                    onChange={handleCategoryChange}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories.map((category: any) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>


                {/* Status */}
                <div className="w-full">
                  <label className="block mb-1 text-sm text-slate-700">Status Publish</label>
                  <select className="w-full h-10 bg-transparent text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400">
                    <option value={'draft'}>Draft</option>
                    <option value={'active'}>Active</option>
                  </select>
                </div>
              </div>

              {/* Kolom Kanan - Preview Image */}
              <div className="col-span-1">
                <label className="block mb-1 text-sm text-slate-700">Preview Image</label>
                <div className="flex justify-center mb-4">
                  {imagePreview ? (
                    <Image src={imagePreview} width={300} height={300} alt="Preview Image" />
                  ) : (
                    <p className="text-gray-500">No Preview Image</p>
                  )}
                </div>

                {/* Upload Box (Klik & Drag and Drop) */}
                <div
                  className={`mt-2 flex justify-center p-4 border-2 border-gray-300 border-dashed rounded-md ${isDragging ? "bg-gray-200 border-blue-500" : ""
                    }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <label className="cursor-pointer text-indigo-600 hover:text-indigo-500">
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/png, image/jpeg, image/gif"
                      onChange={handleFileChange}
                    />
                    <div className="text-center">
                      <svg className="mx-auto h-10 w-10 text-black" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-sm text-black">Drag and drop or click to upload</p>
                      <p className="text-xs text-black">PNG, JPG, GIF up to 2MB</p>
                    </div>
                  </label>
                </div>

                {/* Error Message */}
                {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

              </div>
            </div>


          </div>
          <div className="p-6 pl-12">
            <div className="right-0 content-end">
              <button
                className="mx-auto select-none rounded border border-red-600 py-2 px-4 text-center text-sm font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-600/20 active:bg-red-700 active:text-white active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => router.push('/admin/products')}
              >
                Cancel
              </button>
              <span className="px-2"></span>
              <button
                className=" mx-auto select-none rounded bg-slate-800 py-2 px-4 text-center text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={openModalConfirmation}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <ModalConfirmation
        isOpen={isModalConfirmationOpen}
        onClose={closeModalConfirmation}
        onConfirm={closeModalConfirmation}
        textModal="Are you sure you want edit this product?"
      />
    </div>
  )
}

export default AddProduct;