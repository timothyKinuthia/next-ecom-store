import React, { useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useToasts } from "react-toast-notifications";

import { Context } from "../store/store";
import validate from "../utils/validateUser";
import { postDataApi } from "../utils/functions";
import { actionTypes } from "../store/actions";
import Loading from "../components/loaders/Loading";

const inpuStyles = "py-2 px-3 focus:outline-none focus:bg-gray-50 bg-gray-100";

const Signup = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [ userData, setUserData ] = useState(initialState);

  //context
  const { state, dispatch } = useContext(Context);

  const { notify } = state;

  const { addToast } = useToasts();

  const handleInputChange = (evt) => {
    setUserData({ ...userData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const error = validate(
      userData.name,
      userData.email,
      userData.password,
      userData.confirmPassword
    );

    if (error.message) {
      addToast(error.message, { appearance: "error" });
      return;
    }

    dispatch({ type: actionTypes.NOTIFY, payload: { loading: true } });
    postDataApi("auth/register", userData)
      .then((res) => {
        console.log(res);
        dispatch({ type: actionTypes.NOTIFY, payload: { loading: false } });
        setUserData(initialState);
        addToast("Success", { appearance: "success" });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.NOTIFY, payload: { loading: false } });
        addToast(err.response.data.msg, { appearance: "error" });
      });
  };

  return (
    <div>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div>
        <div className="mt-8 flex justify-center px-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-6 w-4/5 max-w-md"
          >
            <h2 className="text-lg sm:text-3xl font-archivo text-center">
              Signup
            </h2>
            <input
              type="text"
              name="name"
              value={userData.name}
              className={inpuStyles}
              placeholder="Your Name"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="email"
              value={userData.email}
              className={inpuStyles}
              placeholder="Email Address"
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              value={userData.password}
              className={inpuStyles}
              placeholder="Password"
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              className={inpuStyles}
              placeholder="Confirm Password"
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className={`bg-gray-800 hover:bg-gray-900 py-2 flex justify-center text-white font-bold ${
                notify.loading ? "pointer-events-none" : ""
              }`}
            >
              {notify.loading ? (
                <Loading type="TailSpin" color="#fff" height={25} width={25} />
              ) : (
                "Signup"
              )}
            </button>
            <p className="text-center">
              Already have an account?{" "}
              <Link href="/login">
                <a className="font-archivo">Login</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
