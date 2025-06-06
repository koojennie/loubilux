// components/ProductPage.tsx
import React, { useState, FC } from 'react';
import Head from 'next/head'; // For Swiper CSS CDN and title

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import type SwiperCore from 'swiper';

// Import Swiper modules
import { Navigation, Thumbs, EffectFade, FreeMode } from 'swiper/modules';

// Import Swiper styles
// These would typically be in _app.tsx or a global CSS file
// For this self-contained example, we'll link them via CDN in Head,
// or you can ensure they are imported in your project's global styles.
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// import 'swiper/css/free-mode';


// Define the Product interface (as provided by you)
export interface Product {
  _id: number;
  name: string;
  price: number;
  category: string;
  image: string; // Main image for the product
  images?: string[]; // Array of images for the gallery
  thumbnails?: string[]; // Array of thumbnail images
  description: string;
  createdAt: string;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  reviews?: number;
  rating?: number;
}

// Sample product data (adapted for the component's needs)
const sampleProduct: Product = {
  _id: 1,
  name: 'Yellow Summer Travel Bag',
  price: 220,
  category: 'Travel / Menswear',
  image: 'https://pagedone.io/asset/uploads/1700471851.png', // Main display image
  images: [
    'https://pagedone.io/asset/uploads/1700471851.png',
    'https://pagedone.io/asset/uploads/1711514857.png',
    'https://pagedone.io/asset/uploads/1711514875.png',
    'https://pagedone.io/asset/uploads/1711514892.png',
  ],
  thumbnails: [
    'https://pagedone.io/asset/uploads/1700471871.png',
    'https://pagedone.io/asset/uploads/1711514930.png',
    'https://pagedone.io/asset/uploads/1700471908.png',
    'https://pagedone.io/asset/uploads/1700471925.png',
  ],
  description: 'The perfect companion for your next adventure! Embrace the spirit of sunny escapades with this vibrant and versatile bag designed to cater to your travel needs while adding a pop of color to your journey.',
  createdAt: '2025-06-05T08:30:00Z',
  colors: [
    { name: 'Emerald', hex: '#10B981' },
    { name: 'Amber', hex: '#FBBF24' },
    { name: 'Rose', hex: '#F43F5E' },
    { name: 'Blue', hex: '#2563EB' },
  ],
  sizes: ['56 cm (S)', '67 cm (M)', '77 cm (L)'],
  reviews: 1624,
  rating: 4, // Assuming a 4-star rating out of 5
};

// Star Icon Component
const StarIcon: FC<{ filled: boolean; half?: boolean }> = ({ filled, half }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="clipStar">
        <rect width={half ? "10" : "20"} height="20" />
      </clipPath>
    </defs>
    <g clipPath={half ? "url(#clipStar)" : undefined}>
      <path
        d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
        fill={filled ? "#FBBF24" : "#F3F4F6"}
      />
    </g>
  </svg>
);

