import { createBrowserRouter, redirect } from "react-router";
import MainLayout from "../layouts/main";
import WelcomePage from "../modules/welcome/page";
<<<<<<< HEAD
import RadioPage from "../modules/radioGroup/page";
=======
import RadioGroup from "../modules/radioGroup/page";
>>>>>>> 6a2894af16a001acb3f208ab61d80f03224f5b21

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
<<<<<<< HEAD
        path: "/radio",
        Component: RadioPage,
=======
        path: "radio-group",
        Component: RadioGroup,
>>>>>>> 6a2894af16a001acb3f208ab61d80f03224f5b21
      },
    ],
  },
]);
