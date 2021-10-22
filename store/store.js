import { createContext, useReducer, useEffect } from "react";
import { getDataApi } from "../utils/functions";
import { actionTypes } from "./actions";

import reducers from "./reducer/index";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    cart: {
      products: [],
      total: 0
    },
  };
  const [state, dispatch] = useReducer(reducers, initialState);

  useEffect(() => {
    getDataApi("auth/refreshToken")
      .then((res) => {
        dispatch({
          type: actionTypes.AUTH,
          payload: { token: res.data.accessToken, user: res.data.user },
        });
      })
      .catch((err) => {
        localStorage.removeItem("firstLogin");
        console.log(err);
      });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
