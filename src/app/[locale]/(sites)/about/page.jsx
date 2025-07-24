"use client";
import { useTranslations } from "next-intl";
import React from "react";

const About = () => {
  const t = useTranslations("about");
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-[#D52B1E] to-white text-white text-center pt-24 pb-25 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center"></div>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {t("hero_title")}
          </h1>
          <p className="text-xl md:text-2xl mb-6">{t("hero_description")}</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() =>
                document
                  .getElementById("about-content")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-[#D52B1E] text-white px-6 py-3 rounded-full hover:bg-red-700 transition-all duration-300 font-semibold"
            >
              {t("hero_learn_more_button")}
            </button>
          </div>
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
      <main id="about-content" className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold text-[#D52B1E] mb-6">
              {t("mission_title")}
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              {t("mission_description_1")}
            </p>
            <p className="text-lg text-gray-700 mb-6">
              {t("mission_description_2")}
            </p>
            <div className="bg-red-50 border-l-4 border-[#D52B1E] p-6 mt-6">
              <h3 className="text-xl font-semibold text-red-800 mb-3">
                {t("did_you_know_title")}
              </h3>
              <p className="text-red-700">{t("did_you_know_description")}</p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://placehold.co/600x400/e63946/ffffff?text=Newcomers+Support"
              alt={t("image_alt")}
              className="w-full rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border-2 border-[#D52B1E]">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#D52B1E]">100+</div>
                <div className="text-gray-600">
                  {t("services_connected_label")}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-[#D52B1E] text-center mb-12">
            {t("how_we_help_title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border-2 border-[#D52B1E] rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-[#D52B1E] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-2xl font-semibold text-[#D52B1E] mb-4">
                {t("card_1_title")}
              </h3>
              <p className="text-gray-700">{t("card_1_description")}</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border-2 border-[#D52B1E] rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-[#D52B1E] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-2xl font-semibold text-[#D52B1E] mb-4">
                {t("card_2_title")}
              </h3>
              <p className="text-gray-700">{t("card_2_description")}</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border-2 border-[#D52B1E] rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-[#D52B1E] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-2xl font-semibold text-[#D52B1E] mb-4">
                {t("card_3_title")}
              </h3>
              <p className="text-gray-700">{t("card_3_description")}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-10 mb-16">
          <h2 className="text-4xl font-bold text-[#D52B1E] text-center mb-8">
            {t("story_title")}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg mb-6">{t("story_description_1")}</p>
            <p className="text-lg mb-6">{t("story_description_2")}</p>
            <p className="text-lg">{t("story_description_3")}</p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#D52B1E] mb-8">
            {t("community_title")}
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            {t("community_description")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#D52B1E] text-white px-8 py-4 rounded-full text-lg hover:bg-red-700 transition-all duration-300 font-semibold">
              {t("community_explore_button")}
            </button>
            <button className="border-2 border-[#D52B1E] text-[#D52B1E] px-8 py-4 rounded-full text-lg hover:bg-red-50 transition-all duration-300 font-semibold">
              {t("community_join_button")}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
