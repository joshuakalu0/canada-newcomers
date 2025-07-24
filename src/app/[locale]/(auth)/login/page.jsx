"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";
// import Header from "../../components/Header";
import Footer from "../../../../components/Footer";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const formRef = useRef(null);
  const router = useRouter();

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
      setAuthError("An error occurred during login. Please try again.");
      setIsLoading(false);
    }
  };

  // Trigger animations for invalid fields
  const handleFormSubmitWithAnimations = handleSubmit((data) => {
    // Check for errors and trigger animations
    // if (errors.email) setShakeEmail(true);
    // if (errors.password) setShakePassword(true);
    signIn("credentials", { email: data.email, password: data.password });

    // If no errors, proceed with submission
    if (isValid) {
      onSubmit(data);
    }
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
                Welcome to Canada!
              </h2>
              <p className="text-lg mb-6 relative z-10">
                Your journey to a new life in Canada starts here. Access
                resources, find essential services, and connect with the
                community.
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
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-[#D52B1E] text-center mb-6">
              Login to Your Account
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
                  Email Address <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`email-input w-full pl-10 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-label="Email Address"
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
                  Password <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`password-input w-full pl-10 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D52B1E] ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-label="Password"
                    aria-describedby="password-error"
                    disabled={isLoading}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
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
                  href="/forgot-password"
                  className="text-[#D52B1E] text-sm hover:underline"
                >
                  Forgot Password?
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
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
                      Logging in...
                    </>
                  ) : (
                    "Login"
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
                    Or continue with
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
                    <path
                      fill="#EA4335"
                      d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                    />
                  </svg>
                  <span>Google</span>
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
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
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
              <h3 className="text-2xl font-bold mb-2">New to Canada?</h3>
              <p className="mb-4">
                Create an account to access personalized resources, save
                locations, and get tailored recommendations for your journey in
                Canada.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Link
                href="/register"
                className="inline-block bg-white text-[#D52B1E] px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-center w-full md:w-auto"
              >
                Register Now
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default LoginPage;
