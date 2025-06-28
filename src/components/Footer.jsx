"use client";
import { FaInstagram, FaTelegram, FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useState } from "react";
import Link from "next/link";

const Footer = () => {
  const { theme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Background with theme-aware gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-base-200 via-base-100 to-base-300 opacity-90"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    className="fill-current text-primary transition-all duration-300 hover:scale-110"
                  >
                    <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                  </svg>
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-ping"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Marwane Oraiche
                  </h3>
                  <p className="text-base-content/70 text-sm">
                    Full Stack Developer & E-commerce Specialist
                  </p>
                </div>
              </div>
              
              <p className="text-base-content/80 leading-relaxed max-w-md">
                Crafting exceptional digital experiences with modern web technologies. 
                Specialized in e-commerce solutions that drive business growth.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-base-content">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Products", href: "/" },
                  { name: "Cart", href: "/cart" },
                  { name: "Profile", href: "/users/profile" },
                  { name: "condition and Terms", href: "/terms" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-base-content/70 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-base-content">
                Get In Touch
              </h4>
              <div className="space-y-3">
                <p className="text-base-content/70 text-sm">
                  Ready to start your next project?
                </p>
                <p className="text-base-content/70 text-sm">
                  Let's create something amazing together.
                </p>
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="border-t border-base-content/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-base-content/70 text-sm">
                  © {currentYear} Marwane Oraiche. All rights reserved.
                </p>
                <p className="text-base-content/50 text-xs mt-1">
                  Built with Next.js, React, and Tailwind CSS
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h5 className="text-sm font-medium text-base-content mb-3 text-center md:text-left">
                  Follow Me
                </h5>
                <div className="flex justify-center md:justify-start gap-4">
                  {[
                    {
                      icon: FaInstagram,
                      href: "https://www.instagram.com/skouz4/",
                      label: "Instagram",
                      color: "hover:text-pink-500",
                    },
                    {
                      icon: FaXTwitter,
                      href: "https://x.com/skouza_101?t=-5kpZBzpyPxsMZJ3k9xCUQ&s=09",
                      label: "Twitter",
                      color: "hover:text-blue-400",
                    },
                    {
                      icon: FaTelegram,
                      href: "https://t.me/skouza_101",
                      label: "Telegram",
                      color: "hover:text-blue-500",
                    },
                    {
                      icon: FaGithub,
                      href: "https://github.com/skouza101",
                      label: "GitHub",
                      color: "hover:text-gray-600 dark:hover:text-gray-300",
                    },
                    {
                      icon: FaLinkedin,
                      href: "https://www.linkedin.com/in/marwane-oraiche-6a109826a/",
                      label: "LinkedIn",
                      color: "hover:text-blue-600",
                    },
                  ].map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        group relative p-3 rounded-xl bg-base-content/5 hover:bg-base-content/10 
                        transition-all duration-300 hover:scale-110 hover:shadow-lg
                        ${social.color}
                      `}
                      aria-label={social.label}
                    >
                      <social.icon className="size-5 transition-transform duration-300 group-hover:rotate-12" />
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-base-300 text-base-content text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        {social.label}
                        {social.title && (
                          <div className="text-xs text-base-content/70 mt-1">
                            {social.title}
                          </div>
                        )}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-base-300"></div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
