"use client";

import { useProductStore } from "@/store/useProductStore";
import Loading from "./Loading";
import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  const { products, loading, fetchProducts } = useProductStore();


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="px-2">
      <div className="flex justify-between items-center mb-8 px-2 sm:px-2 md:px-16 lg:px-20 w-screen ">
        <Link href="/products/addProduct">
          <button className="btn btn-primary gap-0.5 text-[#e0f7fa]">
            <PlusCircleIcon className="size-5" />
            Add Product
          </button>
        </Link>
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      <main className="w-full px-0 sm:px-2 md:px-16 lg:px-20 py-4 sm:py-6 md:py-8 transition-colors duration-300">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-center justify-center ">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
