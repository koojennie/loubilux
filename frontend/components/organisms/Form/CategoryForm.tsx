"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { showConfirmationAlert } from "@/components/Atoms/AlertConfirmation";

interface CategoryFormProps {
  onSubmit?: (formData: any) => void;
  onEditSubmit?: (formData: any) => void;
  isEdit?: boolean;
  initialData?: any;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, onEditSubmit, isEdit = false, initialData }) => {
  const router = useRouter();

  // state form
  const [categoryName, setCategoryName] = useState(initialData?.name || "");
  const [prefixName, setPrefixName] = useState(initialData?.prefix || "");
  const [descriptionCategory, setDescriptionCategory] = useState(initialData?.description || "");

  // state open modal 
  const [isOpenCloseModalConfirmation, setIsOpenCloseModalConfirmation] = useState<boolean>(false);
  const [submitEvent, setSubmitEvent] = useState<FormEvent | null>(null); // Simpan event


  useEffect(() => {
    if (isEdit && initialData) {
      setCategoryName(initialData.name || "");
      setPrefixName(initialData.prefix || "");
      setDescriptionCategory(initialData.description || "");
    }

  }, [initialData, isEdit]);

  // Handle Open & Close Modal Confirmation
  const handleIsOpenCloseModalConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitEvent(e);

    const isConfirmed = await showConfirmationAlert({
      title: "Confirmation",
      text: isEdit
        ? "Are you sure you want to edit this category?"
        : "Are you sure you want to add this category?",
      icon: "question",
    });

    if (isConfirmed) {
      handleSubmit(e);
    }
  };

  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      categoryId: prefixName,
      name: categoryName,
      prefix: prefixName,
      description: descriptionCategory,
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
          <h4 className="flex text-2xl font-semibold text-[#493628]">
            {isEdit ? "Edit Category" : "Add New Category"}
          </h4>
          <p className="mb-4 text-lg text-[#493628]">
            Fill in the information below for category.
          </p>


          <div className="grid grid-cols-1 gap-4">

            {/* prefix */}
            <div className="w-full max-w-28">
              <label className="block mb-2 text-base font-semibold text-[#493628]">Prefix Name</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full h-10 bg-transparent placeholder:text-gray-500 text-[#493628] text-sm border rounded-lg px-3 focus:border-[#493628]"
                  placeholder="BG"
                  value={prefixName}
                  onChange={(e) => { setPrefixName(e.target.value) }
                  }
                />
              </div>
            </div>

            {/* Product Name */}
            <div className="w-full max-w-xl">
              <label className="block mb-1 text-base font-semibold text-[#493628]">Category Name</label>
              <input
                type="text"
                className="w-full h-10 bg-transparent placeholder:text-gray-500 text-[#493628] text-sm border rounded-lg px-3 focus:border-[#493628]"
                placeholder="Bag..."
                value={categoryName}
                onChange={(e) => { setCategoryName(e.target.value) }
                }
              />
            </div>



            {/* description */}
            <div className="w-full">
              <label className="block mb-1 text-base font-semibold text-[#493628]">Description</label>
              <textarea
                rows={4}
                className="bg-transparent placeholder:text-gray-500 border text-[#493628] text-sm rounded-lg focus:border-[#493628] block w-full p-3"
                placeholder="Leave a description for this category..."
                value={descriptionCategory}
                onChange={(e) => { setDescriptionCategory(e.target.value) }
                }
              >
              </textarea>

            </div>
          </div>
        </div>
        <div className="p-6 pl-8">
          <div className="right-0 content-end flex justify-start min-h-10">
            <button
              className="select-none rounded border-2 border-[#493628] px-4 text-center text-base font-semibold text-[#493628] transition-all hover:bg-[#493628] hover:text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => router.push('/admin/categories')}
            >
              Cancel
            </button>
            <span className="px-2"></span>
            <button
              className="select-none rounded bg-[#493628] px-4 text-center text-base font-semibold text-white transition-all hover:bg-[#705C53] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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

export default CategoryForm;