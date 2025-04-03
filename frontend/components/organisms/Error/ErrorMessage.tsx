"use client";

import React from "react";

interface ErrorMessageProps {
  title: string;
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-2xl font-bold text-red-600">{title}</h1>
      <p className="text-gray-600 mt-2">{message}</p>
      {/* <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Refresh
      </button> */}
    </div>
  );
};

export default ErrorMessage;
