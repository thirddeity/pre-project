import { Card, Radio, type RadioGroupProps } from "antd";
import Text from "antd/es/typography/Text";
import { Component, type ReactNode } from "react";
import type { Lookup } from "../type/radio";

interface Props extends Omit<RadioGroupProps, "onChange"> {
  items: Lookup[];
  selected: string | null;
  showItem?: number | null;
  headerContent?: ReactNode;
  onChange: (key: string) => void;
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
    const { items, showItem, selected, headerContent, onChange, ...props } =
      this.props;

    const item: Lookup[] =
      isVisible || !showItem ? items : items.slice(0, showItem ?? 2);

    return (
      <div className="flex flex-col gap-4">
        {headerContent}
        <Radio.Group
          {...props}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          vertical
        >
          {item.map((item) => {
            return (
              <Card
                aria-rowindex={-1}
                aria-colindex={-1}
                key={item.code}
                classNames={{
                  body:
                    selected === item.code
                      ? "border-1 border-green-500"
                      : "border-1 border-neutral-300",
                }}
                onClick={() => {
                  onChange(item.code);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="flex flex-col gap-2">
                  <Radio value={item.code} className="w-full">
                    {item.label}
                  </Radio>
                  {item.children}
                </div>
              </Card>
            );
          })}

          {showItem && (
            <Text
              onClick={() => this.setState({ isVisible: !isVisible })}
              className="cursor-pointer"
            >
              {isVisible ? (
                <span className="text-orange-300">แสดงน้อยลง</span>
              ) : (
                <span className="text-green-500">แสดงเพิ่มเติม</span>
              )}
            </Text>
          )}
        </Radio.Group>
      </div>
    );
  }
}

export default RadioGroup;
