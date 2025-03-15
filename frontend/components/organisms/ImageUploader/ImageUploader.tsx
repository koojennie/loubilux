import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ImageUploader = ({ onImagesChange }: { onImagesChange: (images: File[]) => void }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const newPreviewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

      setImages((prev) => [...prev, ...selectedFiles]);
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);

      onImagesChange([...images, ...selectedFiles]);
    }
  };

  return (
    <div className="border rounded-md p-4">
      <label className="block text-sm font-medium mb-2">Upload Images</label>

      {/* Carousel untuk menampilkan gambar */}
      {previewUrls.length > 0 && (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={1}
          className="w-full h-40"
        >
          {previewUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-md" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Input File */}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mt-2 w-full text-sm"
      />
    </div>
  );
};

export default ImageUploader;
