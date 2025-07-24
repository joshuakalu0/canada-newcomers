"use client";
// import Link from "next/link";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";
// import Header from "../../components/Header";
import Footer from "../../../../components/Footer";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const formRef = useRef(null);
  const router = useRouter();
  const t = useTranslations("login");

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors or other issues
        setAuthError(
          result.error || "Invalid email or password. Please try again."
        );
        setIsLoading(false);
        return;
      }

      // Success - reset form and redirect
      reset();
      router.push("/home");
    } catch (error) {
      console.error("Login error:", error);
      setAuthError("An error occurred during  Please try again.");
      setIsLoading(false);
    }
  };

  // Trigger animations for invalid fields
  const handleFormSubmitWithAnimations = handleSubmit(async (data) => {
    // Check for errors and trigger animations
    // if (errors.email) setShakeEmail(true);
    // if (errors.password) setShakePassword(true);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
    });
    console.log(response, "======");

    // If no errors, proceed with submission
    // if (isValid) {
    //   onSubmit(data);
    // }
  });

  // Handle social login
  const handleSocialLogin = async (provider) => {
    try {
      // In a real app, this would use NextAuth.js signIn
      console.log(`Logging in with ${provider}`);
      // await signIn(provider, { callbackUrl: "/home" });
    } catch (error) {
      console.error(`${provider} login error:`, error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <main
        id="login-section"
        className="flex-grow flex items-center justify-center mt-10 py-16 px-4 bg-gradient-to-b from-white to-gray-100"
      >
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Canadian Welcome */}
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-[#D52B1E] p-8 rounded-lg text-white relative overflow-hidden"
            >
              {/* Maple Leaf Background */}
              <div className="absolute top-0 right-0 opacity-10">
                <svg className="w-64 h-64" viewBox="0 0 512 512" fill="white">
                  {/* SVG path unchanged */}
                </svg>
              </div>

              <h2 className="text-3xl font-bold mb-6 relative z-10">
                {t("welcome_title")}
              </h2>
              <p className="text-lg mb-6 relative z-10">
                {t("welcome_description")}
              </p>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      {/* SVG path unchanged */}
                    </svg>
                  </div>
                  <p>{t("service_item_1")}</p>
                </div>

                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      {/* SVG path unchanged */}
                    </svg>
                  </div>
                  <p>{t("service_item_2")}</p>
                </div>

                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      {/* SVG path unchanged */}
                    </svg>
                  </div>
                  <p>{t("service_item_3")}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Login Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0.1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex justify-center mb-6">
              <svg
                className="w-12 h-12 text-[#D52B1E]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG paths unchanged */}
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-[#D52B1E] text-center mb-6">
              {t("login_title")}
            </h2>

            {/* Form */}
            <form
              onSubmit={handleFormSubmitWithAnimations}
              className="space-y-6"
            >
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  {t("email_label")} <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {/* SVG path unchanged */}
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder={t("email_placeholder")}
                    className={`email-input w-full pl-10 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-label={t("email_label")}
                    aria-describedby="email-error"
                    disabled={isLoading}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="mt-1 text-red-600 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  {t("password_label")} <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {/* SVG path unchanged */}
                    </svg>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("password_placeholder")}
                    className={`password-input w-full pl-10 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-label={t("password_label")}
                    aria-describedby="password-error"
                    disabled={isLoading}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={
                      showPassword ? t("hide_password") : t("show_password")
                    }
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {/* SVG path unchanged */}
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {/* SVG path unchanged */}
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="mt-1 text-red-600 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex flex-col sm:flex-row sm:justify-between items-start">
                <Link
                  href={`forgot-password`}
                  className="text-[#D52B1E] text-sm hover:underline"
                >
                  {t("forgot_password")}
                </Link>
              </div>

              {/* Authentication Error */}
              {authError && (
                <div className="bg-red-50 border-l-4 border-red-600 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {/* SVG path unchanged */}
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{authError}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Login Button */}
              <div>
                <motion.button
                  type="submit"
                  disabled={!isValid || isLoading}
                  className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                    !isValid || isLoading
                      ? "bg-gray-400 cursor-not-allowed text-gray-700"
                      : "bg-[#D52B1E] hover:bg-red-700 text-white"
                  }`}
                  whileHover={isValid && !isLoading ? { scale: 1.02 } : {}}
                  whileTap={isValid && !isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        {/* SVG paths unchanged */}
                      </svg>
                      {t("login_loading")}
                    </>
                  ) : (
                    t("login_button")
                  )}
                </motion.button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {t("or_continue_with")}
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  onClick={() => handleSocialLogin("google")}
                  className="py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    {/* SVG paths unchanged */}
                  </svg>
                  <span>{t("google")}</span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => handleSocialLogin("facebook")}
                  className="py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  <svg
                    className="w-5 h-5 text-[#1877F2]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {/* SVG path unchanged */}
                  </svg>
                  <span>{t("facebook")}</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      {/* New User Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <motion.div
          className="bg-gradient-to-r from-[#D52B1E] to-red-700 rounded-lg p-8 max-w-3xl mx-auto shadow-lg text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-2">{t("new_user_title")}</h3>
              <p className="mb-4">{t("new_user_description")}</p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Link
                href={`/register`}
                className="inline-block bg-white text-[#D52B1E] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-center w-full md:w-auto"
              >
                {t("register_button")}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default LoginPage;
