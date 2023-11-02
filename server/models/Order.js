import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    shippingcharge: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

export default Order;
