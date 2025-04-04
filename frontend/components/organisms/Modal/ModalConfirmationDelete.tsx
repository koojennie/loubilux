'use client'
import React, { forwardRef } from "react";

interface ModalConfirmationDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: any) => void;
}

const ModalConfirmationDelete = forwardRef<HTMLDivElement, ModalConfirmationDeleteProps>(({ isOpen, onClose, onConfirm }, ref) => {
  if (!isOpen) return null;
  return (
    // modal 
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xs transition-opacity duration-300">
      <div className="bg-white p-6 rounded shadow-md" ref={ref}>
        <div className="flex justify-end ">
          <button type="button" className="text-gray-600 bg-transparent hover:bg-gray-900 hover:text-gray-950 rounded-lg text-sm  ml-auto inline-flex items-center"
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div className="p-6 pt-0 text-center">
          <svg className="mx-auto mb-4 w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
          <button data-modal-toggle="popup-modal" type="button" className="text-white bg-gradient-to-br from-red-400 to-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform"
            onClick={onConfirm}
          >
            Yes, I'm sure
          </button>
          <span className="px-2"></span>
          <button data-modal-toggle="popup-modal" type="button" className="text-gray-600 bg-gray-50 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 ml-10 hover:text-gray-900 focus:z-10"
            onClick={onClose}
          >No, cancel</button>
        </div>
      </div>
    </div>
  )
}
)

export default ModalConfirmationDelete;