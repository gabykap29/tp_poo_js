import { model, Schema } from "mongoose";

const salesSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, default: 0 },
  salesDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
});

const Sales = model("Sales", salesSchema);
export default Sales;
