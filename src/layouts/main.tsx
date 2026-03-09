import React from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router";

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      <Header className="!bg-white">{/* <Image alt="KALogo" width={200} src="" preview={false} /> */}</Header>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Abbot ©{new Date().getFullYear()} Created by Abbot.tech</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
