"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const EditProductError = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error("Error on edit product page:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800 p-5">
      <h1 className="text-2xl font-bold">Oops! Something went wrong 😢</h1>
      <p className="text-lg mt-2">{error.message || "Failed to load the product."}</p>

      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default EditProductError;
