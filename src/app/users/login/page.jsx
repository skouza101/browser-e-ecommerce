"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore.js";
import { useThemeStore } from "@/store/useThemeStore.js";
import validator from "validator";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { userForm, setUserFormData, loginUser } = useUserStore();
  const { theme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  const isValidate = () =>
    validator.isEmail(userForm.email || "") &&
    userForm.password &&
    isAccepted;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidate()) {
      toast.error("Please fill in all fields and accept the terms.");
      return;
    }
    try {
      await loginUser();
    } catch {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-2">
            Welcome Back
          </h1>
          <p className="text-base-content/70 text-sm sm:text-base">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-base-100 rounded-2xl shadow-2xl border border-base-content/10 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-base-content">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  className={`input input-bordered w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    !validator.isEmail(userForm.email || "") && userForm.email
                      ? "input-error"
                      : ""
                  }`}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                  value={userForm.email || ""}
                />
                {!validator.isEmail(userForm.email || "") && userForm.email && (
                  <p className="text-error text-sm mt-1">Please enter a valid email address</p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-base-content">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full pr-12 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                  value={userForm.password || ""}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center space-x-3">
              <input
                id="terms-checkbox"
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={isAccepted}
                onChange={() => setIsAccepted(!isAccepted)}
              />
              <label htmlFor="terms-checkbox" className="text-sm text-base-content">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline font-medium">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isValidate()}
              className={`btn btn-primary w-full transition-all duration-200 ${
                isValidate()
                  ? "hover:scale-[1.02] hover:shadow-lg"
                  : ""
              }`}
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-base-content/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-base-100 text-base-content/50">New to our platform?</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <Link
              href="/users/registre"
              className="inline-flex items-center text-primary hover:text-primary-focus font-semibold transition-all duration-200"
            >
              Create an account
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
