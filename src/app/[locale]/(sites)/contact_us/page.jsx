"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = useTranslations("support");
  const { locale } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      // In a real app, this would send the data to a server
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-red-600 to-white text-white text-center pt-24 pb-56 relative overflow-hidden">
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
      <main className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2
              className="text-3xl font-bold text-[#D52B1E] mb-6"
              id="academic-form"
            >
              {t("form_title")}
            </h2>

            {isSubmitted ? (
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {t("form_success_title")}
                </h3>
                <p className="text-green-700">
                  {t("form_success_description")}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {t("form_success_button")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    {t("form_name_label")}{" "}
                    <span className="text-[#D52B1E]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 border-[#D52B1E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.name ? "border-red-600" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-600 text-sm">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    {t("form_email_label")}{" "}
                    <span className="text-[#D52B1E]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 border-[#D52B1E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.email ? "border-red-600" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-600 text-sm">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-700 mb-2">
                    {t("form_subject_label")}{" "}
                    <span className="text-[#D52B1E]">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 border-[#D52B1E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.subject ? "border-red-600" : ""
                    }`}
                  >
                    <option value="">{t("form_subject_placeholder")}</option>
                    <option value="Academic Support">
                      {t("form_subject_academic")}
                    </option>
                    <option value="Housing Assistance">
                      {t("form_subject_housing")}
                    </option>
                    <option value="Student Visa">
                      {t("form_subject_visa")}
                    </option>
                    <option value="Financial Aid">
                      {t("form_subject_financial")}
                    </option>
                    <option value="Campus Life">
                      {t("form_subject_campus")}
                    </option>
                    <option value="Health Services">
                      {t("form_subject_health")}
                    </option>
                    <option value="Career Support">
                      {t("form_subject_career")}
                    </option>
                    <option value="Technical Issue">
                      {t("form_subject_technical")}
                    </option>
                    <option value="Other">{t("form_subject_other")}</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-red-600 text-sm">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    {t("form_message_label")}{" "}
                    <span className="text-[#D52B1E]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 border-[#D52B1E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.message ? "border-red-600" : ""
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-red-600 text-sm">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-[#D52B1E] text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    {t("form_submit_button")}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-[#D52B1E] mb-6">
              {t("contact_title")}
            </h2>
            <div className="bg-gray-50 border-2 border-[#D52B1E] rounded-lg p-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#D52B1E] text-white p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {t("contact_email_label")}
                    </h3>
                    <p className="text-gray-600">{t("contact_email")}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#D52B1E] text-white p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {t("contact_phone_label")}
                    </h3>
                    <p className="text-gray-600">{t("contact_phone")}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#D52B1E] text-white p-3 rounded-full mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {t("contact_address_label")}
                    </h3>
                    <p className="text-gray-600">{t("contact_address")}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-gray-800 mb-4">
                  {t("contact_follow_us")}
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-[#D52B1E] text-white p-3 rounded-full hover:bg-red-700 transition-colors"
                    aria-label={t("contact_facebook_label")}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.879v-8.385h-3.047v-3.492h3.047v-2.606c0-3.007 1.792-4.402 4.301-4.402 1.22 0 2.286.099 2.596.143v2.973h-1.46c-1.158 0-1.352.558-1.352 1.382v2.06h3.293l-.449 3.492h-2.844v8.385c5.738-.925 10.125-5.889 10.125-11.879z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-[#D52B1E] text-white p-3 rounded-full hover:bg-red-700 transition-colors"
                    aria-label={t("contact_twitter_label")}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-[#D52B1E] text-white p-3 rounded-full hover:bg-red-700 transition-colors"
                    aria-label={t("contact_instagram_label")}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Student Resources */}
          <div className="mt-16 bg-gray-50 col-span-2 rounded-lg p-8 border-2 border-[#D52B1E]">
            <h2 className="text-3xl font-bold text-[#D52B1E] mb-8 text-center">
              {t("resources_title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a
                href={`${locale}/resources/academic`}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl text-[#D52B1E] mb-3">📚</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {t("resource_academic_title")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("resource_academic_description")}
                </p>
              </a>

              <a
                href={`${locale}/resources/housing`}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl text-[#D52B1E] mb-3">🏠</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {t("resource_housing_title")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("resource_housing_description")}
                </p>
              </a>

              <a
                href={`${locale}/resources/financial`}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl text-[#D52B1E] mb-3">💰</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {t("resource_financial_title")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("resource_financial_description")}
                </p>
              </a>

              <a
                href={`${locale}/resources/health`}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl text-[#D52B1E] mb-3">💊</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {t("resource_health_title")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("resource_health_description")}
                </p>
              </a>

              <a
                href={`${locale}/resources/career`}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl text-[#D52B1E] mb-3">💼</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {t("resource_career_title")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("resource_career_description")}
                </p>
              </a>

              <a
                href={`${locale}/resources/immigration`}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl text-[#D52B1E] mb-3">📃</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {t("resource_immigration_title")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("resource_immigration_description")}
                </p>
              </a>

              <a
                href={`${locale}/resources/community`}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl text-[#D52B1E] mb-3">🌎</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {t("resource_community_title")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("resource_community_description")}
                </p>
              </a>

              <a
                href={`${locale}/resources/discounts`}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl text-[#D52B1E] mb-3">🛒</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {t("resource_discounts_title")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("resource_discounts_description")}
                </p>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
