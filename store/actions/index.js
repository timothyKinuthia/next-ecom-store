export const actionTypes = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_TO_CART: "ADD_TO_CART",
  REDUCE_FROM_CART: "REDUCE_FROM_CART",
  DLETE_CART_ITEM: "DLETE_CART_ITEM",
};

export const addToCart = (product, cart) => {
  if (product.inStock > 0) {
    const cartProducts = [...cart.products];
    const idx = cartProducts.findIndex((prod) => prod._id === product._id);

    if (idx === -1) {
      const sum = product.price * 1;
      const newCart = {
        ...cart,
        products: [...cartProducts, { ...product, quantity: 1, sum }],
        total: cart.total + sum,
      };

      return { type: actionTypes.ADD_TO_CART, payload: newCart };
    } else {
      const sum = cartProducts[idx].sum + cartProducts[idx].price;
      const cartTotal = cart.total + cartProducts[idx].price;
      cartProducts[idx] = {
        ...cartProducts[idx],
        quantity: cartProducts[idx].quantity + 1,
        sum: sum,
      };

      return {
        type: actionTypes.ADD_TO_CART,
        payload: { ...cart, products: cartProducts, total: cartTotal },
      };
    }

    
  }
};

export const reduceCartItem = (product, cart) => {
  const cartProducts = [...cart.products];
  const idx = cartProducts.findIndex((prod) => prod._id === product._id);

  cartProducts[idx] = {
    ...cartProducts[idx],
    quantity: cartProducts[idx].quantity - 1,
    sum: cartProducts[idx].sum - cartProducts[idx].price,
  };

  return {
    type: actionTypes.REDUCE_FROM_CART,
    payload: {
      ...cart,
      products: cartProducts,
      total: cart.total - cartProducts[idx].price,
    },
  };
};

export const deleteCartItem = (product, cart) => {
  const cartProducts = [...cart.products];
  const idx = cartProducts.findIndex((prod) => prod._id === product._id);
  const total = cart.total - cartProducts[idx].sum;
  cartProducts.splice(idx, 1);

  return {
    type: actionTypes.REDUCE_FROM_CART,
    payload: {
      ...cart,
      products: cartProducts,
      total: total * 1,
    },
  };
};
