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
          <h4 className="flex text-lg mb-1 font-semibold text-slate-700">
            {isEdit ? "Edit Category" : "Add New Category"}
          </h4>
          <p className="mb-4 text-sm mt-1 text-slate-400">
            Fill in the information below to add a new category.
          </p>


          <div className="grid grid-cols-1 gap-4">

            {/* prefix */}
            <div className="w-full max-w-28">
              <label className="block mb-1 text-sm text-slate-700">Prefix Name</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                  placeholder="BG"
                  value={prefixName}
                  onChange={(e) => { setPrefixName(e.target.value) }
                  }
                />
              </div>
            </div>

            {/* Product Name */}
            <div className="w-full max-w-xl">
              <label className="block mb-1 text-sm text-slate-700">Category Name</label>
              <input
                type="text"
                className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                placeholder="Bag..."
                value={categoryName}
                onChange={(e) => { setCategoryName(e.target.value) }
                }
              />
            </div>



            {/* description */}
            <div className="w-full">
              <label className="block mb-1 text-sm text-slate-700">Description</label>
              <textarea
                rows={4}
                className="bg-transparent border border-gray-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
                placeholder="Leave a description category..."
                value={descriptionCategory}
                onChange={(e) => { setDescriptionCategory(e.target.value) }
                }
              >
              </textarea>

            </div>
          </div>
        </div>
        <div className="p-6 pl-12">
          <div className="right-0 content-end">
            <button
              className="mx-auto select-none rounded border border-red-600 py-2 px-4 text-center text-sm font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-600/20 active:bg-red-700 active:text-white active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => router.push('/admin/categories')}
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
    </div>

  );
};

export default CategoryForm;