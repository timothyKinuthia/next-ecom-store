import slugify from "slugify";

import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/productModel";

export default async function createProduct(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        await Product.create({ ...req.body, slug: slugify(req.body.name) });
        res
          .status(201)
          .json({ success: true, msg: "Product created successfully" });
      } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
      }
      break;
    case "GET":
      try {
        const products = await Product.find({}).sort("-createdAt");
        res.status(200).json({ success: true, products });
      } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
      }
      break;
    default:
      res.status(500).json({ success: false });
      break;
  }
}
