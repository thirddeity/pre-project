import { createBrowserRouter, redirect } from "react-router";
import MainLayout from "../layouts/main";
import WelcomePage from "../modules/welcome/page";
import RadioGroup from "../modules/radioGroup/page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        loader: () => redirect("/welcome"),
      },
      {
        path: "welcome",
        Component: WelcomePage,
      },
      {
        path: "radio-group",
        Component: RadioGroup,
      },
    ],
  },
]);
