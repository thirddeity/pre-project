import { Component, type ReactNode } from "react";
import RadioGroup from "./components/radioGroup";
import { Button, Form, Input, type FormProps } from "antd";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props {}
interface Lookup {
  code: string | null;
  label: ReactNode | null;
  opt: string | null;
}
interface State {
  selected: string | null;
  mock: Lookup[];
}

type RadioFieldType = {
  radio?: string;
};

class RadioPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selected: null,
      mock: [
        {
          code: "PID",
          label:
            "Username เป็นเลขบัตรประชาชน/เลขผู้เสียภาษี [สำหรับชาวต่างชาติ]",
          opt: null,
        },
        {
          code: "EMAIL",
          label: "Username เป็น E-mail ของสมาชิก",
          opt: null,
        },
        {
          code: "RDM",
          label: "Username และ Password เป็น Random",
          opt: null,
        },
        {
          code: "RDX",
          label: "Username และ Password เป็น Random",
          opt: null,
        },
      ],
    };
  }

  private renderRadioItems = () => {
    const { mock, selected } = this.state;

    return mock.map((e) => {
      if (e.code === "EMAIL") {
        return {
          ...e,
          label: (
            <>
              {e.label}
              {selected === "EMAIL" && (
                <Input
                  placeholder="please input"
                  style={{ width: 120, marginInlineStart: 12 }}
                />
              )}
            </>
          ),
        };
      }
      return e;
    });
  };

  private onFinish: FormProps<RadioFieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  private onFinishFailed: FormProps<RadioFieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    const { selected } = this.state;
    return (
      <Form
        name="radio-test"
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item<RadioFieldType>>
          <RadioGroup
            headerContent={<>Header ! </>}
            items={this.renderRadioItems()}
            onChange={(e) => this.setState({ selected: e.target.value })}
            selected={selected}
            showItem={2}
          />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default RadioPage;
