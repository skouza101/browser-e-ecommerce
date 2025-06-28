import { create } from "zustand";

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("preferred-theme") || "night";
  }
  return "night";
};

export const useThemeStore = create((set) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-theme", theme);
    }
    set({ theme });
  },
}));
