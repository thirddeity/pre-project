import { Button, Col, Form, Input, Row } from "antd";
import { Component } from "react";
import { withForm, type WithFormProps } from "../../hoc/withForm";

class KACom extends Component<WithFormProps<{ item: { name: string; age: number } }[]>> {
  render() {
    const { form } = this.props;

    return (
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        initialValues={{ items: [{ name: "", age: 100 }] }}
        onFinish={(values) => {
          console.log(values);
        }}
      >
        <Form.List name="items">
          {(fields, { add, remove, move }) =>
            fields.map(({ key, name: index }) => (
              <div key={key} className="flex flex-row gap-2 items-center">
                {index}
                <Button onClick={() => add({ name: "a", age: 1 })}>+</Button>
                <Form.Item name={[index, "name"]} label="Name" noStyle>
                  <Input onBlur={() => form.submit()}></Input>
                </Form.Item>
                <Form.Item name={[index, "age"]} label="Age" noStyle>
                  <Input></Input>
                </Form.Item>
                <Button onClick={() => remove(index)} disabled={fields.length === 1}>
                  -
                </Button>
                <Button onClick={() => move(index, 1)} disabled={fields.length === 1}>
                  move to index 1
                </Button>
                <Button onClick={() => form.resetFields()} disabled={fields.length === 1}>
                  reset
                </Button>
              </div>
            ))
          }
        </Form.List>
        <Row>
          <Col span={24}>
            <Input.Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={() => {}}
            />
          </Col>
        </Row>
        <Button htmlType="submit">Submit</Button>
      </Form>
    );
  }
}

const KaPage = withForm(KACom);
export default KaPage;
