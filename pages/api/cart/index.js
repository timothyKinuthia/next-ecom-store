import dbConnect from "../../../utils/dbConnect";
import Cart from "../../../models/cartModel";

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
        { user: req.user._id, "cartItems.product": prodId },
        { $inc: { "cartItems.$.count": 1, "cartItems.$.price": product.price } }
      );
    } else {
      await Cart.updateOne(
        { user: req.user._id },
        {
          $push: {
            cartItems: { product: prodId, count: 1, price: product.price },
          },
        },
        { upsert: true }
      );
    }

    res.status(201).json({ msg: "updated cart successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
