// import { Product } from "@/utils/data";
import { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { HiMinus, HiPlus, HiShoppingBag } from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/type";

interface ProductItemProps {
  products: Product[];
}

export default function ProductItem({ products }: ProductItemProps) {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleQtyChange = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = async (id: string) => {
    const qty = quantities[id] || 1;
    try {
      await addToCart(id, qty);
      toast.success("Ditambahkan ke keranjang");
    } catch (error) {
      console.error("Ini adalah error : ", error);
      toast.error("Gagal menambahkan ke keranjang");
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((item) => (
        <div key={item.id} className="space-y-2">
          <div className="bg-gray-100 flex justify-center relative group cursor-pointer rounded-xl">
            <div className="w-full aspect-[1/1]">
                <Image
                src={item.images[0] || '/img/placeholder-image.svg'}  
                alt={'gambar'}
                width={500}
                height={500}
                className="w-full h-full object-cover object-center border rounded-xl"
                />
            </div>
            {/* <button onClick={() => handleAddToCart(item.id)} className=""> */}
            <button onClick={() => handleAddToCart(item.id)} className="">
                <div className="absolute z-10 bottom-3 mx-3 p-2 right-0 bg-[#493628] w-12 h-12 rounded-full shadow-md opacity-0 translate-y-2 scale-95 transition-all duration-300 ease-in-out group-hover:!opacity-100 group-hover:translate-y-0 group-hover:scale-100 cursor-pointer flex items-center justify-center">
                    <HiShoppingBag className="w-6 h-6 !transition-none text-white"/>
                </div>
            </button>
            </div>
          <p className="text-lg font-semibold pt-1">{item.name}</p>
          <div className="flex flex-row items-center gap-1 pb-2">
            <Image src="/icon/star.svg" width={18} height={18} alt="" />
            <p className="text-base font-medium text-gray-600 leading-none !mb-0">5.00</p>
          </div>
          <p className="text-base font-medium text-gray-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(item.price))}</p>
          {/* qty inputs */}
          <div className="flex items-center flex-col">
                <div className="flex items-center w-full mx-auto justify-center">
                    <button onClick={() => handleQtyChange(item.id, -1)}
                        className="group !rounded-l-full px-3 py-[9px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                        <HiMinus className="size-5"/>
                    </button>
                    <input type="text" value={quantities[item.id] || 1}
                        className="border-y border-gray-200 outline-none text-coklat font-semibold text-base w-15 placeholder:text-[#493628] py-[7px] text-center bg-transparent"
                        placeholder="1" readOnly/>
                    <button onClick={() => handleQtyChange(item.id, 1)}
                        className="group !rounded-r-full px-3 py-[9px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                        <HiPlus className="size-5"/>
                    </button>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}