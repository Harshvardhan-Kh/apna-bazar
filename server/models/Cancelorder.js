import { Schema, model } from "mongoose";

const CancelOrderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const Cancelorder = model("Cancelorer", { CancelOrderSchema });
export default Cancelorder;
