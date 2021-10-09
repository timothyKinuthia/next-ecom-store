import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";

const ProductItem = ({ product }) => {
  return (
    <div>
      <div className="p-2 max-w-md mx-auto space-y-2">
        <img
          className="w-full object-cover"
          src={product.images[0].url}
          alt={product.title}
        />
        <div className="text-sm text-gray-500">{product.title}</div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">
            In Stock: {product.inStock}{" "}
          </span>
          <span className="font-semibold text-gray-700">$ {product.price}</span>
        </div>
        <div className="flex justify-between">
          <button className="flex items-center bg-gray-100 p-1 rounded">
            <span>Add</span>
            <span className="ml-2">
              <AiOutlineShoppingCart />
            </span>
          </button>
          <Link href={`product/${product._id}`}>
            <a className="flex items-center bg-gray-100 p-1 rounded">
              <span>View</span>
              <span className="ml-2">
                <AiOutlineEye />
              </span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
