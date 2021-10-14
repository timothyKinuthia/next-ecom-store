import React, { useState } from "react";
import Head from "next/head";

import { getDataApi } from "../../utils/functions";

const ProductDetail = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="py-4 px-2 bg-gray-100">
      <Head>
        <title>{product.title}</title>
      </Head>
      <div className="max-w-7xl p-3 rounded-md bg-white mx-auto sm:grid grid-cols-1 sm:grid-cols-2 gap-12">
        <div className="">
          <img
            className="w-full object-cover rounded-md"
            src={product.images[activeIndex].url}
            alt=""
          />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {product.images.map((img, i) => (
              <img
                key={img.public_id}
                src={img.url}
                alt={product.title}
                onClick={() => setActiveIndex(i)}
                className={`${
                  activeIndex === i ? "border-2" : ""
                } border-black rounded-md cursor-pointer`}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg sm:text-3xl font-bold capitalise">
              {product.title}
            </h2>
            <div className="flex justify-between mr-4 text-gray-400">
              <h3 className="text-lg sm:text-2xl font-medium">
                ${product.price.toFixed(2)}{" "}
              </h3>
              {product.inStock > 0 ? <span>In Stock: {product.inStock}</span> : <span className="text-red">Out of stock</span>}
            </div>

            <p className="text-gray-500">{product.description}</p>
          </div>
          <div className="mt-10">
            <button className="w-full p-3 bg-gray-700 hover:bg-gray-800 text-gray-50 font-bold rounded-md">
              Add to cart
            </button>
          </div>
          <div className="my-10 h-0.5 bg-gray-100"></div>
          <div>
            <h3 className="text-gray-600 font-medium text-lg">Features</h3>
            <p className="mt-2 text-gray-500">{product.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

export async function getServerSideProps(context) {
  const res = await getDataApi(`product/${context.query.slug}`);
  return {
    props: {
      product: res.data.product,
    },
  };
}
