"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ImageUploader from "../ImageUploader/ImageUploadersMulti";
import ModalConfirmation from "../Modal/ModalConfirmation";
import ModalConfirmationDelete from "../Modal/ModalConfirmationDelete";
import toast, { Toaster } from "react-hot-toast";

interface OpnameFormProps {
  onSubmit?: (formData: any) => void;
  onEditSubmit?: (formData: any) => void;
  isEdit?: boolean;
  initialData?: any;
}

const OpnameForm: React.FC<OpnameFormProps> = ({ onSubmit, onEditSubmit, isEdit = false, initialData }) => {
  const router = useRouter();

  // state form
  const [generatedOpnameId, setGenerateOpnameId] = useState(initialData?.opnameId || "");
  const [productId, setProductId] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  
  // new
  const [queryProduct, setQueryProdudct] = useState<string>('');
  const [suggestionsProduct, setSuggestionProduct] = useState([]);
  const [selectedProduct, setSelectedProdudct] = useState('');
  const [stockFisik, setStockFisik] = useState('');
  const [quantity, setQuantity] = useState(initialData?.quantity?.toString() || "");

  // state open modal 
  const [isOpenCloseModalConfirmation, setIsOpenCloseModalConfirmation] = useState<boolean>(false);
  const [isOpenCloseModalDeleteConfirmation, setIsOpenCloseModalDeleteConfirmation] = useState<boolean>(false);
  const [submitEvent, setSubmitEvent] = useState<FormEvent | null>(null); // Simpan event

  useEffect(() => {
    functionGenerateOpnameId();
    if (isEdit && initialData) {

      setGenerateOpnameId(initialData.opnameId || "");
      setProductId(initialData.productId || "");
      setQuantity(initialData.quantity?.toString() || "");
      setPrice(initialData.price?.toString() || "");
    }
  }, [initialData, isEdit]);

  useEffect(() => {
    if (queryProduct.length < 2) {
      setSuggestionProduct([]);
      return;
    }

    const debounce = setTimeout(async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products?searchQuery=${queryProduct}`);
        setSuggestionProduct(res.data.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [queryProduct]);

  console.log(suggestionsProduct);

  const functionGenerateOpnameId = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/opname/generateId`,
        { withCredentials: true }
      );

      setGenerateOpnameId(response.data.data);
    } catch (error) {
      toast.error(`Error When Generating OpnameId : ${error}`)
      console.error('Error when generating opnameId: ', error);
    }
  }

  // Handle Open & Close Modal Confirmation
  const handleIsOpenCloseModalConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitEvent(e);
    setIsOpenCloseModalConfirmation(true);
  }

  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // const formData = {
    //   productCode: generatedOpnameId,
    //   name: productName,
    //   quantity: Number(quantity),
    //   price: Number(price)
    // };

    // if (isEdit && onEditSubmit) {
    //   onEditSubmit(formData);
    // } else if (!isEdit && onSubmit) {
    //   onSubmit(formData);
    // }

    // onSubmit(formData);
    setIsOpenCloseModalConfirmation(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <div className="flex flex-col py-8 pt-8 mb-12 px-8 ">
          <h4 className="flex text-lg mb-1 font-semibold text-slate-700">
            {isEdit ? `Edit Opname ${generatedOpnameId}` : 'Add Data Opname'}
          </h4>
          <p className="mb-4 text-sm mt-1 text-slate-400">
            Fill in the information below to add a new opname.
          </p>
          <div className="grid grid-rows-1 gap-4">

            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Opname Id */}
              <div className="w-full">
                <p className="block mb-2 font-semibold text-base text-slate-600">Opname Id</p>
                <p className="text-slate-500 text-sm truncate">{generatedOpnameId || `Please Choose Category first`}</p>
                <input type="hidden" name='opnameId' value={generatedOpnameId} />
              </div>

              {/* Quantity */}
              <div className="w-full max-w-24">
                <label className="block mb-2 text-sm text-slate-700">Stock Fisik</label>
                <input
                  type="number"
                  className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                  placeholder="0"
                  min="0"
                  value={stockFisik}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setQuantity(value);
                    }
                  }}
                />
              </div>

              {/* Product Name */}
              <div className="w-full relative">
                <label className="block mb-1 text-sm text-slate-700">Product Name</label>
                <input
                  type="text"
                  className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                  placeholder="Search Product"
                  value={queryProduct}
                  onChange={(e) => {
                    setQueryProdudct(e.target.value);
                    setSelectedProdudct('');
                  }}
                />
                {suggestionsProduct.length > 0 && (
                  <ul className="absolute bg-white border w-full mt-1 max-h-48 overflow-auto z-10 shadow rounded">
                    {suggestionsProduct.map((product: any) => (
                      <li
                        key={product.productId}
                        onClick={() => {
                          setSelectedProdudct(product.name);
                          setQueryProdudct(product.name);
                          setProductId(product.productId); // untuk simpan ke form
                          setQuantity(product.quantity?.toString() || '0'); // asumsi product punya stock
                          setSuggestionProduct([]);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {product.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>


              {/* Stock */}
              <div className="w-full max-w-24">
                <label className="block mb-2 text-sm text-slate-700">Stock</label>
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

export default OpnameForm;