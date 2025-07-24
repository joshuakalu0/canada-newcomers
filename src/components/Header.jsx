"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
// import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const t = useTranslations();

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest(".user-menu-container")) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  // Handle sign out
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-gradient-to-r from-[#D52B1E] via-[#D52B1E] to-[#D52B1E]/90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center space-x-2 font-bold text-xl md:text-2xl ${
              isScrolled ? "text-[#D52B1E]" : "text-white"
            } transition-colors`}
          >
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                fill={isScrolled ? "#D52B1E" : "white"}
              />
              <path
                d="M2 17L12 22L22 17"
                stroke={isScrolled ? "#D52B1E" : "white"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke={isScrolled ? "#D52B1E" : "white"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Newcomers Canada Hub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={
                isScrolled
                  ? "text-[#D52B1E] hover:text-[#b91c1c] font-medium"
                  : "text-white hover:text-gray-100 font-medium"
              }
            >
              {t("header.home")}
            </Link>
            <Link
              href="/about"
              className={
                isScrolled
                  ? "text-[#D52B1E] hover:text-[#b91c1c] font-medium"
                  : "text-white hover:text-gray-100 font-medium"
              }
            >
              {t("header.about")}
            </Link>
            <Link
              href="/services"
              className={
                isScrolled
                  ? "text-[#D52B1E] hover:text-[#b91c1c] font-medium"
                  : "text-white hover:text-gray-100 font-medium"
              }
            >
              Services
            </Link>
            <Link
              href="/map"
              className={
                isScrolled
                  ? "text-[#D52B1E] hover:text-[#b91c1c] font-medium"
                  : "text-white hover:text-gray-100 font-medium"
              }
            >
              Map
            </Link>
            <Link
              href="/contact_us"
              className={
                isScrolled
                  ? "text-[#D52B1E] hover:text-[#b91c1c] font-medium"
                  : "text-white hover:text-gray-100 font-medium"
              }
            >
              {t("header.contact")}
            </Link>
            <Link
              href="/faq"
              className={
                isScrolled
                  ? "text-[#D52B1E] hover:text-[#b91c1c] font-medium"
                  : "text-white hover:text-gray-100 font-medium"
              }
            >
              {t("header.faq")}
            </Link>

            {/* Language Selector */}
            <div className="relative">
              {/* <LanguageSelector isScrolled={isScrolled} /> */}
            </div>

            {/* Auth Buttons or User Menu */}
            {isAuthenticated ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-2 ${
                    isScrolled ? "text-[#D52B1E]" : "text-white"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    {session?.user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="hidden lg:inline">
                    {session?.user?.name?.split(" ")[0]}
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                      >
                        Your Profile
                      </Link>
                      <Link
                        href="/saved-locations"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                      >
                        Saved Locations
                      </Link>
                      {session?.user?.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className={`${
                    isScrolled
                      ? "text-[#D52B1E] hover:text-[#b91c1c]"
                      : "text-white hover:text-gray-100"
                  } font-medium`}
                >
                  {t("header.login")}
                </Link>
                <Link
                  href="/register"
                  className={`${
                    isScrolled
                      ? "bg-[#D52B1E] text-white"
                      : "bg-white text-[#D52B1E]"
                  } px-4 py-1 rounded-md hover:opacity-90 transition-opacity font-medium`}
                >
                  {t("header.register")}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            {isAuthenticated && (
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`${isScrolled ? "text-[#D52B1E]" : "text-white"}`}
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  {session?.user?.name?.charAt(0) || "U"}
                </div>
              </button>
            )}

            {/* <LanguageSelector isScrolled={isScrolled} /> */}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isScrolled ? "text-[#D52B1E]" : "text-white"}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden py-4 overflow-hidden ${
                isScrolled ? "bg-white" : "bg-[#D52B1E]"
              }`}
            >
              <div className="flex flex-col space-y-4 px-2">
                <Link
                  href="/"
                  className={
                    isScrolled
                      ? "text-[#D52B1E] hover:text-[#b91c1c] px-3 py-2 rounded-md hover:bg-gray-100"
                      : "text-white hover:text-gray-100 px-3 py-2 rounded-md hover:bg-[#b91c1c]"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("header.home")}
                </Link>
                <Link
                  href="/about"
                  className={
                    isScrolled
                      ? "text-[#D52B1E] hover:text-[#b91c1c] px-3 py-2 rounded-md hover:bg-gray-100"
                      : "text-white hover:text-gray-100 px-3 py-2 rounded-md hover:bg-[#b91c1c]"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("header.about")}
                </Link>
                <Link
                  href="/services"
                  className={
                    isScrolled
                      ? "text-[#D52B1E] hover:text-[#b91c1c] px-3 py-2 rounded-md hover:bg-gray-100"
                      : "text-white hover:text-gray-100 px-3 py-2 rounded-md hover:bg-[#b91c1c]"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/map"
                  className={
                    isScrolled
                      ? "text-[#D52B1E] hover:text-[#b91c1c] px-3 py-2 rounded-md hover:bg-gray-100"
                      : "text-white hover:text-gray-100 px-3 py-2 rounded-md hover:bg-[#b91c1c]"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Map
                </Link>
                <Link
                  href="/contact_us"
                  className={
                    isScrolled
                      ? "text-[#D52B1E] hover:text-[#b91c1c] px-3 py-2 rounded-md hover:bg-gray-100"
                      : "text-white hover:text-gray-100 px-3 py-2 rounded-md hover:bg-[#b91c1c]"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("header.contact")}
                </Link>
                <Link
                  href="/faq"
                  className={
                    isScrolled
                      ? "text-[#D52B1E] hover:text-[#b91c1c] px-3 py-2 rounded-md hover:bg-gray-100"
                      : "text-white hover:text-gray-100 px-3 py-2 rounded-md hover:bg-[#b91c1c]"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("header.faq")}
                </Link>

                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-2 border-t border-white/20">
                    <Link
                      href="/login"
                      className={
                        isScrolled
                          ? "text-[#D52B1E] hover:text-[#b91c1c] px-3 py-2 rounded-md hover:bg-gray-100 text-center"
                          : "text-white hover:text-gray-100 px-3 py-2 rounded-md hover:bg-[#b91c1c] text-center"
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t("header.login")}
                    </Link>
                    <Link
                      href="/register"
                      className={
                        isScrolled
                          ? "bg-[#D52B1E] text-white px-3 py-2 rounded-md hover:bg-[#b91c1c] text-center"
                          : "bg-white text-[#D52B1E] px-3 py-2 rounded-md hover:bg-gray-100 text-center"
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t("header.register")}
                    </Link>
                  </div>
                )}

                {isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-2 border-t border-white/20">
                    <Link
                      href="/profile"
                      className={
                        isScrolled
                          ? "text-[#D52B1E] hover:text-[#b91c1c] px-3 py-2 rounded-md hover:bg-gray-100"
                          : "text-white hover:text-gray-100 px-3 py-2 rounded-md hover:bg-[#b91c1c]"
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/saved-locations"
                      className={
                        isScrolled
                          ? "text-[#D52B1E] hover:text-[#b91c1c] px-3 py-2 rounded-md hover:bg-gray-100"
                          : "text-white hover:text-gray-100 px-3 py-2 rounded-md hover:bg-[#b91c1c]"
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Saved Locations
                    </Link>
                    {session?.user?.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        className={
                          isScrolled
                            ? "text-[#D52B1E] hover:text-[#b91c1c] px-3 py-2 rounded-md hover:bg-gray-100"
                            : "text-white hover:text-gray-100 px-3 py-2 rounded-md hover:bg-[#b91c1c]"
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className={
                        isScrolled
                          ? "text-[#D52B1E] hover:text-[#b91c1c] px-3 py-2 rounded-md hover:bg-gray-100 text-left"
                          : "text-white hover:text-gray-100 px-3 py-2 rounded-md hover:bg-[#b91c1c] text-left"
                      }
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile User Menu */}
        <AnimatePresence>
          {showUserMenu && !isMobileMenuOpen && (
            <motion.div
              className="md:hidden absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                onClick={() => setShowUserMenu(false)}
              >
                Your Profile
              </Link>
              <Link
                href="/saved-locations"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                onClick={() => setShowUserMenu(false)}
              >
                Saved Locations
              </Link>
              {session?.user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
                  onClick={() => setShowUserMenu(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  handleSignOut();
                  setShowUserMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50"
              >
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Header;
