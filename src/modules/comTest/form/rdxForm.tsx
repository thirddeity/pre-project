import {
  AutoComplete,
  Button,
  Card,
  Form,
  Input,
  type FormInstance,
} from "antd";
import { Component } from "react";
import type { RadioFieldType } from "../type/radio";
import { PlusOutlined } from "@ant-design/icons";
import Text from "antd/es/typography/Text";

interface Props {
  form: FormInstance<RadioFieldType>;
}

class RdxForm extends Component<Props> {
  render() {
    return (
      <div>
        <Form.List name="names">
          {(fields, { add, remove }, { errors }) => (
            <div className="flex flex-col gap-4">
              <>
                {fields.map((field, index) => (
                  <Card>
                    <Form.Item required={false} key={`${field.key} ${index}`}>
                      <Form.Item {...field}>
                        <Form.Item
                          name={[field.name, "prefix"]}
                          label="คำนำหน้า"
                        >
                          <AutoComplete
                            className="w-full"
                            options={[
                              { value: "นาย", label: "นาย" },
                              { value: "นาง", label: "นาง" },
                              { value: "แง่ง", label: "แง่ง" },
                            ]}
                            placeholder="กรุณาเลือก"
                          />
                        </Form.Item>

                        <Form.Item name={[field.name, "name"]} label="ชื่อ">
                          <Input className="w-full" />
                        </Form.Item>

                        <Form.Item
                          name={[field.name, "lastname"]}
                          label="นามสกุล"
                        >
                          <Input className="w-full" />
                        </Form.Item>

                        <Form.Item name={[field.name, "pid"]} label="เลขบัตร">
                          <Input className="w-full" />
                        </Form.Item>
                      </Form.Item>
                      {fields.length > 1 ? (
                        <Text
                          type="danger"
                          underline
                          onClick={() => remove(index)}
                        >
                          ลบข้อมูล
                        </Text>
                      ) : null}
                    </Form.Item>
                  </Card>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    className="w-full"
                    icon={<PlusOutlined />}
                  >
                    เพิ่ม
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            </div>
          )}
        </Form.List>
      </div>
    );
  }
}
export default RdxForm;
