import React from "react";
import { Layout, theme, Image, Tag, Flex, Select, Button } from "antd";
import { Outlet } from "react-router";
import { StepperCard } from "../components/layouts/stepper";

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      <Header className="!bg-white flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <Image alt="KALogo" width={140} src="images/common/logo.png" preview={false} />
          <div className="text-lg font-bold !ml-4">จดทะเบียนเพิ่มนายจ้าง (New Employer)</div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div>
            <Tag variant="solid" color={colorPrimary}>
              PRODUCTION V2.3 (21/05/2568)
            </Tag>
          </div>
          <Flex vertical align="center" gap={"small"}>
            <div className="leading-none font-bold text-base">บริษัท ทดสอบ ประเทศไทย จำกัด</div>
            <div className="leading-none text-xs">
              <i className="fa-regular fa-clock !mr-1" />
              เวลาเข้าใช้งานล่าสุด 26/06/2568 09:20
            </div>
          </Flex>
          <Select
            className="w-[55px] !rounded-xl"
            defaultValue="th"
            options={[
              { value: "th", label: "TH" },
              { value: "en", label: "EN" },
            ]}
            suffixIcon={null}
            classNames={{ content: "text-end" }}
          />
          <Button variant="text" color="default">
            <i className="fa fa-arrow-right-from-bracket text-[18px]" />
          </Button>
        </div>
      </Header>
      <Layout>
        <Content className="!mt-6 !mx-20 flex flex-row gap-4 justify-center">
          <StepperCard />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              minWidth: 770,
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
