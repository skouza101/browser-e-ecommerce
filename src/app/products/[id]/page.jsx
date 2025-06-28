"use client";
import { useParams } from "next/navigation";
import { useProductStore } from "@/store/useProductStore";
import { useEffect } from "react";
import Image from "next/image";
import { useOrderStore } from "@/store/useOrderStore.js";
import toast from "react-hot-toast";

const Page = () => {
  const { id } = useParams();
  const { fetchProduct, product, loading } = useProductStore();
  const { addOrder } = useOrderStore();
  const star = Math.floor(Math.random() * 5) + 1; 

  useEffect(() => {
    if (id) {
      fetchProduct(id); 
    }
  }, [id, fetchProduct]);

  const handleAddToCart = async () => {
    try {
      await addOrder(id);
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 w-full p-4">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
            {/* Image skeleton */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md h-80 bg-base-300 rounded-lg"></div>
            </div>
            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="h-8 bg-base-300 rounded w-3/4"></div>
              <div className="h-4 bg-base-300 rounded w-full"></div>
              <div className="h-4 bg-base-300 rounded w-5/6"></div>
              <div className="h-4 bg-base-300 rounded w-4/6"></div>
              <div className="h-6 bg-base-300 rounded w-1/4"></div>
              <div className="h-12 bg-base-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 w-full p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-base-content mb-2">Product Not Found</h2>
          <p className="text-base-content/70">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-base-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Product Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="aspect-square rounded-2xl bg-base-100 shadow-lg overflow-hidden">
                <Image
                  width={300}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  src={product.imgurl}
                  alt={product.name}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-2">
                {product.name}
              </h1>
              <div className="w-20 h-1 bg-primary rounded-full"></div>
            </div>

            {/* Product Description */}
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-base-content/80 leading-relaxed">
                {product.desc}
              </p>
            </div>

            {/* Price and Rating */}
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <p className="text-3xl sm:text-4xl font-bold text-primary">
                    ${product.price}
                  </p>
                  <div className="badge badge-success badge-lg">In Stock</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  {[...Array(star)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-warning"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  ))}
                  {[...Array(5 - star)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-base-content/20"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-base-content/70">
                  <span className="font-medium">({Number(star).toFixed(1)})</span>
                  <span>•</span>
                  <span>345 Reviews</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="divider"></div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                type="button"
                className="btn btn-primary btn-lg w-full sm:w-auto gap-2 text-base font-semibold"
                onClick={handleAddToCart}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                  />
                </svg>
                Add to Cart
              </button>
              
            </div>

            {/* Product Features */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-base-content">Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-base-content/70">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-base-content/70">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-base-content/70">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-base-content/70">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
