import React, { useState, useEffect } from "react";
import AdminNav from "../../components/product/AdminNav";
import { getDataApi, postDataApi } from "../../utils/functions";
import { useToasts } from "react-toast-notifications";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const { addToast } = useToasts();

  useEffect(() => {
    (() => {
      getDataApi("product/category")
        .then((res) => setCategories(res.data.categories))
        .catch((err) => {
          addToast(err.response.data.msg, { appearance: "error" });
        });
    })();
  }, [addToast]);

  const handleInputChange = (evt) => {
    setName(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = await postDataApi("product/category", { name });
  };
  return (
    <div className="sm:flex h-screen border-t">
      <AdminNav />
      <div className="mt-6 w-full sm:w-4/5 flex flex-col space-y-6 items-center px-2">
        <h2 className="text-2xl font-bold font-pocifico">Create Category</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            onChange={handleInputChange}
            className="w-2/3 border border-black py-1 px-2 focus:outline-none"
          />
          <button className="ml-4 w-1/4 border py-1 px-2 bg-gray-800 focus:bg-gray-900 text-white font-bold">
            Save
          </button>
        </form>
        <div className="w-full flex flex-col space-y-2">
          {categories.length > 0 &&
            categories.map((cat) => (
              <div key={cat._id} className="bg-gray-100 py-2 px-4 w-2/3">
                {cat.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
