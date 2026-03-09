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
    const result = { date: dayjs(form.date).toISOString() };
    console.log("form submit =>", result);
  };

  private handleReset = () => {
    const { form } = this.props;
    form.setFieldsValue({ date: dayjs() });
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
      >
        <Row justify={"space-between"} gutter={[16, 0]}>
          <Col span={12}>
            <Form.Item<FormValues> name="date" label="DatePicker">
              <DatePicker onChange={this.onChange} format="DD/MM/BBBB" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FormValues> name="date" label="Select">
              <Select className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FormValues> name="date" label="InputNumber">
              <InputNumber className="!w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<FormValues> name="date" label="Input">
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
