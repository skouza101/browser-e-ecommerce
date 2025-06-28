"use client";
import { useEffect, useState } from "react";
import { useOrderStore } from "@/store/useOrderStore.js";
import { Info, Trash2Icon, ShoppingBag, ArrowRight, Tag, CreditCard } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

function formatPrice(price) {
  return `$${price.toLocaleString()}`;
}

export default function ShoppingCartPage() {
  const { user_products, fetchOrders, updateOrder, loading, deleteOrder } =
    useOrderStore();
  const [cart, setCart] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchOrders();
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load your cart");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCart(user_products);
    setIsLoading(loading);
  }, [user_products, loading]);

  const originalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const savings = 299;
  const pickup = 19;
  const tax = 99;
  const total = originalPrice - savings + pickup + tax;
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("totalPrice", total.toString());
    }
  }, [total]);

  const handleQuantity = async (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
    try {
      await updateOrder(id, delta);
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    try {
      await deleteOrder(id);
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  return (
    <section className="min-h-screen bg-base-300 py-8 antialiased md:py-16">
      <div className="mx-auto max-w-7xl px-4 2xl:px-0">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Shopping Cart
            </h1>
          </div>
          <p className="text-base-content/70 text-lg">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {isloading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, idx) => (
                    <div
                      key={idx}
                      className="group relative overflow-hidden rounded-2xl bg-base-100/50 backdrop-blur-sm border border-base-300 p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-base-300 to-base-200" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-32 bg-base-300 rounded" />
                          <div className="h-3 w-20 bg-base-200 rounded" />
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-base-300 rounded-lg" />
                          <div className="h-10 w-10 bg-base-300 rounded-lg" />
                          <div className="h-10 w-10 bg-base-300 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mx-auto w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="h-12 w-12 text-base-content/40" />
                  </div>
                  <h3 className="text-2xl font-semibold text-base-content mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-base-content/60 mb-8">
                    Looks like you haven't added any items to your cart yet.
                  </p>
                  <Link
                    href="/"
                    className="btn btn-primary btn-lg group"
                  >
                    Start Shopping
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-2xl bg-base-100/50 backdrop-blur-sm border border-base-300 p-6 shadow-lg hover:shadow-xl transition-all duration-300 "
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 min-w-0 flex-1">
                        <div className="relative">
                          <img
                            src={item.imgurl}
                            alt={item.name}
                            className="h-20 w-20 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-shadow"
                          />
                          <div className="absolute -top-2 -right-2 bg-primary text-primary-content text-xs font-bold px-2 py-1 rounded-full">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-base-content truncate group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-base-content/60 text-sm">
                            Unit price: {formatPrice(item.price)}
                          </p>
                          <div className="sm:hidden mt-2">
                            <span className="text-lg font-bold text-primary">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="hidden sm:block">
                          <span className="text-xl font-bold text-primary">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2 bg-base-200 rounded-xl p-1">
                          <button
                            type="button"
                            onClick={() => handleQuantity(item.id, -1)}
                            className="size-8 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content transition-all duration-200 flex items-center justify-center font-bold text-base-content/80"
                          >
                            -
                          </button>
                          <span className="text-lg font-semibold text-base-content min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantity(item.id, 1)}
                            className="size-8 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content transition-all duration-200 flex items-center justify-center font-bold text-base-content/80"
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="size-10 rounded-xl bg-error/10 hover:bg-error hover:text-error-content transition-all duration-200 flex items-center justify-center group/delete text-base-content/80"
                          onClick={() =>
                            document.getElementById("my_modal_5").showModal()
                          }
                        >
                          <Trash2Icon className="size-5 group-hover/delete:scale-110 transition-transform" />
                        </button>
                        
                      </div>
                    </div>
                    {/* Delete Confirmation Modal */}
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-base-100/95 backdrop-blur-md border border-base-300 text-center relative max-w-md">
          <form method="dialog">
            <button
              className="absolute right-4 top-4 text-base-content/50 hover:text-base-content text-2xl transition-colors"
              aria-label="Close"
            >
              &times;
            </button>
          </form>
          <div className="flex justify-center mb-6">
            <div className="bg-error/10 rounded-full p-4 inline-flex">
              <Info className="size-8 text-error" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-base-content mb-3">
            Remove Item
          </h3>
          <p className="text-base-content/70 mb-6">
            Are you sure you want to remove this item from your cart?
          </p>
          <div className="flex justify-center gap-3">
            <form method="dialog">
              <button
                className="btn btn-error"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </form>
            <form method="dialog">
              <button className="btn btn-outline">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
                  </div>
                  
                ))
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Order Summary Card */}
              <div className="rounded-2xl bg-base-100/50 backdrop-blur-sm border border-base-300 p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-base-content">
                    Order Summary
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-base-content/70">Subtotal</span>
                      <span className="font-semibold text-base-content">
                        {formatPrice(originalPrice)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base-content/70">Savings</span>
                      <span className="font-semibold text-success">
                        -{formatPrice(savings)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base-content/70">Pickup</span>
                      <span className="font-semibold text-base-content">
                        {formatPrice(pickup)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base-content/70">Tax</span>
                      <span className="font-semibold text-base-content">
                        {formatPrice(tax)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t border-base-300 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-base-content">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button 
                  type="button" 
                  className="btn btn-primary btn-lg w-full mt-6 group relative overflow-hidden"
                  disabled={originalPrice === 0}
                  onClick={() => {
                    if (originalPrice === 0) {
                      toast.error("Your cart is empty");
                    } else {
                      toast.success("Proceeding to checkout...");
                      // Add checkout logic here
                    }
                  }}
                >
                  <span className="relative z-10">Proceed to Checkout</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="text-sm text-base-content/50">or</span>
                  <Link
                    href="/"
                    className="text-primary text-sm hover:underline flex items-center gap-1 group"
                  >
                    Continue Shopping
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Voucher Card */}
              <div className="rounded-2xl bg-base-100/50 backdrop-blur-sm border border-base-300 p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Tag className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-base-content">
                    Have a voucher?
                  </h3>
                </div>
                
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  const voucherCode = e.target.voucher?.value;
                  if (voucherCode) {
                    toast.success("Voucher code applied successfully!");
                  } else {
                    toast.error("Please enter a voucher code");
                  }
                }}>
                  <div>
                    <input 
                      type="text" 
                      id="voucher" 
                      name="voucher" 
                      className="input input-bordered w-full bg-base-200/50 border-base-300 focus:border-primary transition-colors" 
                      placeholder="Enter voucher code" 
                      required 
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-secondary w-full"
                  >
                    Apply Code
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
}
