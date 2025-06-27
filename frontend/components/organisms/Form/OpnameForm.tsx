"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { showConfirmationAlert } from "@/components/Atoms/AlertConfirmation";

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
  const [selectedProductId, setSelectedProductId] = useState(initialData?.productId || "");

  // new
  const [queryProduct, setQueryProduct] = useState<string>('');
  const [suggestionsProduct, setSuggestionProduct] = useState([]);
  // const [selectedProduct, setSelectedProdudct] = useState('');
  const [physicalStock, setPhysicalStock] = useState('');
  const [recordedStock, setRecordedStock] = useState('');
  const [notes, setNotes] = useState<string>("");

  // state open modal 
  const [isOpenCloseModalConfirmation, setIsOpenCloseModalConfirmation] = useState<boolean>(false);
  const [submitEvent, setSubmitEvent] = useState<FormEvent | null>(null); // Simpan event

  useEffect(() => {
    if (isEdit && initialData) {

      setGenerateOpnameId(initialData.opnameId || "");
      setSelectedProductId(initialData.productId || "");
      setQueryProduct(initialData.productName || "");
      setRecordedStock(initialData.recordedStock?.toString() || "");
      setPhysicalStock(initialData.physicalStock?.toString() || "");
      setNotes(initialData.note || "");
    } else {
      functionGenerateOpnameId();
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
  const handleIsOpenCloseModalConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitEvent(e);
    
    const isConfirmed = await showConfirmationAlert({
      title: "Confirmation",
      text: isEdit
      ? "Are you sure you want to edit stock of this product?"
      : "Are you sure you want to add stock of this product?",
      icon: "question",
    });
        
    if (isConfirmed) {
      handleSubmit(e);
    }
  }

  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      opnameId: generatedOpnameId,
      productId: selectedProductId,
      recordedStock: Number(recordedStock),
      physicalStock: Number(physicalStock),
      note: notes,
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
        <div className="flex flex-col py-8 pt-8 mb-12 px-8">
          <h4 className="flex text-2xl font-semibold text-[#493628]">
            {isEdit ? `Edit Opname ${generatedOpnameId}` : 'Add Data Opname'}
          </h4>
          <p className="mb-4 text-lg text-[#493628]">
            Fill in the information below to add a new opname.
          </p>
          <div className="grid grid-rows-1 gap-4">

            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Opname Id */}
              <div className="w-full">
                <p className="block mb-2 font-semibold text-base text-[#493628]">Opname Id</p>
                <p className="text-gray-500 text-sm truncate">{generatedOpnameId || `Please Choose Category first`}</p>
                <input type="hidden" name='opnameId' value={generatedOpnameId} />
              </div>

              {/* Quantity */}
              <div className="w-full max-w-24">
                <label className="block mb-2 text-base font-semibold text-[#493628]">Stock Fisik</label>
                <input
                  type="number"
                  className="w-full h-10 bg-transparent placeholder:text-gray-500 text-[#493628] text-sm border rounded-lg px-3 focus:border-[#493628]"
                  placeholder="0"
                  min="0"
                  value={physicalStock}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setPhysicalStock(value);
                    }
                  }}
                />
              </div>

              {/* Product Name */}
              <div className="w-full relative">
                <label className="block mb-2 text-base font-semibold text-[#493628]">Product Name</label>
                <input
                  type="text"
                  className="w-full h-10 bg-transparent placeholder:text-gray-500 text-[#493628] text-sm border rounded-lg px-3 focus:border-[#493628]"
                  placeholder="Search Product"
                  value={queryProduct}
                  onChange={(e) => {
                    setQueryProduct(e.target.value);
                    setSelectedProductId('');
                  }}
                />
                {suggestionsProduct.length > 0 && (
                  <ul className="absolute bg-white border w-full mt-1 max-h-48 overflow-auto z-10 shadow rounded">
                    {suggestionsProduct.map((product: any) => (
                      <li
                        key={product.productId}
                        onClick={() => {
                          setQueryProduct(product.name);
                          setSelectedProductId(product.productId); // untuk simpan ke form
                          setRecordedStock(product.quantity?.toString() || "0"); // asumsi product punya stock
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
                <label className="block mb-2 text-base font-semibold text-[#493628]">Stock</label>
                <input
                  type="number"
                  className="w-full h-10 bg-transparent placeholder:text-gray-500 text-[#493628] text-sm border rounded-lg px-3 focus:border-[#493628]"
                  placeholder="0"
                  min="0"
                  value={recordedStock}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setRecordedStock(value);
                    }
                  }}
                  readOnly
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-base font-semibold text-[#493628]">Notes</label>
                <input
                  // rows={4}
                  className="w-full h-10 bg-transparent placeholder:text-gray-500 text-[#493628] text-sm border rounded-lg px-3 focus:border-[#493628]"
                  placeholder="Notes..."
                  value={notes}
                  onChange={(e) => { setNotes(e.target.value) }}
                />
                {/* </textarea> */}
              </div>
              <div className="w-full">
                <p className="block mb-2 font-semibold text-base text-[#493628]">Opname Date</p>
                <p className="text-gray-500 mt-3 text-sm truncate">
                  {new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                </p>
                {/* <input type="hidden" name="opnameDate" value={new Date().toISOString()} /> */}
              </div>

            </div>


          </div>


        </div>
        <div className="p-6 pl-8">
          <div className="right-0 content-end flex justify-start min-h-10">
            <button
              className="select-none !rounded-lg border-2 border-[#493628] px-4 text-center text-base font-semibold text-[#493628] transition-all hover:bg-[#493628] hover:text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => router.push('/admin/opname')}
            >
              Cancel
            </button>
            <span className="px-2"></span>
            <button
              className="select-none !rounded-lg bg-[#493628] px-4 text-center text-base font-semibold text-white transition-all hover:bg-[#705C53] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              onClick={handleIsOpenCloseModalConfirmation}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>

  );
};

export default OpnameForm;