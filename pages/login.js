import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { useToasts } from "react-toast-notifications";

import { Context } from "../store/store";
import { postDataApi } from "../utils/functions";
import { actionTypes } from "../store/actions";
import Loading from "../components/loaders/Loading";

const inpuStyles = "py-2 px-3 focus:outline-none focus:bg-gray-50 bg-gray-100";

const Login = () => {

  const router = useRouter();

  const initialState = { email: "", password: "" };

  const [userData, setUserData] = useState(initialState);

  //global state
  const { state, dispatch } = useContext(Context);
  const { notify, auth } = state;

  const { addToast } = useToasts();

  useEffect(() => {
    if (Object.keys(auth).length > 0) router.push("/")
  }, [auth, router]);

  const handleInputChange = (evt) => {
    setUserData({ ...userData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch({ type: actionTypes.NOTIFY, payload: { loading: true } });
    postDataApi("auth/signin", userData)
      .then((res) => {
        Cookie.set("refreshToken", res.data.refreshToken, {
          path: "api/auth/refreshToken",
          expires: 10,
        });
        localStorage.setItem("firstLogin", "true");
        dispatch({
          type: actionTypes.AUTH,
          payload: { token: res.data.accessToken, user: res.data.user },
        });
        setUserData(initialState);
        dispatch({ type: actionTypes.NOTIFY, payload: {} });
        addToast(res.data.msg, { appearance: "success" });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.NOTIFY, payload: {} });
        addToast(err.response.data.msg, { appearance: "error" });
      });
  };
  return (
    <div>
      <Head>
        <title>Sign In</title>
      </Head>
      <div>
        <div className="mt-8 flex justify-center px-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-6 w-4/5 max-w-md"
          >
            <h2 className="text-lg sm:text-3xl font-archivo text-center">
              Login
            </h2>
            <input
              type="text"
              name="email"
              className={inpuStyles}
              placeholder="Email Address"
              value={userData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              className={inpuStyles}
              placeholder="Password"
              value={userData.password}
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
                "Login"
              )}
            </button>
            <p className="text-center">
              Dont have an account?{" "}
              <Link href="/signup">
                <a className="font-archivo">Signup</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
