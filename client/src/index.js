import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";
import Home from "./views/Home/Home";
import Signup from "./views/Signup/Signup";
import Login from "./views/Login/Login";
import Orders from "./views/Orders/Orders";
import BuyPage from "./views/BuyPage/BuyPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/log-in",
    element: <Login />,
  },
  {
    path: "/my-orders",
    element: <Orders />,
  },
  {
    path: "/buy/:id",
    element: <BuyPage />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <RouterProvider router={router} />
  </>
);
