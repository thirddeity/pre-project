import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Card, Col, Radio, type RadioGroupProps } from "antd";
import { Component, type ReactNode } from "react";

interface RadioItem<T> {
  key: T;
  children: ReactNode;
}

interface Props<T> extends RadioGroupProps {
  value: RadioItem<T>[];
  itemVal: T;
  itemsCount?: number | null;
  headerContent: ReactNode;
}

interface State {
  isVisible: boolean;
}

class RadioGroup<T> extends Component<Props<T>, State> {
  constructor(props: Props<T>) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  render() {
    const { isVisible } = this.state;
    const { value, itemsCount, headerContent, ...props } = this.props;

    const item =
      isVisible || !itemsCount ? value : value.slice(0, itemsCount ?? 2);

    return (
      <Col>
        {headerContent}
        <Radio.Group {...props} vertical>
          {item.map((item) => (
            <Card
              key={String(item.key)}
              classNames={{ body: "bg-green-200" }}
              onClick={() => console.log(item.key)}
              style={{ cursor: "pointer" }}
            >
              <Radio value={item.key}>{item.children}</Radio>
            </Card>
          ))}

          {itemsCount && (
            <Button onClick={() => this.setState({ isVisible: !isVisible })}>
              {isVisible ? <UpOutlined /> : <DownOutlined />}
            </Button>
          )}
        </Radio.Group>
      </Col>
    );
  }
}

export default RadioGroup;
