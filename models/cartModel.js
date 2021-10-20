import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    cartItems: [
        {
            product: {
                type: mongoose.Types.ObjectId, ref: "Product"
            },
            count: { type: Number },
            price: { type: Number }
        }
    ],
    totalPrice: {
        type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
