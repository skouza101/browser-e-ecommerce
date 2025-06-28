"use client";
import Link from "next/link";
import { ShoppingCartIcon, CircleUserRound, LogOut, User, ShoppingBag } from "lucide-react";
import SelectTheme from "./SelectTheme";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useOrderStore } from "@/store/useOrderStore.js";
import { useUserStore } from "@/store/useUserStore.js";

const Navbar = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { fetchOrders } = useOrderStore();
  const { logOut } = useUserStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("userInfo");
      setUserInfo(user ? JSON.parse(user) : null);
    }
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="h-18 px-4 md:px-8 lg:px-16 xl:px-32 bg-gradient-to-r from-base-200 via-base-100 to-base-200 backdrop-blur-xl border-b border-primary/20 text-base-content shadow-lg sticky top-0 left-0 right-0 z-50 transition-all duration-300 hover:shadow-xl">
      <div className="flex-1 lg:flex-none flex justify-between items-center h-full">
        {/* Logo Section */}
        <Link href="/" className="group hover:scale-105 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              <ShoppingCartIcon className="size-10 text-primary relative z-10 group-hover:rotate-12 transition-all duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold font-mono tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary group-hover:from-secondary group-hover:to-primary transition-all duration-500">
                SKOUZA
              </span>
              <span className="text-xs text-base-content/60 font-medium tracking-wide">Premium Shopping</span>
            </div>
          </div>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Selector */}
          <div className="dropdown dropdown-end ">
            <SelectTheme />
          </div>

          {/* User Menu */}
          <div className="dropdown dropdown-end bg-base-100/95 backdrop-blur-xl rounded-2xl z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar group relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center  group-hover:border-primary/40 transition-all duration-300">
                {userInfo?.profilepic ? (
                  <Image
                    src={userInfo.profilepic}
                    width={40}
                    height={40}
                    alt="Profile"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <CircleUserRound className="size-full text-primary group-hover:text-secondary transition-colors duration-300" />
                )}
              </div>
              {/* Hover effect */}
              <div className="absolute inset-0 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-xl rounded-2xl z-50 mt-4 w-64 p-3 shadow-2xl border border-base-content/10"
            >
              {userInfo ? (
                <>
                  {/* User Info Header */}
                  <div className="px-3 py-2 mb-2 border-b border-base-content/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        {userInfo?.profilepic ? (
                          <Image
                            src={userInfo.profilepic}
                            width={32}
                            height={32}
                            alt="Profile"
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <User className="size-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-base-content">
                          {userInfo?.name || userInfo?.email || 'User'}
                        </p>
                        <p className="text-xs text-base-content/60">Welcome back!</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <li>
                    <Link 
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
                      href="/cart"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <ShoppingBag className="size-4 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">My Orders</span>
                        <span className="text-xs text-base-content/60">View your purchases</span>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link 
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
                      href="/users/profile"
                    >
                      <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors duration-300">
                        <User className="size-4 text-secondary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">Profile</span>
                        <span className="text-xs text-base-content/60">Manage your account</span>
                      </div>
                    </Link>
                  </li>

                  {/* Divider */}
                  <div className="my-2 border-t border-base-content/10"></div>

                  <li>
                    <button
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-error/10 hover:text-error transition-all duration-300 group w-full text-left"
                      onClick={() => logOut()}
                    >
                      <div className="p-2 rounded-lg bg-error/10 group-hover:bg-error/20 transition-colors duration-300">
                        <LogOut className="size-4 text-error" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">Sign Out</span>
                        <span className="text-xs text-base-content/60">Logout from your account</span>
                      </div>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {/* Guest User Header */}
                  <div className="px-3 py-2 mb-2 border-b border-base-content/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <User className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-base-content">Guest User</p>
                        <p className="text-xs text-base-content/60">Sign in to access your account</p>
                      </div>
                    </div>
                  </div>

                  {/* Guest Menu Items */}
                  <li>
                    <Link 
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
                      href="/users/login"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <User className="size-4 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">Sign In</span>
                        <span className="text-xs text-base-content/60">Access your account</span>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link 
                      className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-secondary/10 hover:text-secondary transition-all duration-300 group"
                      href="/users/registre"
                    >
                      <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors duration-300">
                        <User className="size-4 text-secondary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">Sign Up</span>
                        <span className="text-xs text-base-content/60">Create new account</span>
                      </div>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
