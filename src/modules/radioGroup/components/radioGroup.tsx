import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Card, Radio, type RadioGroupProps } from "antd";
import { Component, type ReactNode } from "react";

interface Lookup {
  code: string | null;
  label: ReactNode | null;
  opt: string | null;
}

interface Props extends RadioGroupProps {
  items: Lookup[];
  selected: string | null;
  showItem?: number | null;
  headerContent: ReactNode;
}

interface State {
  isVisible: boolean;
}

class RadioGroup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  render() {
    const { isVisible } = this.state;
    const { items, showItem, headerContent, ...props } = this.props;

    const item: Lookup[] =
      isVisible || !showItem ? items : items.slice(0, showItem ?? 2);

    return (
      <div className="flex flex-col gap-4">
        {headerContent}
        <Radio.Group {...props} vertical>
          {item.map((item) => (
            <Card
              key={item.code}
              classNames={{ body: "bg-green-200" }}
              style={{ cursor: "pointer" }}
            >
              <Radio value={item.code}>{item.label}</Radio>
            </Card>
          ))}

          {showItem && (
            <Button onClick={() => this.setState({ isVisible: !isVisible })}>
              {isVisible ? <UpOutlined /> : <DownOutlined />}
            </Button>
          )}
        </Radio.Group>
      </div>
    );
  }
}

export default RadioGroup;
