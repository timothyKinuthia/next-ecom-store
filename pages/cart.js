import React, { useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useToasts } from "react-toast-notifications";

import { Context } from "../store/store";
import CartItem from "../components/cart/CartItem";
import Payment from "./payment";

const Cart = () => {
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [payment, setPayment] = useState(false);

  //global state
  const { state, dispatch } = useContext(Context);
  const { cart } = state;

  //toast
  const { addToast } = useToasts();

  const handlePayment = () => {
    if (!address || !mobile) {
      addToast("Please add your address and phone no.", {
        appearance: "error",
      });
      return;
    }
    setPayment(true);
  };

  if (cart.products.length === 0)
    return (
      <div className="py-4 text-lg sm:text-xl font-bold text-center">
        Cart is Empty!
      </div>
    );
  return (
    <div className="mt-4 px-4 pb-4 max-w-7xl mx-auto">
      <Head>
        <title>Cart</title>
      </Head>
      <div className="flex flex-col">
        <h2 className="py-2 text-center border-b border-gray-100 font-pocifico font-bold text-lg sm:text-2xl">
          Shopping Cart
        </h2>
        <div className="lg:flex justify-between">
          <table className="mt-4 table-auto w-full lg:w-2/3">
            <tbody className="">
              {cart.products.map((prod) => (
                <CartItem
                  key={prod._id}
                  product={prod}
                  cart={cart}
                  dispatch={dispatch}
                />
              ))}
            </tbody>
          </table>
          <div className="mt-4 lg:w-1/4 space-y-4 max-w-xl mx-auto">
            <h2 className="text-lg text-center font-semibold">Shipping</h2>
            <div className="flex flex-col">
              <label htmlFor="address" className="text-sm">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(evt) => setAddress(evt.target.value)}
                className="border py-1 bg-gray-50 focus:outline-none focus:bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="mobile" className="text-sm">
                Mobile
              </label>
              <input
                type="text"
                value={mobile}
                onChange={(evt) => setMobile(evt.target.value)}
                className="border py-1 bg-gray-50 focus:outline-none focus:bg-white"
              />
            </div>
            <Link href="/">
              <a className="mt-2 block text-light font-bold">
                Continue Shopping
              </a>
            </Link>
            <div className="text-lg font-semibold">
              Total: <span className="ml-1 text-red">${cart.total}</span>
            </div>
            {payment ? (
              <Payment
                total={cart.total}
                address={address}
                mobile={mobile}
                state={state}
                dispatch={dispatch}
              />
            ) : (
              <button
                onClick={handlePayment}
                className="w-full block py-1 bg-light text-white font-bold"
              >
                Proceed to checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
