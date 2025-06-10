"use client";

import React from "react";

interface ErrorMessageProps {
  title: string;
  message: string;
  errorCode: number;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, message, errorCode}) => {
  return (
    <section className="not-found mx-auto pt-145 pb-md-212 pb-100">
      <div className="container-fluid">
        <div className="text-center">
        </div>
        <div className="pt-70 pb-md-50 pb-150">
          <h2 className="text-4xl fw-bold text-center color-palette-1 mb-10">Error {errorCode} - {title}</h2>
          <p className="text-lg text-center color-palette-1 m-0">
            {message}
          </p>
        </div>
        <div className="button-group d-flex flex-column mx-auto">
          <a className="d-flex flex-column mx-auto !rounded-full py-3 px-10 text-center bg-[#493628] font-semibold text-lg text-white flex transition-all duration-500 hover:bg-[#705C53]" href="/"
            role="button">Homepage</a>
        </div>
      </div>
    </section>
  )

};

export default ErrorMessage;
