import React from "react";
import Link from "next/link";
import { IoTrashSharp } from "react-icons/io5";
import { addToCart, deleteCartItem, reduceCartItem } from "../../store/actions";

const CartItem = ({ product, cart, dispatch }) => {
  const handleRemoveCartItem = () => {
    const idx = cart.products.findIndex((prod) => prod._id === product._id);
    if (cart.products[idx].quantity === 1) return;
    dispatch(reduceCartItem(product, cart));
  };
  return (
    <tr className="border-b border-gray-100">
      <td>
        <img
          src={product.images[0].url}
          alt={product.title}
          className="h-20 w-16 object-cover object-center"
        />
      </td>
      <td className="">
        <h4>
          <Link href={`/product/${product.slug}`}>
            <a className="text-sm">{product.title}</a>
          </Link>
        </h4>
        <span className="text-gray-500">${product.price} </span>
        {product.inStock > 0 ? (
          <h5 className="text-gray-400 text-sm">In Stock: {product.inStock}</h5>
        ) : (
          <h5 className="text-red text-sm">Out of Stock</h5>
        )}
      </td>
      <td className="sm:space-x-3 align-middle">
        <div className="flex flex-col sm:flex-row justify-center py-4 sm:py-0">
          <button
            onClick={() => dispatch(addToCart(product, cart))}
            className="px-2 w-8 border"
          >
            +
          </button>
          <span className="text-center my-2 sm:my-0 sm:mx-2">
            {product.quantity}
          </span>
          <button onClick={handleRemoveCartItem} className="px-2 w-8 border">
            -
          </button>
        </div>
      </td>
      <td className="px-4 lg:px-0">
        <button onClick={() => dispatch(deleteCartItem(product, cart))}>
          <IoTrashSharp />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
