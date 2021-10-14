import slugify from "slugify";

import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/productModel";

export default async function createCategory(req, res) {

  const { method } = req;

    await dbConnect();

  switch (method) {
    case "GET":
      try {
        const product = await Product.findOne({ slug: req.query.slug });
        res.status(200).json({ success: true, product });
      } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
      }
      break;
    default:
      res.status(500).json({ success: false });
      break;
  };
};