import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";

import { Context } from "../../store/store";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const router = useRouter();

  const { state, dispatch } = useContext(Context);
  const { auth } = state;

  const navLinks = [
    { name: "Cart", icon: <AiOutlineShoppingCart />, link: "/cart" },
    { name: "Login", icon: <AiOutlineUser />, link: "/login" },
  ];

  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <div className="py-1 px-4 sm:px-8 flex-col sm:flex-row justify-center">
      <div className="w-full py-2 flex justify-between items-center">
        <Link href="/">
          <a className="text-3xl font-bold font-archivo">
            DUKA<span className="font-pocifico">poa</span>
          </a>
        </Link>
        <div className="hidden sm:block w-1/4">
          <input
            type="text"
            className="w-full border-b border-black py-1 px-2 focus:outline-none"
            placeholder="Enter to search"
          />
        </div>
        <div className="lg:w-1/6 flex justify-between items-center space-x-4">
          <Link href="/cart">
            <a className="relative group flex items-center space-x-1 text-xl cursor-pointer">
              <span>Cart</span>
              <span>
                <AiOutlineShoppingCart />
              </span>
              <span className="absolute -top-3.5 -right-4 bg-red text-white font-semibold text-sm py-0.5 px-2 rounded-full">
                0
              </span>
              <span className="absolute w-full bg-black transform scale-x-0 group-hover:scale-x-100 transition ease-bloop duration-400 rounded-sm h-0.5 -bottom-1"></span>
              {isActive("/cart") && (
                <span className="absolute w-full bg-black rounded-sm h-0.5 -bottom-1"></span>
              )}
            </a>
          </Link>
          {Object.keys(auth).length === 0 ? (
            <Link href="/login">
              <a className="relative group flex items-center space-x-1 text-xl cursor-pointer">
                <span>Login</span>
                <span>
                  <AiOutlineUser />
                </span>
                <span className="absolute -left-1 w-full bg-black transform scale-x-0 group-hover:scale-x-100 transition ease-bloop duration-400 rounded-sm h-0.5 -bottom-1"></span>
                {isActive("/login") && (
                  <span className="absolute w-full bg-black rounded-sm h-0.5 -left-1 -bottom-1"></span>
                )}
              </a>
            </Link>
          ) : <UserMenu />}
        </div>
      </div>
      <div className="sm:hidden my-4 flex justify-center">
        <input
          type="text"
          className="w-full border-b border-black py-1 px-2 focus:outline-none"
          placeholder="Enter to search"
        />
      </div>
    </div>
  );
};

export default Navbar;
