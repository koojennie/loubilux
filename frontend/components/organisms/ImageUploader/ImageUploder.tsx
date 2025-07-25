import React, { useState } from "react";
import imageCompression from "browser-image-compression";

interface ImageUploaderProps {
  image: string; // Base64 string
  setImage: React.Dispatch<React.SetStateAction<string>>;
  isProfileAdmin?: boolean;
}

const ImageUploader = ({ image, setImage, isProfileAdmin }: ImageUploaderProps) => {

  // Function to convert File to Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  // Handle Upload with Compression
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB.");
      return;
    }

    try {
      const options = {
        maxSizeMB: 1, // Maksimal ukuran setelah dikompres
        maxWidthOrHeight: 1024, // Resolusi maksimal 1024px
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const base64Image = await convertToBase64(compressedFile);
      setImage(base64Image);
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  // Remove Image
  const removeImage = () => {
    setImage("");
  };

  if (isProfileAdmin) {
    return (
      // <div className="border rounded-md p-4">
      <div className="p-4">
        {/* Display Selected Image */}
        {image ? (
          <div className="mb-4 flex flex-col items-center">
            <img
              src={image}
              alt="Selected"
              className="w-[200px] h-[200px] object-cover rounded-full"
            // width={250}
            />
            <button
              type="button"
              className="mt-5 bg-[#493628] text-white font-medium text-base !rounded-lg px-4 py-2 transition-opacity hover:opacity-90 hover:bg-[#705C53]"
              onClick={removeImage}
            >
              Remove Image
            </button>
          </div>
        ) : (
          <div className="mb-4 flex flex-col items-center">
            <label className="w-32 h-32 border-2 flex items-center justify-center cursor-pointer rounded-full text-gray-500 hover:bg-gray-100 transition">
              <img src="/icon/upload.svg" width={250} alt="upload" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        )}
      </div>
      // </div>
    )
  } else {
    return (
      <div className="border rounded-md p-4">
        <div className="p-4">
          {/* Display Selected Image */}
          {image ? (
            <div className="mb-4 flex flex-col items-center">
              <img
                src={image}
                alt="Selected"
                className="w-64 h-64 object-cover rounded-lg border mb-3"
              />
              <button
                type="button"
                className="mt-2 bg-[#493628] text-white font-medium text-base !rounded-lg px-4 py-2 transition-opacity hover:opacity-90 hover:bg-[#705C53] shadow-md"
                onClick={removeImage}
              >
                Remove Image
              </button>
            </div>
          ) : (
            <label className="w-64 h-64 border-2 border-dashed flex items-center justify-center cursor-pointer rounded-lg text-gray-500 hover:bg-gray-100 transition">
              +
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      </div>
    );

  }

};

export default ImageUploader;
