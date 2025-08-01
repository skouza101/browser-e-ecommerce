"use client";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/store/useThemeStore";

const ThemeProvider = ({ children }) => {
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

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-base-300">
        {children}
      </div>
    );
  }

  return children;
};

export default ThemeProvider; 