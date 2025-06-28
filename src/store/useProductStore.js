import { create } from "zustand";
import toast from "react-hot-toast"; // FIX: Use a valid toast library for React
import axios from "axios";

const BASE_URL = "http://localhost:3001";

function getUserId() {
  if (typeof window !== "undefined") {
    const user_id = localStorage.getItem("user_id");
    return user_id ? Number(user_id) : "";
  }
  return "";
}

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  product: null,
  error: {
    message: "",
    type: "",
  },

  form: {
    name: "",
    desc: "",
    price: "",
    imgurl: "",
  },
  setFormData: (data) => set((state) => ({ form: { ...state.form, ...data } })),
  resetForm: () => set({ form: { name: "", desc: "", price: "", imgurl: "" } }),

  addProduct: async (e) => {
    
    
    try {
      const payload = get().form;
      const userId = getUserId();
      if (userId) { 
        if (e && typeof e.preventDefault === "function") {
          e.preventDefault();
        }
        set({ loading: true });
      const res = await axios.post(`http://localhost:3001/api/products/`, { ...payload });

      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully");
      window.location.href = "/";
      } else{
        toast.error("Please login to add a product");
      }
    } catch (error) {
      console.error("Error in addProduct ", error.response?.data?.message || error.message);
      const errorMessage = error.response?.data?.message || "Failed to add product. Please try again.";
      toast.error(errorMessage);
      set({ error: {
        message: errorMessage, type: error.response?.data?.type } });
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${BASE_URL}/api/products`);
      set({ products: data });
    } catch (error) {
      console.error("Error in fetchProducts function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({ product: data });
    } catch (error) {
      console.error("Error in fetchProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { form } = get(); // FIX: Use 'form' instead of 'formData'
      await axios.put(`${BASE_URL}/api/products/${id}`, form);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error in updateProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      await get().fetchProducts();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error in deleteProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
