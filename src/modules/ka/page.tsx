import { Button, Col, Flex, Form, Input, Row } from "antd";
import { Component } from "react";
import { withForm, type WithFormProps } from "../../hoc/withForm";

class KACom extends Component<WithFormProps<{ item: { name: string; age: number } }[]>> {
  render() {
    const { form } = this.props;

    return (
      <Form
        form={form}
        autoComplete="off"
        initialValues={{ items: [{ name: "", age: 100 }] }}
        onFinish={(values) => {
          console.log(values);
        }}
      >
        <Form.List name="items">
          {(fields, { add, remove, move }) =>
            fields.map(({ key, name: index }) => (
              <Row key={key} gutter={[8, 0]}>
                <Col span={2}>
                  <Button onClick={() => add({ name: "a", age: 1 })}>+</Button>
                </Col>
                <Col span={6}>
                  <Form.Item name={[index, "name"]}>
                    <Input onBlur={() => form.submit()}></Input>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name={[index, "age"]}>
                    <Input></Input>
                  </Form.Item>
                </Col>
                <Col span={2} className="text-end">
                  <Button onClick={() => remove(index)} disabled={fields.length === 1}>
                    -
                  </Button>
                </Col>
                <Col span={8} className="text-center">
                  <Button onClick={() => move(index, 1)} disabled={fields.length === 1}>
                    move to index 1
                  </Button>
                </Col>
              </Row>
            ))
          }
        </Form.List>
        <Row>
          <Col span={24}>
            <Flex gap={"middle"}>
              <Button
                onClick={() => form.resetFields()}
                disabled={form.getFieldsValue().length === 1}
                className="w-full"
              >
                reset
              </Button>
              <Button className="w-full" htmlType="submit">
                Submit
              </Button>
            </Flex>
          </Col>
        </Row>
      </Form>
    );
  }
}

const KaPage = withForm(KACom);
export default KaPage;
