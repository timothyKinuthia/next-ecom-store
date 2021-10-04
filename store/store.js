import { createContext, useReducer, useEffect } from "react";
import { getDataApi } from "../utils/functions";
import { actionTypes } from "./actions";

import reducers from "./reducer/index";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
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
  const initialState = { notify: {}, auth: {} };
  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
