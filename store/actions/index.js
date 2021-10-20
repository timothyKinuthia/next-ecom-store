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
      
    }
  }
  
};

export const reduceCartItem = (product, cart) => {
  
};

export const deleteCartItem = (product, cart) => {
  
};
