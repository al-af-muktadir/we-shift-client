import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Coverage from "../pages/Coverage";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import AuthLayout from "../pages/Auth/AuthLayout";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import SendPercel from "../pages/SendPercel/SendPercel";
import DashboardLayout from "../Layoutts/DashboardLayout";
import MyParcels from "../Layoutts/MyPercel/Myparcel";
import Payment from "../pages/Payment";
import PaymentSuccess from "../pages/SendPercel/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/SendPercel/Payment/PaymentCancelled";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },
      {
        path: "send-percel",
        element: (
          <PrivateRoute>
            <SendPercel></SendPercel>
          </PrivateRoute>
        ),
        loader: () => fetch("../../public/warehouses.json"),
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("../../public/warehouses.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcel",
        Component: MyParcels,
      },
      {
        path: "payment/:parcel_id",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
    ],
  },
]);
