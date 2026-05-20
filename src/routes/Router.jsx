import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Coverage from "../pages/Coverage";

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
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("../../public/warehouses.json"),
      },
    ],
  },
]);