const App: FC = () => {
  const product = sampleProduct;
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[1]?.name);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[1]);
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };
  
  // Fallback image in case of error
  const placeholderImage = "https://placehold.co/600x400/E2E8F0/A0AEC0?text=Image+Not+Available";


  return (
    <>
      <Head>
        <title>{product.name} - Details</title>
        <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
      </Head>
      <style jsx global>{`
        /* Custom Swiper Styles */
        .swiper-wrapper {
          height: max-content !important; /* Tailwind: h-max */
        }

        /* Hide default Swiper arrow characters if using default navigation buttons */
        /* Consider using custom navigation elements instead for better control */
        .swiper-button-prev:after,
        .swiper-rtl .swiper-button-next:after,
        .swiper-button-next:after,
        .swiper-rtl .swiper-button-prev:after {
          content: "" !important; 
        }
        
        /* Custom active thumbnail border */
        .product-thumb .swiper-slide-thumb-active .thumb-image-item {
          border-color: #4f46e5; /* Equivalent to border-indigo-600 */
        }
      `}</style>

      <section className="py-10 lg:py-24 relative font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Details Section */}
            <div className="pro-detail w-full flex flex-col justify-center order-last lg:order-none max-lg:max-w-[608px] max-lg:mx-auto">
              <p className="font-medium text-lg text-indigo-600 mb-4">{product.category}</p>
              <h2 className="mb-2 font-manrope font-bold text-3xl leading-10 text-gray-900">
                {product.name}
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                  ${product.price.toFixed(2)}
                </h6>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={i < (product.rating || 0)} />
                    ))}
                  </div>
                  <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">{product.reviews} reviews</span>
                </div>
              </div>
              <p className="text-gray-500 text-base font-normal mb-8 ">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="block w-full mb-6">
                  <p className="font-medium text-lg leading-8 text-gray-900 mb-4">Bag Color</p>
                  <div className="flex items-center justify-start gap-3 md:gap-6 relative">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`p-1 border-2 rounded-full transition-all duration-300 hover:border-opacity-100 ${
                          selectedColor === color.name ? 'border-indigo-600 border-opacity-100' : 'border-gray-200 hover:border-gray-400'
                        }`}
                        aria-label={`Select ${color.name} color`}
                      >
                        <span
                          className="block w-6 h-6 rounded-full"
                          style={{ backgroundColor: color.hex }}
                        ></span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                 <div className="block w-full mb-6">
                    <p className="font-medium text-lg leading-8 text-gray-900 mb-4">Bag size</p>
                    <div className="grid grid-cols-2 min-[400px]:grid-cols-3 gap-3">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`border text-gray-900 text-base sm:text-lg py-2 rounded-full px-1.5 sm:px-6 w-full font-semibold whitespace-nowrap shadow-sm transition-all duration-300 hover:shadow-gray-300 hover:bg-gray-50 hover:border-gray-300 ${
                                    selectedSize === size ? 'bg-indigo-50 border-indigo-600 text-indigo-600' : 'border-gray-200'
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
              )}

              {/* Quantity and Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center justify-center w-full rounded-full border border-gray-300">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="group py-3.5 px-5 rounded-l-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50"
                    aria-label="Decrease quantity"
                  >
                    <svg className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                         width="22" height="22" viewBox="0 0 22 22" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 11H5.5" strokeWidth="1.6" strokeLinecap="round" stroke="currentColor" />
                    </svg>
                  </button>
                  <input type="text"
                         value={quantity}
                         readOnly
                         className="font-semibold text-gray-900 text-lg py-[13px] px-2 w-full max-w-[60px] sm:max-w-[118px] bg-transparent placeholder:text-gray-900 text-center outline-none"
                         aria-label="Current quantity"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="group py-3.5 px-5 rounded-r-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50"
                    aria-label="Increase quantity"
                  >
                    <svg className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                         width="22" height="22" viewBox="0 0 22 22" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 5.5V16.5M16.5 11H5.5" strokeWidth="1.6" strokeLinecap="round" stroke="currentColor"/>
                    </svg>
                  </button>
                </div>
                <button
                    className="group py-4 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-100 hover:shadow-indigo-200">
                    <svg className="stroke-indigo-600 transition-all duration-500" width="22" height="22"
                         viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                            strokeWidth="1.6" strokeLinecap="round" stroke="currentColor"/>
                    </svg>
                    Add to cart
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                    className="group transition-all duration-500 p-4 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300"
                    aria-label="Add to wishlist"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"
                         fill="none">
                        <path
                            d="M4.47084 14.3196L13.0281 22.7501L21.9599 13.9506M13.0034 5.07888C15.4786 2.64037 19.5008 2.64037 21.976 5.07888C24.4511 7.5254 24.4511 11.4799 21.9841 13.9265M12.9956 5.07888C10.5204 2.64037 6.49824 2.64037 4.02307 5.07888C1.54789 7.51738 1.54789 11.4799 4.02307 13.9184M4.02307 13.9184L4.04407 13.939M4.02307 13.9184L4.46274 14.3115"
                            stroke="#4F46E5" strokeWidth="1.6" strokeMiterlimit="10"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button
                    className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                    Buy Now
                </button>
              </div>
            </div>

            {/* Product Image Gallery Section */}
            <div className="max-lg:order-first">
              <Swiper
                loop={true}
                spaceBetween={10} // Or 32 as in original inline style
                navigation={false} // Set to true or provide custom nav elements if needed
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[EffectFade, Navigation, Thumbs]}
                effect="fade"
                className="product-prev mb-6 rounded-lg overflow-hidden"
              >
                {(product.images || [product.image]).map((imgSrc, index) => (
                  <SwiperSlide key={index}>
                    <img 
                      src={imgSrc} 
                      alt={`${product.name} image ${index + 1}`} 
                      className="w-full h-auto object-cover aspect-[4/3] rounded-lg"
                      onError={(e) => (e.currentTarget.src = placeholderImage)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={12}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="product-thumb max-w-[608px] mx-auto"
              >
                {(product.thumbnails || product.images || [product.image]).map((thumbSrc, index) => (
                  <SwiperSlide key={index} className="rounded-md overflow-hidden">
                    <img
                      src={thumbSrc}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="thumb-image-item cursor-pointer border-2 border-gray-200 hover:border-indigo-500 transition-all duration-300 w-full h-auto object-cover aspect-square rounded-md"
                      onError={(e) => (e.currentTarget.src = placeholderImage.replace("600x400", "100x100"))}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App; // Assuming this is the main component for the page/preview

// To use this component in a Next.js page (e.g., pages/product/[id].tsx or pages/index.tsx):
// 1. Save this code as components/ProductPage.tsx
// 2. In your page file:
//    import ProductPage from '@/components/ProductPage'; // Adjust path as needed
//    
//    export default function MyProductScreen() {
//      return <ProductPage />;
//    }
// 3. Ensure you have Tailwind CSS configured in your Next.js project.
// 4. Ensure Swiper CSS is loaded, either by importing in _app.tsx:
//    import 'swiper/css';
//    import 'swiper/css/effect-fade';
//    import 'swiper/css/navigation';
//    import 'swiper/css/thumbs';
//    import 'swiper/css/free-mode';
//    Or by using the CDN links in the <Head> component as shown.
// 5. Make sure to install swiper: `npm install swiper` or `yarn add swiper`.