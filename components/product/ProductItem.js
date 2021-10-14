import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";

import { Context } from "../../store/store";
import { addToCart } from "../../store/actions";

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(Context);

  return (
    <div>
      <div className="p-2 max-w-md mx-auto space-y-2">
        <img
          className="w-full object-cover rounded-md"
          src={product.images[0].url}
          alt={product.title}
        />
        <div className="text-sm text-gray-500">{product.title}</div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">
            {product.inStock > 0 ? (
              <span>In Stock: {product.inStock} </span>
            ) : (
              "Out of Stock"
            )}
          </span>
          <span className="font-semibold text-gray-700">$ {product.price}</span>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => dispatch(addToCart(product, state.cart))}
            className="flex items-center bg-gray-100 hover:bg-gray-200 py-1.5 px-2 rounded-md"
          >
            <span>Add</span>
            <span className="ml-2">
              <AiOutlineShoppingCart />
            </span>
          </button>
          <Link href={`product/${product.slug}`}>
            <a className="flex items-center bg-gray-100 hover:bg-gray-200 py-1.5 px-2 rounded-md">
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
