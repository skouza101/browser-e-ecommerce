import { create } from "zustand";
import axios from "axios";
import toast from 'react-hot-toast';

const BASE_URL = "https://tight-hermia-skouza-d27f0387.koyeb.app/api/orders";

function getUserId() {
  if (typeof window !== "undefined") {
    const user_id = localStorage.getItem("user_id");
    return user_id ? Number(user_id) : "";
  }
  return "";
}

export const useOrderStore = create((set, get) => ({
  user_products: [],
  loading: false,

  fetchOrders: async () => {
    set({ loading: true });
    try {
      const userId = getUserId();
      if (userId){

        const data= await axios.get(`${BASE_URL}/fetchorder?userId=${userId}`);
        set({ user_products: data.data.orders })
        localStorage.setItem("orderSize" , get().user_products.length.toString());
        return data.data.orders;
      }
      else{
        set({ user_products: [] });
        localStorage.setItem("orderSize" , "0");
        return [];
      }
    } catch (error) {
      console.error("Error in fetchOrders function", error);
      toast.error("Failed to load cart items");
    } finally {
      set({ loading: false });
    }
  },
  updateOrder: async (orderid , delta) => {

    try {
      
      const res = await axios.put(`${BASE_URL}/updateorder`, {
        orderid: orderid,
        delta: delta
      });
      toast.success("Cart updated successfully");
      
    } catch (error) {
      console.error("Error in updateOrder function", error);
      toast.error("Failed to update cart");
      
    }
  } ,

  deleteOrder: async (orderid) => {
    try {
      const res = await axios.delete(`${BASE_URL}/deleteorder`, {
        data: { orderId: orderid }
      });
      toast.success("Item removed from cart");
      localStorage.setItem("orderSize" , (get().user_products.length - 1).toString());
    } catch (error) {
      console.error("Error in deleteOrder function", error);
      toast.error("Failed to remove item from cart");
    }
  } ,
  addOrder: async (productid) =>{
    try {
      const userId = getUserId();
      if (userId){

      await axios.post(`${BASE_URL}` , {
        productId: productid,
        userId: Number(getUserId())
      })
      toast.success("Product added to cart successfully", {
        duration: 3000,
        position: "bottom-right",
      });
      localStorage.setItem("orderSize" , (get().user_products.length + 1).toString());
      } else{
        toast.error("Please login to add products to cart");
      }
      
    } catch (error) {
      console.error("Error in addOrder function", error);
      toast.error("Failed to add product to cart");
      
    }
  }
}));
