export const actionTypes = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_TO_CART: "ADD_TO_CART",
};

export const addToCart = (product, cart) => {
  if (product.inStock === 0) {
    return {
      type: actionTypes.NOTIFY,
      payload: { error: "This product is out of stock" },
    };
  }

  const newCart = [...cart];

  const idx = newCart.findIndex((item) => item._id === product._id);

  if (idx === -1) {
    return {
      type: actionTypes.ADD_TO_CART,
      payload: [...cart, { ...product, quantity: 1 }],
    };
  } else {
    newCart[idx] = { ...newCart[idx], quantity: newCart[idx].quantity + 1 };

    return { type: actionTypes.ADD_TO_CART, payload: newCart };
  }
};
