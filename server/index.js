import express, { response } from "express";
import dotenv, { populate } from "dotenv";
import mongoose, { set } from "mongoose";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

const connectDb = () => {
  const conn = mongoose.connect(process.env.MONGODB_URI);
  if (conn) {
    console.log("mongoDB connection susccesfull");
  }
};

app.post("/signup", async (req, res) => {
  try {
    const { name, password, email, mobile, address, gender } = req.body;
    const newUser = new User({
      name,
      password,
      email,
      mobile,
      address,
      gender,
    });

    const saveUser = await newUser.save();
    return res.json({
      sucsess: true,
      message: "signup successed ",
      data: saveUser,
    });
  } catch (e) {
    return res.json({
      sucsess: false,
      message: e.message,
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const loginFind = await User.findOne({ email, password }).select(
    "name email gender mobile"
  );

  if (!loginFind) {
    return res.json({
      sucsess: false,
      message: "invalid credentials",
    });
  }

  return res.json({
    sucsess: true,
    message: " successfully Loged In",
    data: loginFind,
  });
});

app.post("/product", async (req, res) => {
  try {
    const { name, description, price, brand, image } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      brand,
      image,
    });

    const savedProduct = await newProduct.save();

    return res.json({
      sucsess: true,
      message: "Product saved successfully",
      data: savedProduct,
    });
  } catch (err) {
    return res.json({
      sucsess: false,
      message: err.message,
    });
  }
});

app.get("/products", async (req, res) => {
  const products = await Product.find();

  res.json({
    sucsess: true,
    message: "All Products found successfully",
    data: products,
  });
});

app.get("/product/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const findProduct = await Product.findOne({ _id: _id });
    return res.json({
      success: true,
      message: "Product found successfully",
      data: findProduct,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: "Product not found",
    });
  }
});

app.delete("/product/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.json({
        sucsess: false,
        message: "Product Not found to delete",
      });
    }

    await Product.deleteOne({ _id });

    return res.json({
      sucsess: true,
      message: "Product deleted successfully",
      data: Product,
    });
  } catch (err) {
    return res.json({
      sucsess: false,
      message: err.message,
    });
  }
});

app.put("/product/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, description, price, brand, image } = req.body;

    if (!name || !description || !price || !brand || !image) {
      return res.json({
        success: false,
        message: "All feilds are required",
      });
    }

    const updatedProduct = await Product.updateOne(
      { _id },
      { $set: { name, description, price, brand, image } }
    );

    return res.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
});

app.get("/products/search", async (req, res) => {
  const { q } = req.query;
  const product = await Product.find({ name: { $regex: q, $options: "i" } });

  res.json({
    success: true,
    message: "Products successfully founded",
    data: product,
  });
});

app.post("/order", async (req, res) => {
  const { user, product, address, quantity, status, shippingcharge } = req.body;

  try {
    const getOrder = new Order({
      user,
      product,
      address,
      quantity,
      status,
      shippingcharge,
    });

    const savedOrder = await getOrder.save();

    res.json({
      success: true,
      message: "Order saved successfully",
      data: savedOrder,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/orders", async (req, res) => {
  const orders = await Order.find().populate("user product");
  orders.forEach((order) => {
    order.user.password = undefined;
  });

  res.json({ success: true, message: "all orders found", data: orders });
});

app.get("/orders/:id", async (req, res) => {
  const { id } = req.params;
  const userOrder = await Order.findById(id).populate("user product");
  
  userOrder.user.password = undefined;

  res.json({
    success: true,
    message: `Order successfully found `,
    data: userOrder,
  });
});

app.get("/order/user/:id", async (req, res) => {
  const { id } = req.params;
  try {

    const userOrder = await Order.find({ user: id }).populate(
      "user product"
    );

    userOrder.forEach((order) => {
      order.user.password = undefined
    })

    res.json({
      success: true,
      message: `Order successfully found`,
      data: userOrder,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

app.patch("/order/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updateOrder = await Order.updateOne({
    id: id,
    $set: { status: status },
  });

  res.json({
    success: true,
    message: "Order was successfully updated",
    data: updateOrder,
  });
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
  connectDb();
});
