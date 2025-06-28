"use client";
import { PaletteIcon, Sun, Moon, Sparkles, Heart, Zap } from "lucide-react";
import { THEMES } from "@/constants/index.js";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/store/useThemeStore";

const SelectTheme = () => {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  // Icon mapping for themes
  const getThemeIcon = (themeName) => {
    switch (themeName) {
      case "light":
        return <Sun className="size-4" />;
      case "night":
        return <Moon className="size-4" />;
      case "synthwave":
        return <Sparkles className="size-4" />;
      case "valentine":
        return <Heart className="size-4" />;
      case "dracula":
        return <Zap className="size-4" />;
      default:
        return <PaletteIcon className="size-4" />;
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle group relative overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative z-10">
          <PaletteIcon className="size-6 group-hover:rotate-180 transition-all duration-500" />
        </div>
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-3 p-2 shadow-2xl bg-base-100/95 backdrop-blur-xl rounded-2xl w-64 border border-base-content/10 z-50"
      >
        {/* Header */}
        <div className="px-3 py-2 mb-2 border-b border-base-content/10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <PaletteIcon className="size-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm text-base-content">
                Choose Theme
              </p>
              <p className="text-xs text-base-content/60">
                Customize your experience
              </p>
            </div>
          </div>
        </div>

        {/* Theme Options */}
        <div className="space-y-1">
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.name}
              className={`
                w-full px-3 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 group relative overflow-hidden
                ${
                  theme === themeOption.name
                    ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 shadow-lg"
                    : "hover:bg-base-content/5 hover:scale-[1.02] hover:shadow-md"
                }
              `}
              onClick={() => {
                setTheme(themeOption.name);
                setIsOpen(false);
              }}
            >
              {/* Active indicator */}
              {theme === themeOption.name && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary rounded-r-full"></div>
              )}

              {/* Icon */}
              <div
                className={`
                p-2 rounded-lg transition-all duration-300
                ${
                  theme === themeOption.name
                    ? "bg-primary/20 text-primary"
                    : "bg-base-content/5 group-hover:bg-primary/10 group-hover:text-primary"
                }
              `}
              >
                {getThemeIcon(themeOption.name)}
              </div>

              {/* Theme Info */}
              <div className="flex flex-col items-start flex-1">
                <span className="text-sm font-medium text-left">
                  {themeOption.label}
                </span>
              </div>

              {/* Color Preview */}
              <div className="flex gap-1 items-center">
                {themeOption.colors.map((color, i) => (
                  <div
                    key={i}
                    className="relative size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-3 py-2 mt-2 border-t border-base-content/10">
          <p className="text-xs text-base-content/50 text-center">
            Theme preferences are saved automatically
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectTheme;
