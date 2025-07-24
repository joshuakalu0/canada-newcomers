"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import '../i18n';

const LanguageSelector = ({ isScrolled }) => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    setCurrentLang(i18n.language || 'en');
  }, [i18n.language]);

  const changeLanguage = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
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