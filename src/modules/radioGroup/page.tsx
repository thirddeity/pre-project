import { Component } from "react";
import RadioGroup from "./components/radioGroup";
import { Button, Form, Input, type FormProps } from "antd";
import { withForm, type WithFormProps } from "../../hoc/withForm";
import type { Lookup } from "./type/radio";

// type Props = WithFormProps<RadioFieldType>;
type Props = WithFormProps<RadioFieldType>;

interface State {
  mock: Lookup[];
}

type RadioFieldType = {
  radio: string;
  email: string;
  rdm: string;
  obtionC: string;
};

class RadioPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      mock: [
        {
          code: "PID",
          label:
            "Username เป็นเลขบัตรประชาชน/เลขผู้เสียภาษี [สำหรับชาวต่างชาติ]",
        },
        {
          code: "EMAIL",
          label: "Username เป็น E-mail ของสมาชิก",
        },
        {
          code: "RDM",
          label: "อย่ามองฟ้าต่ำ",
        },
        {
          code: "RDX",
          label: "อย่าทําหินแตก",
        },
      ],
    };
  }

  private renderRadioItems = () => {
    const { form } = this.props;
    const { mock } = this.state;

    return mock.map((e) => {
      if (e.code === "EMAIL") {
        return {
          ...e,
          label: <div className="flex flex-col gap-2">{e.label}</div>,
          children: (
            <>
              {form.getFieldValue("radio") === "EMAIL" && (
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "กรุณากรอก!" }]}
                >
                  <Input
                    placeholder="กรุณากรอก"
                    className="w-full"
                    onChange={(e) =>
                      form.setFieldValue("email", e.target.value)
                    }
                  />
                </Form.Item>
              )}
            </>
          ),
        };
      }
      if (e.code === "RDM") {
        return {
          ...e,
          label: <div className="flex flex-col gap-2">{e.label}</div>,
          children: (
            <>
              {form.getFieldValue("radio") === "RDM" && (
                <Form.Item
                  name="rdm"
                  rules={[{ required: true, message: "กรุณาเลือก!" }]}
                >
                  <RadioGroup
                    items={[
                      { code: "obtiona", label: "Option A" },
                      { code: "obtionb", label: "Option B" },
                      {
                        code: "obtionc",
                        label: "Option C",
                        children: (
                          <Form.Item
                            name="obtionC"
                            rules={[
                              {
                                required:
                                  form.getFieldValue("rdm") === "obtionc",
                                message: "กรุณากรอก!",
                              },
                            ]}
                          >
                            <Input
                              placeholder="กรุณากรอก"
                              className="w-full"
                              onChange={(e) =>
                                form.setFieldValue("obtionC", e.target.value)
                              }
                            />
                          </Form.Item>
                        ),
                      },
                    ]}
                    onChange={(e) => {
                      if (e !== "obtionc") form.setFieldValue("obtionC", "");
                      form.setFieldValue("rdm", e);
                    }}
                    selected={form.getFieldValue("rdm")}
                    showItem={2}
                  />
                </Form.Item>
              )}
            </>
          ),
        };
      }
      return e;
    });
  };

  private onFinish = (values: RadioFieldType) => {
    console.log("Success:", values);
  };

  private onFinishFailed: FormProps<RadioFieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    const { form } = this.props;
    return (
      <Form
        form={form}
        initialValues={{ radio: "", email: "", rdm: "", obtionC: "" }}
        name="radio-test"
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item<RadioFieldType> shouldUpdate>
          {({ getFieldValue, setFieldValue }) => (
            <Form.Item
              name="radio"
              rules={[{ required: true, message: "กรุณาเลือก!" }]}
            >
              <RadioGroup
                headerContent={<>Radio Group ! </>}
                items={this.renderRadioItems()}
                onChange={(e) => setFieldValue("radio", e)}
                selected={getFieldValue("radio")}
                showItem={2}
              />
            </Form.Item>
          )}
        </Form.Item>
        <Form.Item label={null}>
          <div className="flex flex-row justify-between gap-4">
            <Button
              type="default"
              className="w-full"
              onClick={() => form.resetFields()}
            >
              Reset
            </Button>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

const RadioPageComponent = withForm(RadioPage);
export { RadioPageComponent as RadioPage };
