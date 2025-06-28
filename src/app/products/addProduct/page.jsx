"use client";
import { useProductStore } from "@/store/useProductStore";
import { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { addProduct, form, setFormData, loading } = useProductStore();
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    let imageUrl = "";
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "get_img_url");
    formData.append("cloud_name", "dccu4tbxj");
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dccu4tbxj/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      imageUrl = data.secure_url;
      setFormData({ ...form, imgurl: imageUrl });
      toast.success("Product image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error.message);
      toast.error("Failed to upload image. Please try again.");
      setUploading(false);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!form.name || !form.desc || !form.price || !form.imgurl) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (form.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }
    
    addProduct();
  };

  return (
    <form
      className="max-w-md mx-auto my-8 p-6 bg-base-100 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="name"
          id="floating_name"
          value={form.name || ""}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Product Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="desc"
          id="floating_descriptionn"
          value={form.desc || ""}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          description
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="price"
          id="floating_price"
          value={form.price || ""}
          onChange={handleChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_repeat_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Price
        </label>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
        Product Image
      </span>
      <div className="flex items-center justify-center w-full ">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full border-2 py-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-1">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            name="imgurl"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-primary text-yellow-50 btn-lg w-full mt-4"
        disabled={uploading || loading}
      >
        {uploading || loading ? "Uploading..." : "Add Product"}
      </button>
    </form>
  );
};

export default Page;
