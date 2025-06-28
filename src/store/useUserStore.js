import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  currentUser: null,
  loading: false,
  error: null,
  userForm: {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repeat_password: "",
    profilepic: "",
    isadmin: false,
    createdAt: "",
  },
  setUserFormData: (data) => {
    set((state) => ({ userForm: { ...state.userForm, ...data } }));
  },
  resetUserForm: () =>
    set({
      userForm: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repeat_password: "",
        profilepic: "",
        isadmin: false,
        createdAt: "",
      },
    }),

  registerUser: async (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    set({ loading: true });
    const payload = get().userForm;
    try {
      const userData = await axios.post(
        "http://localhost:3001/api/users/registre",
        payload
      );
      set({ currentUser: userData.data }); 
      get().resetUserForm();
      toast.success("Registration successful! Please login.");
    } catch (error) {
      console.error("Error in registerUser function", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      set({ loading: false });
    }
  },

  loginUser: async (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    set({ loading: true });

    try {
      const payload = {
        email: get().userForm.email,
        password: get().userForm.password,
      };
      const userData = await axios.post(
        "http://localhost:3001/api/users/login",
        payload
      );
      set({ currentUser: userData.data.data }); 
      get().resetUserForm();
      window.localStorage.setItem("userInfo", JSON.stringify(userData.data.data));
      window.localStorage.setItem("user_id", userData.data.data.id);
      window.location.href = "/"; 
      toast.success("Login successful");

    } catch (error) {
      console.error("Error in loginUser function", error);
      if (error.response && error.response.status === 401) {
        set({ error: "Invalid email or password" });
        toast.error("Invalid email or password");

      } else {
        toast.error("Something went wrong");
      }
    } finally {
      set({ loading: false });
    }
  },

  getProfile: async (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    set({ loading: true });
    try {
      const id = get().userForm.id;
      const profileData = await axios.get(
        `http://localhost:3001/api/users/${id}`
      );
      set({ currentUser: profileData.data });
      window.localStorage.setItem("userInfo", JSON.stringify(profileData.data));
      window.localStorage.setItem("user_id", profileData.data.id);
      window.location.href = "/users/profile";
      toast.success("Profile fetched successfully");
    } catch (error) {
      console.error("Error in getProfile function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  logOut: async () => {
    try {
      set({ currentUser: null });
      window.localStorage.removeItem("userInfo");
      window.localStorage.removeItem("user_id");
      window.localStorage.removeItem("totalPrice");
      window.localStorage.removeItem("orderSize");
      window.location.href = "/";
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error in logOut function", error);
      toast.error("Something went wrong while logging out");
    }
  },
}));
