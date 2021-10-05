
import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/productModel";

export default async function productActions(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            await getProducts(req, res);
            break;
    };
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ results: products.length, products });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};