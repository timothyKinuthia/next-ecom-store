import { actionTypes } from "../actions/index";

const reducers = (state, action) => {
  switch (action.type) {
    case actionTypes.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    case actionTypes.AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case actionTypes.REDUCE_FROM_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case actionTypes.DLETE_CART_ITEM:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
