import dbConnect from "../../../utils/dbConnect";
import Order from "../../../models/orderModel";
import { auth } from "../../../middlewares/auth";
import Product from "../../../models/productModel";

export default async function userOrder(req, res) {
  dbConnect();
  switch (req.method) {
    case "POST":
      await createOrder(req, res);
      break;
  }
}

const createOrder = async (req, res) => {
  try {
    const { address, mobile, cart, total } = req.body;

    const user = await auth(req, res);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Your are not signed in. Please login to continue" });
    }

    const order = await Order.create({
      user: user._id,
      address,
      mobile,
      cart,
      total,
    });

    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error!" });
  }
};
