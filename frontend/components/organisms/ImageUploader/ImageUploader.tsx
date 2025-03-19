import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ImageUploaderProps {
  images: string[]; // Base64 Array
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageUploader = ({ images, setImages }: ImageUploaderProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Fungsi konversi File ke Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  // Handle Upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const base64Images = await Promise.all(Array.from(files).map(convertToBase64));
      setImages((prev) => [...prev, ...base64Images]);

      if (selectedIndex === null) {
        setSelectedIndex(0);
      }
    }
  };

  // Hapus Gambar
  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    if (selectedIndex === index) {
      setSelectedIndex(updatedImages.length > 0 ? 0 : null);
    } else if (selectedIndex !== null && selectedIndex > index) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <div className="border rounded-md p-4">
      <div className="p-4">
        {/* Tampilan Gambar yang Dipilih */}
        {selectedIndex !== null && images.length > 0 && (
          <div className="mb-4 flex flex-col items-center">
            <img
              src={images[selectedIndex]} // Gunakan Base64
              alt="Selected"
              className="w-64 h-64 object-cover rounded-lg shadow"
            />
            <p className="text-sm text-gray-500 mt-2">Selected Image</p>
          </div>
        )}

        <div className="grid grid-cols-7 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative group w-24 h-24">
              {/* Gambar */}
              <img
                src={image} // Gunakan Base64
                alt={`Uploaded ${index}`}
                className="w-24 h-24 object-cover rounded-lg shadow transition"
              />

              {/* Radio Button Pilihan */}
              <input
                type="radio"
                name="selectedImage"
                className="absolute top-2 left-2 w-5 h-5 text-blue-700 bg-white border-2 border-blue-500 rounded-full opacity-100 cursor-pointer"
                checked={selectedIndex === index}
                onChange={() => setSelectedIndex(index)}
              />

              {/* Tombol Hapus */}
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 transition-opacity opacity-75 hover:opacity-100 hover:bg-red-700 shadow-md"
                onClick={() => removeImage(index)}
              >
                <IoMdClose className="w-5 h-5" />
              </button>
            </div>
          ))}

          {/* Tombol "+" untuk Menambah Gambar */}
          <label className="w-24 h-24 border-2 border-dashed flex items-center justify-center cursor-pointer rounded-lg text-gray-500 hover:bg-gray-100 transition">
            +
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
