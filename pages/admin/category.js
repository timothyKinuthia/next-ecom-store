import React, { useState } from "react";
import AdminNav from "../../components/product/AdminNav";
import { postDataApi } from "../../utils/functions";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const handleInputChange = (evt) => {
    setName(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = await postDataApi("product/category", { name });
    console.log(res);
  };
  return (
    <div className="sm:flex h-screen">
      <AdminNav />
      <div className="mt-6 w-full sm:w-4/5 flex flex-col space-y-6 items-center">
        <h2 className="text-2xl font-bold font-pocifico">Create Category</h2>
        <form onSubmit={handleSubmit} className="w-full px-2">
          <input
            type="text"
            onChange={handleInputChange}
            className="w-2/3 border border-black py-1 px-2 focus:outline-none"
          />
          <button className="ml-3 w-1/4 border py-1 px-2 bg-gray-800 focus:bg-gray-900 text-white font-bold">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryCreate;
