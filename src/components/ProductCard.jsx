"use client";
import { useOrderStore } from "@/store/useOrderStore.js";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const star = Math.floor(Math.random() * 5) + 1; 
  const {addOrder } = useOrderStore()
  
  return (
    <div className="w-full  items-center rounded-lg shadow-lg bg-base-100 border border-base-content/10 hover:shadow-xl transition-shadow duration-300 ">
      <Link href={`/products/${product.id}`} className="relative overflow-hidden rounded-t-lg max-h-72 flex items-center justify-center">
      <Image
          className="rounded-t-lg hover:scale-105 transition-transform duration-500 cursor-pointer object-cover"
          src={product.imgurl}
          alt="product image"
          width={500}
          height={200}
      />
      </Link>
      <div className="px-5 pb-5 mt-2 min-w-[250px]:">
        <Link href={`/products/${product.id}`} >
          <h5 className="text-xl font-semibold tracking-tight text-base-content">
            {product.name}
          </h5>
          <p className="line-clamp-2 text-sm text-base-content/70">{product.desc}</p>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {[...Array(star)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  ))}
                  {[...Array(5 - star)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
            {star}.0
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold  text-base-content">
            ${product.price}
          </span>
          <button
                type="button"
                className="btn btn-primary gap-0.5 text-[#e0f7fa]"
              onClick={() => {
                addOrder(product.id)
                
              }}
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
                Add to cart
              </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
