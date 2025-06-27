import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

interface ImageUploaderProps {
  images: string[]; // Base64 Array
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageUploadersMulti = ({ images, setImages }: ImageUploaderProps) => {
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
      const convertedImages = base64Images.map((base64Image, index) => ({
        original: files[index],
        base64: base64Image,
      }));
      setImages((prev) => [...prev, ...convertedImages.map(image => image.base64)]);

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
    <div className="border rounded-lg p-2">
      <div className="p-4">
        {/* Tampilan Gambar yang Dipilih */}
        {selectedIndex !== null && images.length > 0 && (
          <div className="mb-4 flex flex-col items-center">
            <img
              src={images[selectedIndex]} 
              alt="Selected"
              className="w-64 h-64 object-cover rounded-lg"
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
                className="w-24 h-24 object-cover border rounded-lg transition"
              />

              {/* Radio Button Pilihan */}
              <input
                type="radio"
                name="selectedImage"
                className="absolute top-2 left-2 w-4 h-4 !text-[#493628] bg-white border-2 !border-[#493628] rounded-full opacity-100 cursor-pointer"
                checked={selectedIndex === index}
                onChange={() => setSelectedIndex(index)}
              />

              {/* Tombol Hapus */}
              <IoMdClose
                type="button"
                className="absolute top-1 right-1 w-6 h-6 text-red-800 rounded-full hover:text-red-950"
                onClick={() => removeImage(index)}
              />
            </div>
          ))}

          {/* Tombol "+" untuk Menambah Gambar */}
          <label className="w-24 h-24 border-2 border-dashed flex items-center justify-center cursor-pointer rounded-lg text-gray-500 hover:bg-gray-100 transition">
            <HiPlus className="m-1" />
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

export default ImageUploadersMulti;
