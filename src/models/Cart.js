import { model, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

const Cart = model("Cart", cartSchema);

export default Cart;
