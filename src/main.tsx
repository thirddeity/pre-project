import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import th from "antd/es/date-picker/locale/th_TH";
import thTH from "antd/es/locale/th_TH";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { RouterProvider } from "react-router/dom";
import { router } from "./router/index.tsx";
import dayjs from "dayjs";
import "./styles/index.css";
import "./styles/icons/all.css";
import { themeConfig } from "./configs/theme.ts";

dayjs.locale("th_TH");
dayjs.extend(buddhistEra);

const buddhistLocale: typeof th = {
  ...th,
  lang: {
    ...th.lang,
    fieldDateFormat: "BBBB-MM-DD",
    fieldDateTimeFormat: "BBBB-MM-DD HH:mm:ss",
    yearFormat: "BBBB",
    cellYearFormat: "BBBB",
  },
};

const globalBuddhistLocale: typeof thTH = {
  ...thTH,
  DatePicker: {
    ...thTH.DatePicker!,
    lang: buddhistLocale.lang,
  },
};

createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={themeConfig} locale={globalBuddhistLocale} wave={{ disabled: true }}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </ConfigProvider>,
);
