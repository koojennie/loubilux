"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ImageUploader from "../ImageUploader/ImageUploadersMulti";
import ModalConfirmation from "../Modal/ModalConfirmation";
import ModalConfirmationDelete from "../Modal/ModalConfirmationDelete";

interface ProductFormProps {
  onSubmit?: (formData: any) => void;
  onEditSubmit?: (formData: any) => void;
  isEdit?: boolean;
  initialData?: any;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, onEditSubmit ,isEdit = false, initialData }) => {
  const router = useRouter();

  // state Option Category
  const [optionCategories, setOptionCategories] = useState([]);
  
  // state form
  const [generatedProductCode, setGenerateProductCode] = useState(initialData?.productId || "");
  const [productName, setProductName] = useState(initialData?.name || "");
  const [selectedCategory, setSelectedCategory] = useState(initialData?.categoryId || "");
  const [quantity, setQuantity] = useState(initialData?.quantity?.toString() || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [displayPrice, setDisplayPrice] = useState(initialData?.price ? new Intl.NumberFormat("id-ID").format(initialData.price) : "");
  const [statusPublish, setStatusPublish] = useState(initialData?.statusPublish || "draft");
  const [descriptionProduct, setDescriptionProduct] = useState(initialData?.description || "");
  const [images, setImages] = useState(initialData?.images || []);
  
  const [deletedImages, setDeletedImages] = useState([]);

  // state open modal 
  const [isOpenCloseModalConfirmation, setIsOpenCloseModalConfirmation] = useState<boolean>(false);
  const [isOpenCloseModalDeleteConfirmation, setIsOpenCloseModalDeleteConfirmation] = useState<boolean>(false);
  const [submitEvent, setSubmitEvent] = useState<FormEvent | null>(null); // Simpan event

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`);
      // setOptionCategories(response.data.data);
      const result = response.data.data.map((category: any) => ({
        id: category.categoryId,
        ...category,
      }));
      setOptionCategories(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (isEdit && initialData) {
      
      setGenerateProductCode(initialData.productCode || initialData.productId || "");
      setProductName(initialData.name || "");
      setSelectedCategory(initialData.categoryId || "");
      setQuantity(initialData.quantity?.toString() || "");
      setPrice(initialData.price?.toString() || "");
      setDisplayPrice(initialData.price ? new Intl.NumberFormat("id-ID").format(initialData.price) : "");
      setStatusPublish(initialData.statusPublish || "draft");
      setDescriptionProduct(initialData.description || "");
      setImages(initialData.images || []);
      // setDeletedImages(initialData.images || []);;
      
    }
    fetchCategories();
  }, [initialData, isEdit]);

  // Handle Open & Close Modal Confirmation
  const handleIsOpenCloseModalConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitEvent(e);
    setIsOpenCloseModalConfirmation(true);
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

      const { prefix, paddedNumber } = response.data;

      // temporary generate product code
      const newProductCodeTemporary = String(paddedNumber).padStart(5, "0");
      setGenerateProductCode(`${prefix}-${newProductCodeTemporary}`);

    } catch (error) {
      console.error("Error fetching data product count : ", error);
    }
  }

  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newImages: string[] = [];
    const oldImagesStillExists: string[] = [];

    const base64Pattern = /^data:image\/(png|jpeg|jpg|gif);base64,/;

    images.forEach((image: string, index: number) => {
      if (base64Pattern.test(image)) {
        newImages.push(image);
      } else {
        oldImagesStillExists.push(image);
      }
    });
    
    const imagesToDelete = initialData?.images?.filter(
      (image: string) => !newImages.includes(image) && !oldImagesStillExists.includes(image)
    );
    setDeletedImages(imagesToDelete);

    const formData = {
      productCode: generatedProductCode,
      name: productName,
      category: selectedCategory,
      description: descriptionProduct,
      statusPublish,
      quantity: Number(quantity),
      price: Number(price),
      newImages: newImages,
      oldImagesStillExists: oldImagesStillExists,
      deletedImages: imagesToDelete,
    };

    if (isEdit && onEditSubmit) {
      onEditSubmit(formData); 
    } else if (!isEdit && onSubmit) {
      onSubmit(formData); 
    }

    // onSubmit(formData);
    setIsOpenCloseModalConfirmation(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <div className="flex flex-col py-8 pt-8 mb-12 px-8 ">
          <h4 className="flex text-lg mb-1 font-semibold text-slate-700">
            {isEdit ? `Edit Product ${generatedProductCode}`: 'Add New Product'}
          </h4>
          <p className="mb-4 text-sm mt-1 text-slate-400">
            Fill in the information below to add a new product.
          </p>
          <div className="grid grid-rows-1 gap-4">

            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Code */}
              <div className="w-full">
                <p className="block mb-2 font-semibold text-base text-slate-600">Product Code</p>
                <p className="text-slate-500 text-sm truncate">{generatedProductCode || `Please Choose Category first`}</p>
                <input type="hidden" name='productCode' value={generatedProductCode} />
              </div>

              {/* Quantity */}
              <div className="w-full max-w-24">
                <label className="block mb-2 text-sm text-slate-700">Quantity</label>
                <input
                  type="number"
                  className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                  placeholder="0"
                  min="0"
                  value={quantity}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setQuantity(value);
                    }
                  }}
                />
              </div>

              {/* Product Name */}
              <div className="w-full">
                <label className="block mb-1 text-sm text-slate-700">Product Name</label>
                <input
                  type="text"
                  className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                  placeholder="Enter Product Name"
                  value={productName}
                  onChange={(e) => { setProductName(e.target.value) }
                  }
                />
              </div>

              {/* Amount */}
              <div className="w-full">
                <label className="block mb-1 text-sm text-slate-700">Price</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full h-10 pl-12 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                    placeholder="Enter Price"
                    min='1'
                    step={'any'}
                    value={displayPrice}
                    onChange={(e) => {
                      // const value = e.target.value;
                      const value = e.target.value.replace(/\D/g, "");
                      setPrice(value);
                      setDisplayPrice(value
                        ? new Intl.NumberFormat("id-ID").format(Number(value))
                        : "");
                      if (/^\d*$/.test(value)) {
                      }
                    }}
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
                  {optionCategories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="w-full">
                <label className="block mb-1 text-sm text-slate-700">Status Publish</label>
                <select className="w-full h-10 bg-transparent text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                  value={statusPublish}
                  onChange={(e) => { setStatusPublish(e.target.value) }}
                >
                  <option value={'draft'}>Draft</option>
                  <option value={'active'}>Active</option>
                </select>
              </div>

              {/* description */}
              <div className="col-span-2 w-full">
                <label className="block mb-1 text-sm text-slate-700">Description</label>
                <textarea
                  rows={4}
                  className="bg-transparent border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                  placeholder="Leave a description product..."
                  value={descriptionProduct}
                  onChange={(e) => { setDescriptionProduct(e.target.value) }
                  }
                >
                </textarea>

              </div>
            </div>


            <div className="col-span-1">
              <label className="block mb-1 text-sm text-slate-700">Image</label>
              <ImageUploader images={images} setImages={setImages} />
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
              type="submit"
              onClick={handleIsOpenCloseModalConfirmation}
            >
              Save
            </button>
          </div>
        </div>
      </form>

      <ModalConfirmation
        isOpen={isOpenCloseModalConfirmation}
        onClose={() => setIsOpenCloseModalConfirmation(false)}
        onConfirm={() => handleSubmit(submitEvent!)}
        textModal="Are you sure add this product?"
      />

      {/* <ModalConfirmationDelete 
    isOpen={isOpenCloseModalDeleteConfirmation}
    onClose={()=> setIsOpenCloseModalDeleteConfirmation(false)}
    onConfirm={}
  /> */}
    </div>

  );
};

export default ProductForm;