import { Card, Form, Radio } from "antd";
import { Component } from "react";
import type { CheckboxGroupProps } from "antd/es/checkbox";
import { withForm, type WithFormProps } from "../../../../../hoc/withForm";
import StairComponent from "./stair";

interface Props extends WithFormProps<FormType> {
  title: string;
}

interface FormType {
  period_type: number | null;
}

const options: CheckboxGroupProps<number>["options"] = [
  { label: "อายุงาน", value: 1 },
  { label: "อายุสมาชิกภาพ", value: 2 },
];

class ThirdChoice extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { title, form } = this.props;
    return (
      <div className="flex flex-col gap-4">
        <div className="font-bold">{title}</div>
        <Card className="!bg-neutral-50">
          <Form form={form}>
            <Form.Item<FormType> noStyle shouldUpdate>
              {({ getFieldValue }) => {
                const isDisabled = !getFieldValue("period_type");
                return (
                  <div className="flex flex-col">
                    <Form.Item name="period_type" noStyle>
                      <Radio.Group options={options} className="!mb-4" />
                    </Form.Item>
                    <StairComponent isDisabled={isDisabled} />
                  </div>
                );
              }}
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const ThirdChoiceComponent = withForm(ThirdChoice);
export default ThirdChoiceComponent;
