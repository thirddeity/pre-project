import { createBrowserRouter, redirect } from "react-router";
import MainLayout from "../layouts/main";
import WelcomePage from "../modules/welcome/page";
import { RadioPage } from "../modules/comTest/page";
import KaPage from "../modules/ka/page";
import ReglStandardPage from "../modules/reglStd/page";

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
        Component: RadioPage,
      },
      {
        path: "ka-test",
        Component: KaPage,
      },
      {
        path: "regl-standard",
        Component: ReglStandardPage,
      },
    ],
  },
]);
