import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";

import ImageUploads from "../../components/images/ImageUploads";
import Loading from "../../components/loaders/Loading";
import AdminNav from "../../components/product/AdminNav";
import { getDataApi, postDataApi } from "../../utils/functions";

const inputStyles =
  "w-full bg-gray-100 focus:bg-white border py-2 px-3 focus:outline-none";

const ProductCreate = () => {
  const initialState = {
    title: "",
    price: "",
    description: "",
    content: "",
    category: "",
    checked: false,
    inStock: "",
  };
  const [product, setProduct] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [prodImgs, setProdImgs] = useState([]);
  const [loading, setLoading] = useState(false);

  //toast
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
    setProduct({ ...product, [evt.target.name]: evt.target.value });
  };
  const handleCategoryChange = (evt) => {
    setProduct({ ...product, category: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    postDataApi("product/createProduct", { ...product, images: prodImgs })
      .then((res) => {
        setProduct(initialState);
        setProdImgs([]);
        setLoading(false);
        addToast(res.data.msg, { appearance: "success" });
      })
      .catch((err) => {
        addToast(err.response.data.msg, {appearance: "error"});
        setLoading(false);
      });
  };

  return (
    <div className="sm:flex border-t">
      <AdminNav />
      <form
        onSubmit={handleSubmit}
        className="mt-6 w-full items-center sm:w-4/5 flex flex-col space-y-6 px-2 mb-6"
      >
        <h2 className="sm:w-2/4 text-left font-bold text-xl sm:text-2xl font-pocifico">
          Create Product
        </h2>
        <div className="w-5/6 sm:w-4/5">
          <ImageUploads prodImgs={prodImgs} setProdImgs={setProdImgs} />
        </div>
        <div className="sm:w-4/5 space-y-6">
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
              className={inputStyles}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className={inputStyles}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className={inputStyles}
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <input
              type="text"
              name="content"
              value={product.content}
              onChange={handleInputChange}
              className={inputStyles}
            />
          </div>
          <div>
            <label htmlFor="inStock">inStock</label>
            <input
              type="number"
              name="inStock"
              value={product.inStock}
              onChange={handleInputChange}
              className={inputStyles}
            />
          </div>

          <div>
            <label htmlFor="checked">Checked</label>
            <select
              name="checked"
              id="checked"
              className={inputStyles}
              onChange={handleInputChange}
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              className={inputStyles}
              onChange={handleCategoryChange}
            >
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className={`w-full bg-light hover:bg-dark flex justify-center p-2 text-white font-bold ${
              loading ? "pointer-events-none" : ""
            }`}
          >
            {loading ? (
              <Loading type="TailSpin" color="white" height={20} width={20} />
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;
