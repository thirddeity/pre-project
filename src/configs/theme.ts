import type { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: "#00A850",
    colorSuccess: "#06A87D",
    colorWarning: "#F4B049",
    colorError: "#E85E4E",
    colorInfo: "#1677ff",

    colorBgBase: "#ffffff",
    colorTextBase: "#333333",

    borderRadius: 8,
    borderRadiusLG: 8,
    borderRadiusSM: 6,

    fontFamily: "KuriousLooped, Arial, Helvetica, sans-serif",
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeSM: 12,
  },
  components: {
    Input: {
      activeShadow: "none",
    },
    InputNumber: {
      activeShadow: "none",
    },
    DatePicker: {
      activeShadow: "none",
    },
    Select: {
      activeOutlineColor: "none",
    },
  },
}