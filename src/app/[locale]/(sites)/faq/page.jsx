"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const t = useTranslations("faqs");
  const { locale } = useParams();

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Student-focused FAQs
  const faqs = [
    {
      question: t("faq1_question"),
      answer: t("faq1_answer"),
    },
    {
      question: t("faq2_question"),
      answer: t("faq2_answer"),
    },
    {
      question: t("faq3_question"),
      answer: t("faq3_answer"),
    },
    {
      question: t("faq4_question"),
      answer: t("faq4_answer"),
    },
    {
      question: t("faq5_question"),
      answer: t("faq5_answer"),
    },
    {
      question: t("faq6_question"),
      answer: t("faq6_answer"),
    },
    {
      question: t("faq7_question"),
      answer: t("faq7_answer"),
    },
    {
      question: t("faq8_question"),
      answer: t("faq8_answer"),
    },
    {
      question: t("faq9_question"),
      answer: t("faq9_answer"),
    },
    {
      question: t("faq10_question"),
      answer: t("faq10_answer"),
    },
    {
      question: t("faq11_question"),
      answer: t("faq11_answer"),
    },
    {
      question: t("faq12_question"),
      answer: t("faq12_answer"),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-red-600 to-white text-white text-center pt-24 pb-32 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center"></div>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {t("hero_title")}
          </h1>
          <p className="text-xl md:text-2xl mb-6">{t("hero_description")}</p>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-12 px-4">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white border-2 rounded-lg overflow-hidden transition-all duration-300 ${
                activeIndex === index
                  ? "border-[#D52B1E] shadow-lg"
                  : "border-gray-200"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-[#D52B1E] transform transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                className={`px-6 transition-all duration-300 overflow-hidden ${
                  activeIndex === index ? "max-h-96 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white border-2 border-[#D52B1E] rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#D52B1E] mb-4">
            {t("contact_title")}
          </h2>
          <p className="text-gray-700 mb-6">{t("contact_description")}</p>
          <a
            href={`${locale}/contact_us`}
            className="inline-block bg-[#D52B1E] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            {t("contact_button")}
          </a>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
