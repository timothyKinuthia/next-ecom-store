import dbConnect from "../../../utils/dbConnect";
import Cart from "../../../models/cartModel";
import Product from "../../../models/productModel";

export default async function userCart(req, res) {
  dbConnect();

  switch (req.method) {
    case "POST":
      await createCart(req, res);
      break;
  }
}

const createCart = async (req, res) => {
  try {
    const { prodId, userId } = req.body;

    const product = await Product.findOne({ _id: prodId });

    const cart = await Cart.findOne({
      user: userId,
      "cartItems.product": prodId,
    });

    if (cart) {
      await Cart.findOneAndUpdate(
        { user: userId, "cartItems.product": prodId },
        {
          $inc: {
            "cartItems.$.quantity": 1,
            "cartItems.$.sum": product.price,
            total: product.price,
          },
        }
      );
    } else {
      await Cart.updateOne(
        { user: userId },
        {
          $inc: { total: product.price },
          $push: {
            cartItems: { product: prodId, quantity: 1, sum: product.price * 1 },
          },
        },
        { upsert: true }
      );
    }

    res.status(201).json({ msg: "updated cart successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
