import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUploader from "../ImageUploader/ImageUploader";

const ProductForm = ({ onSubmit }: { onSubmit: (formData: any) => void }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    productCode: "",
    price: "",
    category: "",
    status: "draft",
    images: [] as File[],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (files: File[]) => {
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Product Name</label>
            <input
              type="text"
              name="name"
              className="input-field"
              placeholder="Enter Product Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm">Price</label>
            <input
              type="number"
              name="price"
              className="input-field"
              placeholder="Enter Price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm">Category</label>
            <select
              name="category"
              className="input-field"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories.map((category: any) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm">Status</label>
            <select
              name="status"
              className="input-field"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <ImageUploader onImagesChange={handleImagesChange} />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button type="submit" className="btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
