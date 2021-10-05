import slugify from "slugify";

import dbConnect from "../../../utils/dbConnect";
import Category from "../../../models/categoryModel";

export default async function createCategory(req, res) {
  req.body.slug = slugify(req.body.name);
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const category = await Category.create(req.body);
        res.status(201).json({ success: true, category });
      } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
