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

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const formRef = useRef(null);

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
                  <path
                    d="M256,0c-11.3,0-22.6,0.7-33.8,2.1c-9.4,1.2-18.7,3-27.8,5.3c-9.1,2.3-18,5.1-26.7,8.4c-8.7,3.3-17.1,7.1-25.3,11.3
                    c-8.2,4.2-16,8.9-23.6,14c-7.6,5.1-14.8,10.7-21.7,16.7c-6.9,6-13.4,12.4-19.5,19.2c-6.1,6.8-11.8,13.9-17,21.3
                    c-5.2,7.4-10,15.1-14.3,23c-4.3,7.9-8.1,16.1-11.4,24.5c-3.3,8.4-6.1,17-8.4,25.8c-2.3,8.8-4,17.7-5.2,26.8
                    c-1.2,9.1-1.8,18.2-1.8,27.4c0,11.3,0.7,22.6,2.1,33.8c1.2,9.4,3,18.7,5.3,27.8c2.3,9.1,5.1,18,8.4,26.7
                    c3.3,8.7,7.1,17.1,11.3,25.3c4.2,8.2,8.9,16,14,23.6c5.1,7.6,10.7,14.8,16.7,21.7c6,6.9,12.4,13.4,19.2,19.5
                    c6.8,6.1,13.9,11.8,21.3,17c7.4,5.2,15.1,10,23,14.3c7.9,4.3,16.1,8.1,24.5,11.4c8.4,3.3,17,6.1,25.8,8.4
                    c8.8,2.3,17.7,4,26.8,5.2c9.1,1.2,18.2,1.8,27.4,1.8c11.3,0,22.6-0.7,33.8-2.1c9.4-1.2,18.7-3,27.8-5.3
                    c9.1-2.3,18-5.1,26.7-8.4c8.7-3.3,17.1-7.1,25.3-11.3c8.2-4.2,16-8.9,23.6-14c7.6-5.1,14.8-10.7,21.7-16.7
                    c6.9-6,13.4-12.4,19.5-19.2c6.1-6.8,11.8-13.9,17-21.3c5.2-7.4,10-15.1,14.3-23c4.3-7.9,8.1-16.1,11.4-24.5
                    c3.3-8.4,6.1-17,8.4-25.8c2.3-8.8,4-17.7,5.2-26.8c1.2-9.1,1.8-18.2,1.8-27.4c0-11.3-0.7-22.6-2.1-33.8
                    c-1.2-9.4-3-18.7-5.3-27.8c-2.3-9.1-5.1-18-8.4-26.7c-3.3-8.7-7.1-17.1-11.3-25.3c-4.2-8.2-8.9-16-14-23.6
                    c-5.1-7.6-10.7-14.8-16.7-21.7c-6-6.9-12.4-13.4-19.2-19.5c-6.8-6.1-13.9-11.8-21.3-17c-7.4-5.2-15.1-10-23-14.3
                    c-7.9-4.3-16.1-8.1-24.5-11.4c-8.4-3.3-17-6.1-25.8-8.4c-8.8-2.3-17.7-4-26.8-5.2C274.3,0.6,265.2,0,256,0z"
                  />
                </svg>
              </div>

              <h2 className="text-3xl font-bold mb-6 relative z-10">
                Join Our Community
              </h2>
              <p className="text-lg mb-6 relative z-10">
                Create your account to access personalized resources, save
                locations, and connect with the Canadian community.
              </p>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>Find essential services near you</p>
                </div>

                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <p>Connect with the community</p>
                </div>

                <div className="flex items-center">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>Stay updated on events and resources</p>
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
                Create Your Account
              </h2>

              <form
                onSubmit={handleFormSubmitWithAnimations}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-gray-700 mb-2"
                  >
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    className={`fullname-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-label="Full Name"
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
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`email-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-label="Email Address"
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
                    Create a Password <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    className={`password-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-label="Password"
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
                    Confirm Password <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className={`confirm-password-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    aria-label="Confirm Password"
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
                    Preferred Language <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="language"
                    className={`language-input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.language ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-label="Preferred Language"
                    aria-describedby="language-error"
                    {...register("language")}
                  >
                    <option value="">Select your preferred language</option>
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Arabic">Arabic</option>
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
                  <div className="ml-2 text-sm">
                    <label htmlFor="termsAccepted" className="text-gray-700">
                      I agree to the{" "}
                      <a
                        href="/terms"
                        className="text-[#D52B1E] hover:underline"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        className="text-[#D52B1E] hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
                {errors.termsAccepted && (
                  <p id="terms-error" className="text-red-600 text-sm">
                    {errors.termsAccepted.message}
                  </p>
                )}

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
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Registering...
                      </span>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[#D52B1E] hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
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
                      <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                    </svg>
                    <span className="ml-2">Google</span>
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
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="ml-2">Facebook</span>
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
