import { AutoComplete, Button, Card, Flex, List, Row } from "antd";

function Main() {
  const data = [
    {
      title: "Title 1",
    },
    {
      title: "Title 2",
    },
    {
      title: "Title 3",
    },
    {
      title: "Title 4",
    },
  ];
  const options = [
    {
      label: "1",
      options: [
        {
          value: 1,
          label: (
            <Flex align="center" justify="space-between">
              test
              <a href="https://www.google.com/" target="_blank">
                more
              </a>
            </Flex>
          ),
        },
      ],
    },
  ];

  return (
    <Flex vertical gap={"large"}>
      <Row>
        <Button type="primary">Button</Button>
      </Row>
      <Row>
        <AutoComplete options={options} className="w-26" placeholder="input here" />
      </Row>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title} classNames={{ body: "bg-blue-200" }} variant="borderless">
              Card content
            </Card>
          </List.Item>
        )}
      />
    </Flex>
  );
}

export default Main;
