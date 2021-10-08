import slugify from "slugify";

import dbConnect from "../../../utils/dbConnect";
import Category from "../../../models/categoryModel";

export default async function createCategory(req, res) {

  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        await Category.create({name: req.body.name, slug: slugify(req.body.name)});
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, msg: error.message });
      }
      break;
    case "GET":
      try {
        const categories = await Category.find({}).sort("-createdAt");
        res.status(200).json({ success: true, categories });
      } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
