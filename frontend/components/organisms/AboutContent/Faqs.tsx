"use client";

import { useState } from "react";

const faqData = [
  {
    question: "How long does the pre-order (PO) process take?",
    answer:
      "Our pre-order (PO) process typically takes approximately 2-3 months, depending on product availability and shipping schedules from Germany.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept payments through e-commerce platform. Additionally, bank transfers are available for orders via WhatsApp. We are also developing this website to provide a more seamless transaction experience in the future.",
  },
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer:
      "Yes, we offer Cash on Delivery (COD) services, but only within Depok, West Java.",
  },
  {
    question: "Where is Loubilux located?",
    answer:
      "Loubilux is based in Cimanggis, Depok, Indonesia, 16452.",
  },
];


export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="text-brown header pt-lg-60 pb-50">
      <div className="container-xxl container-fluid">
        <h1 className="text-4xl lg:text-2xl fw-bold text-center mb-30">
          Frequently Asked Questions
        </h1>
        <div className="max-w-7xl mx-auto space-y-4">
          {faqData.map((faq, index: number) => (
            <div
              key={index}
              className="border-b border-gray-200 rounded-2xl hover:bg-[#f8f5f2] transition duration-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center py-4 px-6 text-left text-xl lg:text-lg font-semibold color-palette-1 hover:text-[#AB886D]"
              >
                {faq.question}
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-[#AB886D]" : "text-gray-500"
                  }`}
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                className={`px-6 pb-4 text-lg lg:text-md overflow-hidden transition-all duration-300 font-regular ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}