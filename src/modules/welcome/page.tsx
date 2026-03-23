import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Typography, type DatePickerProps } from "antd";
import { Component } from "react";
import { withForm, type WithFormProps } from "../../hoc/withForm";
import { initialValues, type FormValues } from "./type/welcome";
import dayjs from "dayjs";

type Props = WithFormProps<FormValues>;

class WelcomeComponent extends Component<Props> {
  private onChange: DatePickerProps["onChange"] = (_, dateString) => {
    console.log(dateString);
  };

  private onFinish = (form: FormValues) => {
    const result = {
      date1: dayjs(form.date1).toISOString(),
      date2: dayjs(form.date2).toISOString(),
      date3: dayjs(form.date3).toISOString(),
      date4: dayjs(form.date4).toISOString(),
    };
    console.log("form submit =>", result);
  };

  private handleReset = () => {
    const { form } = this.props;
    form.setFieldsValue({ date1: dayjs(), date2: dayjs(), date3: dayjs(), date4: dayjs() });
  };

  render() {
    const { form } = this.props;
    return (
      <Form<FormValues>
        form={form}
        onFinish={this.onFinish}
        initialValues={initialValues}
        layout="horizontal"
        colon={false}
        requiredMark={(label, info) => `${label} ${info.required ? "🥰" : ""}`}
      >
        <Row justify={"space-between"} gutter={[16, 0]}>
          <Col span={12}>
            <Form.Item<FormValues> name="date1" label="DatePicker" required>
              <DatePicker onChange={this.onChange} format="DD/MM/BBBB" className="w-full" picker="month" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FormValues> name="date2" label="Select" required>
              <Select className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FormValues> name="date3" label="InputNumber">
              <InputNumber className="!w-full" mode="input" min="0" max="3" classNames={{ actions: "!hidden" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FormValues> name="date4" label="Input">
              <Input className="w-full" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Button variant="outlined" onClick={this.handleReset} className="w-full">
              Reset
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Col>
        </Row>
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item>
      </Form>
    );
  }
}

const WelcomePage = withForm(WelcomeComponent);
export default WelcomePage;
