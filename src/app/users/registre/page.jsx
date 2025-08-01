"use client";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useThemeStore } from "@/store/useThemeStore";
import Link from "next/link";
import zxcvbn from "zxcvbn";
import validator from "validator";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [uploading, setUploading] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { userForm, setUserFormData, registerUser } = useUserStore();
  const { theme } = useThemeStore();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  const isValidate = () => {
    if (
      !userForm.email ||
      !userForm.password ||
      !userForm.repeat_password ||
      !userForm.firstname ||
      !userForm.lastname ||
      !userForm.profilepic
    ) {
      return false;
    }
    if (userForm.password !== userForm.repeat_password) {
      return false;
    }
    if (error) {
      return false;
    }
    if (!isAccepted) {
      return false;
    }
    return true;
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    if (e.target.files[0]) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "get_img_url");
      formData.append("cloud_name", "dccu4tbxj");
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dccu4tbxj/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        imageUrl = data.secure_url;
        setUserFormData({ profilepic: imageUrl });
        toast.success("Profile picture uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload image. Please try again.");
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleChange = (e) => {
    isValidate();
    const { name, type, value, checked } = e.target;
    if (type === "password" && name === "password") {
      const result = zxcvbn(value);
      if (result.score <= 2) {
        setError("Password is too weak. Please choose a stronger password.");
        setError(false);
      }
    }

    if (type === "checkbox") {
      setUserFormData({ [name]: checked });
    } else {
      setUserFormData({ [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    
    if (!isValidate()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    
    if (!isAccepted) {
      toast.error("You must accept the terms and conditions.");
      return;
    }
    
    try {
      await registerUser();
      router.push("/users/login");
    } catch (error) {
      console.error("Error during registration:", error);
      return;
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-2">
            Create Account
          </h1>
          <p className="text-base-content/70 text-sm sm:text-base">
            Join us and start your journey today
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
                    !validator.isEmail(userForm.email) && userForm.email !== ""
                      ? "input-error"
                      : ""
                  }`}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
                {!validator.isEmail(userForm.email) && userForm.email !== "" && (
                  <p className="text-error text-sm mt-1">Please enter a valid email address</p>
                )}
              </div>
            </div>

            {/* Password Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-base-content">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={`input input-bordered w-full pr-12 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      error ? "input-error" : ""
                    }`}
                    placeholder="Create a strong password"
                    onChange={handleChange}
                    required
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
                {error && <p className="text-error text-sm">{error}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-base-content">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="repeat_password"
                    className={`input input-bordered w-full pr-12 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      userForm.password !== userForm.repeat_password && userForm.password !== ""
                        ? "input-error"
                        : ""
                    }`}
                    placeholder="Confirm your password"
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
                  >
                    {showConfirmPassword ? (
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
                {userForm.password !== userForm.repeat_password && userForm.password !== "" && (
                  <p className="text-error text-sm">Passwords do not match</p>
                )}
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-base-content">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  className="input input-bordered w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="First name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-base-content">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  className="input input-bordered w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Last name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Profile Picture Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-base-content">
                Profile Picture
              </label>
              <div className="relative">
                <input
                  name="profilepic"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                  id="profile-upload"
                />
                <label
                  htmlFor="profile-upload"
                  className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-base-content/20 rounded-lg cursor-pointer bg-base-200 hover:bg-base-300 transition-all duration-200"
                >
                  <div className="flex flex-col items-center justify-center pt-2 sm:pt-5 pb-4 sm:pb-6">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-4 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-base-content/70 text-center">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-base-content/50 text-center">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Admin Checkbox */}
            <div className="flex items-center space-x-3">
              <input
                id="admin-checkbox"
                name="isadmin"
                type="checkbox"
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
              <label htmlFor="admin-checkbox" className="text-sm font-medium text-base-content">
                Admin Access
              </label>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center space-x-3">
              <input
                id="terms-checkbox"
                type="checkbox"
                className="checkbox checkbox-primary mt-1"
                onClick={() => setIsAccepted(!isAccepted)}
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
              disabled={!isValidate() || uploading}
              className={`btn btn-primary w-full transition-all duration-200 ${
                isValidate() && !uploading
                  ? "hover:scale-[1.02] hover:shadow-lg"
                  : ""
              }`}
            >
              {uploading ? (
                <div className="flex items-center justify-center space-x-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-base-content/70">
              Already have an account?{" "}
              <Link href="/users/login" className="font-medium text-primary hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
