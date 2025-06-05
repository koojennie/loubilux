import { Product } from "@/utils/data";
import Image from "next/image";
import { HiShoppingBag } from "react-icons/hi2";

interface ProductItemProps {
  products: Product[];
}

export default function ProductItem({ products }: ProductItemProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((item) => (
        <div key={item._id} className="space-y-2">
          <div className="bg-gray-100 flex justify-center relative group cursor-pointer border rounded-xl">
            <div className="w-full aspect-[1/1]">
                <Image
                src={item.image}
                alt={item.name}
                width={500}
                height={500}
                className="w-full h-full object-cover object-center"
                />
            </div>
            <a href={'/cart'} className="">
                <div className="absolute z-10 bottom-3 mx-3 p-2 right-0 bg-[#493628] w-12 h-12 rounded-full shadow-md opacity-0 translate-y-2 scale-95 transition-all duration-300 ease-in-out group-hover:!opacity-100 group-hover:translate-y-0 group-hover:scale-100 cursor-pointer flex items-center justify-center">
                    <HiShoppingBag className="w-6 h-6 !transition-none text-white"/>
                </div>
            </a>
            </div>
          <a href={`/product/${item._id}`} className="">
            <p className="text-lg font-semibold pt-1">{item.name}</p>
          </a>
          <div className="flex flex-row items-center gap-1 pb-2">
            <Image src="/icon/star.svg" width={18} height={18} alt="" />
            <p className="text-base font-medium text-gray-600 leading-none !mb-0">5.00</p>
          </div>
          <p className="text-base font-medium text-gray-800">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(item.price))}</p>
        </div>
      ))}
    </div>
  );
}