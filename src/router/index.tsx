import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/main";
import WelcomePage from "../modules/welcome/page";
import RadioPage from "../modules/radioGroup/page";

export const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: WelcomePage,
      },
      {
        path: "/radio",
        Component: RadioPage,
      },
    ],
  },
]);
