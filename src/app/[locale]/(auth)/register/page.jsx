"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations/auth";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import { useTranslations } from "next-intl";

const RegisterPage = () => {
  const router = useRouter();
  const [submitErrors, setsubmitErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const formRef = useRef(null);
  const t = useTranslations("register");

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      language: "",
      termsAccepted: false,
    },
  });

  const password = watch("password");

  // Password strength calculation
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      setShowPasswordStrength(false);
      return;
    }

    setShowPasswordStrength(true);
    let strength = 0;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (password.length >= 8) strength += 1;
    if (hasUpperCase) strength += 1;
    if (hasNumber) strength += 1;

    setPasswordStrength(strength);
  }, [password]);

  // Validate password strength
  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Password strength";
    if (passwordStrength === 1)
      return "Weak - Must be at least 8 characters with 1 uppercase and 1 number";
    if (passwordStrength === 2) return "Medium - Good, but could be stronger";
    if (passwordStrength === 3) return "Strong password";
    return "";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 1) return "bg-red-600";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-green-500";
    return "bg-gray-300";
  };

  // Handle social login
  const handleSocialLogin = async (provider) => {
    try {
      console.log(`Logging in with ${provider}`);
    } catch (error) {
      console.error(`${provider} login error:`, error);
    }
  };

  // Form submission handler
  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.status === 400) {
        setsubmitErrors(result.message);
      }

      if (!response.ok) {
        // Handle validation errors or other issues
        console.error("Registration failed:", result);
        // You could set specific error messages here based on the response
        setIsLoading(false);
        return;
      }

      // Success - reset form and redirect
      reset();
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setIsLoading(false);
    }
  };

  // Trigger animations for invalid fields
  const handleFormSubmitWithAnimations = handleSubmit((data) => {
    setsubmitErrors(null);
    // Check for errors and trigger animations

    // If no errors, proceed with submission
    if (isValid) {
      onSubmit(data);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* <Header /> */}

      {/* Main Content */}
      <main
        id="register-section"
        className="flex-grow flex items-center justify-center mt-10 py-16 px-4 bg-gradient-to-b from-white to-gray-100"
      >
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Canadian Welcome */}
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: -20, y: -50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.99 }}
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

          {/* Right Column - Registration Form */}
          <div>
            <motion.div
              ref={formRef}
              initial={{ opacity: 0.9, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-[#D52B1E] mb-6">
                {t("register_title")}
              </h2>

              {submitErrors && (
                <div
                  id="alert-border-2"
                  className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
                  role="alert"
                  dangerouslySetInnerHTML={{
                    __html: submitErrors,
                  }}
                />
              )}
              <form
                onSubmit={handleFormSubmitWithAnimations}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-gray-700 mb-2"
                  >
                    {t("full_name_label")}{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder={t("full_name_placeholder")}
                    className={`fullname-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-label={t("full_name_label")}
                    aria-describedby="fullname-error"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p
                      id="fullname-error"
                      className="mt-1 text-red-600 text-sm"
                    >
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    {t("email_label")} <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t("email_placeholder")}
                    className={`email-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-label={t("email_label")}
                    aria-describedby="email-error"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-red-600 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 mb-2"
                  >
                    {t("password_label")}{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder={t("password_placeholder")}
                    className={`password-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-label={t("password_label")}
                    aria-describedby="password-error"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p
                      id="password-error"
                      className="mt-1 text-red-600 text-sm"
                    >
                      {errors.password.message}
                    </p>
                  )}

                  {showPasswordStrength && (
                    <div className="mt-2">
                      <div className="h-2 bg-gray-300 rounded mb-1">
                        <div
                          className={`h-2 rounded ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 3) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {getPasswordStrengthText()}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 mb-2"
                  >
                    {t("confirm_password_label")}{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder={t("confirm_password_placeholder")}
                    className={`confirm-password-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    aria-label={t("confirm_password_label")}
                    aria-describedby="confirm-password-error"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p
                      id="confirm-password-error"
                      className="mt-1 text-red-600 text-sm"
                    >
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="language"
                    className="block text-gray-700 mb-2"
                  >
                    {t("language_label")}{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="language"
                    className={`language-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.language ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-label={t("language_label")}
                    aria-describedby="language-error"
                    {...register("language")}
                  >
                    <option value="">{t("language_placeholder")}</option>
                    <option value="English">
                      {t("language_option_english")}
                    </option>
                    <option value="French">
                      {t("language_option_french")}
                    </option>
                    <option value="Spanish">
                      {t("language_option_spanish")}
                    </option>
                    <option value="Chinese">
                      {t("language_option_chinese")}
                    </option>
                    <option value="Arabic">
                      {t("language_option_arabic")}
                    </option>
                  </select>
                  {errors.language && (
                    <p
                      id="language-error"
                      className="mt-1 text-red-600 text-sm"
                    >
                      {errors.language.message}
                    </p>
                  )}
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="termsAccepted"
                      type="checkbox"
                      className="h-4 w-4 text-[#D52B1E] focus:ring-[#D52B1E] border-gray-300 rounded accent-[#D52B1E]"
                      aria-describedby="terms-error"
                      {...register("termsAccepted")}
                    />
                  </div>
                  <div
                    className="ml-2 text-sm text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: t("terms_label"),
                    }}
                  />
                  {errors.termsAccepted && (
                    <p id="terms-error" className="text-red-600 text-sm">
                      {errors.termsAccepted.message}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      !isValid || isLoading
                        ? "bg-gray-400 cursor-not-allowed text-gray-700"
                        : "bg-[#D52B1E] hover:bg-red-700 text-white"
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          {/* SVG paths unchanged */}
                        </svg>
                        {t("register_loading")}
                      </span>
                    ) : (
                      t("register_button")
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-gray-600 flex justify-center items-center space-x-2 text-center">
                <div className="text-gray-600">{t("already_account")}</div>
                <Link href={"login"}>Login</Link>
              </div>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      {t("or_continue_with")}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    onClick={() => handleSocialLogin("google")}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {/* SVG path unchanged */}
                    </svg>
                    <span className="ml-2">{t("google")}</span>
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    onClick={() => handleSocialLogin("facebook")}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {/* SVG path unchanged */}
                    </svg>
                    <span className="ml-2">{t("facebook")}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
