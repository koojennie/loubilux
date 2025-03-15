import Image from "next/image";
import React from "react";

interface ModalViewDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
}

const ModalViewDetails = ({ isOpen, onClose, data }: ModalViewDetailsProps) => {
  if (!isOpen || !data) return null;

  console.log(data);

  const valueStatus = data.statusPublish;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xs transition-opacity duration-300">
      <div data-dialog="dialog"
        className="relative flex w-full max-w-[50rem] flex-col rounded-xl bg-white bg-clip-border text-slate-700 shadow-md">
        <div className="flex flex-col pl-10 pb-9">
          <div className="flex justify-end mt-3 mx-3">
            <button type="button" className="text-gray-500 bg-transparent hover:bg-gray-900 hover:text-gray-950 rounded-lg text-base ml-auto inline-flex items-center"
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <p className="font-bold text-2xl mb-1 text-slate-600">
            {data.name}
          </p>
          <p className="mb-4 mt-1 text-sm truncate text-slate-400">
            {data.description || 'No description'} 
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid grid-rows-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <p className="block mb-2 font-semibold text-base text-slate-600">Product Code</p>
                <p className="text-slate-500 text-sm truncate">{data.id}</p>
              </div>
              <div className="w-full">
                <p className="block mb-2 font-semibold text-base text-slate-600">Quantity</p>
                <p className="text-slate-500 text-sm truncate">{data.quantity}</p>
              </div>
              <div className="w-full">
                <p className="block mb-2 font-semibold text-base text-slate-600">Status</p>
                <span className={`spanx-3 p-2 rounded-md text-xs font-semibold 
                ${valueStatus === 'active' ? 'bg-green-200 text-green-800' : valueStatus === 'draft' ? 'bg-yellow-200 text-yellow-800'
                    : 'bg-gray-200 text-gray-800'
                  }`}>
                  {valueStatus.charAt(0).toUpperCase() + valueStatus.slice(1) || 'No status'}
                  {/* {valueStatus || 'No status'} */}
                </span>
              </div>
              <div className="w-full">
                <p className="block mb-2 font-semibold text-base text-slate-600">Price</p>
                <p className="text-slate-500 text-sm truncate">Rp {new Intl.NumberFormat('id-ID').format(data.price)}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <label className="block mb-1 text-sm text-slate-700">Preview Image</label>
              <Image src={data.image} width={100} height={100} alt="Product Image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalViewDetails;