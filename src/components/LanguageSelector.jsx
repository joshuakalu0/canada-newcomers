"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
// import { useParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const LanguageSelector = ({ isScrolled }) => {
  const route = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [currentLang, setCurrentLang] = useState(params.locale);

  const changeLanguage = (e) => {
    const newLang = e.target.value;

    route.replace({ pathname, params }, { locale: newLang });

    setCurrentLang(newLang);
  };

  return (
    <select
      onChange={changeLanguage}
      value={currentLang}
      className={`bg-white text-gray-800 px-3 py-1 rounded-md border-2 ${
        isScrolled ? "border-[#D52B1E]" : "border-white"
      } focus:outline-none focus:ring-2 focus:ring-red-500`}
      aria-label="Select Language"
    >
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="es">Español</option>
      <option value="zh">中文</option>
    </select>
  );
};

export default LanguageSelector;
