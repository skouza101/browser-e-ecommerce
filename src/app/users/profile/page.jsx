"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useThemeStore } from "@/store/useThemeStore";

const Page = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useThemeStore();

  useEffect(() => {
    // Access localStorage only on the client
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {user ? (
          <div className="space-y-6 sm:space-y-8">
            {/* Header Section */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-2">
                Welcome back, {user.firstName}! 👋
              </h1>
              <p className="text-base sm:text-lg text-base-content/70">
                Manage your account and preferences
              </p>
            </div>

            {/* Profile Card */}
            <div className="bg-base-100 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
              {/* Profile Header - Mobile Stacked, Desktop Side by Side */}
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center overflow-hidden">
                  {user?.profilepic ? (
                    <Image 
                      src={user.profilepic} 
                      alt="Profile Picture" 
                      width={80} 
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl sm:text-2xl font-bold text-primary-content">
                      {user.firstName?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-base-content">
                    {user.firstName} {user.lastName || ""}
                  </h2>
                  <p className="text-base-content/70 flex items-center justify-center sm:justify-start mt-1">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {user.email}
                  </p>
                </div>
              </div>

              {/* User Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-base-200 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-base-content">Personal Information</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-base-content/60">First Name</label>
                      <p className="text-sm sm:text-base text-base-content">{user.firstName}</p>
                    </div>
                    {user.lastName && (
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-base-content/60">Last Name</label>
                        <p className="text-sm sm:text-base text-base-content">{user.lastName}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-base-content/60">Email Address</label>
                      <p className="text-sm sm:text-base text-base-content break-all">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-base-200 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-success/20 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-base-content">Account Status</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                      <span className="text-success font-medium text-sm sm:text-base">Active</span>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-base-content/60">Member Since</label>
                      <p className="text-sm sm:text-base text-base-content">{new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-base-content/60">Current Theme</label>
                      <p className="text-sm sm:text-base text-base-content capitalize">{theme}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="flex-1 btn btn-primary rounded-xl transition-all duration-200 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
                <button className="flex-1 btn btn-outline rounded-xl transition-all duration-200 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-base-100 rounded-2xl shadow-xl p-8 sm:p-12 max-w-md mx-auto">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-base-content mb-3 sm:mb-4">No User Found</h2>
              <p className="text-base-content/70 mb-6 sm:mb-8 text-sm sm:text-base">
                Please log in to view your profile information.
              </p>
              <button className="btn btn-primary rounded-xl px-6 sm:px-8">
                Go to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
