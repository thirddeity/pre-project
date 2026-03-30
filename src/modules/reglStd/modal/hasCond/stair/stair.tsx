/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Flex, Form, Input, InputNumber, Row, Select, Typography } from "antd";
import { Component } from "react";
import { withForm, type WithFormProps } from "../../../../../hoc/withForm";
import NumberInput from "../../../../../ui/components/numberInput";
import { getPercentSequence, validatePercentOrder } from "../../../utils/percentValidation";

interface Props extends WithFormProps<StairForm> {
  isDisabled: boolean;
}

type State = {
  percentErrors: PercentErrorMap;
};

type StairForm = {
  items: {
    first: StairItem[];
    mid: StairItem[];
    last: StairItem[];
  };
};

type StairItem = {
  since: number | null;
  lessthan: number | null;
  year: number | null;
  month: number | null;
  day: number | null;
  percent: number | null;
};

type PercentErrorMap = { first: boolean; mid: boolean[]; last: boolean };

class StairInputComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      percentErrors: { first: false, mid: [], last: false },
    };
  }

  private handlePercentBlur = () => {
    const allVal = this.props.form.getFieldsValue();
    const entries = getPercentSequence(allVal.items);
    const errorMap = validatePercentOrder(entries);

    console.log("entries:", JSON.stringify(entries));
    console.log("errorMap:", JSON.stringify(errorMap));

    this.setState({ percentErrors: errorMap });
  };

  render() {
    const { form, isDisabled } = this.props;
    const { percentErrors } = this.state;
    const opt = {
      since: [
        { value: 1, label: "ตั้งแต่" },
        { value: 2, label: "มากกว่า" },
      ],
      lessthan: [
        { value: 1, label: "น้อยกว่า" },
        { value: 2, label: "น้อยกว่าหรือเท่ากับ" },
      ],
    };
    return (
      <Form
        form={form}
        initialValues={{
          items: {
            first: [{ since: null, lessthan: 1, year: null, month: null, day: null, percent: null }],
            mid: [{ since: 1, lessthan: null, year: null, month: null, day: null, percent: null }],
            last: [{ since: 1, lessthan: null, year: null, month: null, day: null, percent: null }],
          },
        }}
        component={false}
        disabled={isDisabled}
        onValuesChange={(changeVal, allVal) => {
          if (changeVal.items?.first) {
            const firstRow = changeVal.items.first[0];
            if (firstRow && firstRow.lessthan) {
              const newVal = firstRow.lessthan;
              const curMid = allVal.items.mid || [];
              const curLast = allVal.items.last || [];

              const updated = (arr: StairItem[]) => arr.map((item) => ({ ...item, since: newVal }));

              form.setFieldsValue({
                items: {
                  mid: updated(curMid),
                  last: updated(curLast),
                },
              });
            }
          }
        }}
      >
        <Form.List name={["items", "first"]}>
          {(fields) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={[8, 0]} align={"middle"}>
                  <Col span={4} offset={20}>
                    <Flex justify="end">
                      <span className="!text-neutral-500 text-end">อัตราการจ่ายเงินสมทบ และผลประโยชน์ของเงินสมทบ</span>
                    </Flex>
                  </Col>
                  <Col flex="52.25px" />
                  <Form.Item {...restField} name={[name, "since"]} hidden>
                    <Input />
                  </Form.Item>
                  <Col span={3}>
                    <Form.Item {...restField} name={[name, "lessthan"]}>
                      <Select options={opt.lessthan} />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item {...restField} name={[name, "year"]}>
                      <NumberInput suffix="ปี" valuesError={[0]} />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item {...restField} name={[name, "month"]}>
                      <NumberInput valuesError={[0]} suffix="เดือน" />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item {...restField} name={[name, "day"]}>
                      <NumberInput valuesError={[0]} suffix="วัน" />
                    </Form.Item>
                  </Col>
                  <Col flex="auto" />
                  <Col span={4}>
                    <Form.Item {...restField} name={[name, "percent"]}>
                      <NumberInput
                        maxValError={100}
                        suffix="%"
                        isError={percentErrors.first}
                        onPercentBlur={this.handlePercentBlur}
                        allowDecimal
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Form.List>
        <Form.List name={["items", "mid"]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={[8, 0]} align={"top"}>
                  <Col>
                    <Button
                      variant="outlined"
                      color="danger"
                      onClick={() => {
                        remove(name);
                        setTimeout(() => {
                          this.handlePercentBlur();
                        }, 0);
                      }}
                    >
                      <i className="fa-solid fa-trash-can" />
                    </Button>
                  </Col>
                  <Form.Item {...restField} name={[name, "lessthan"]} hidden>
                    <Input />
                  </Form.Item>
                  <Col span={3}>
                    <Form.Item
                      {...restField}
                      name={[name, "since"]}
                      getValueProps={(value: number) => ({
                        value: opt.since.find((o) => o.value === value)?.label || value,
                      })}
                    >
                      <Input readOnly />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item {...restField} name={[name, "year"]}>
                      <NumberInput valuesError={[0]} suffix="ปี" />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item {...restField} name={[name, "month"]}>
                      <NumberInput valuesError={[0]} suffix="เดือน" />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item {...restField} name={[name, "day"]}>
                      <NumberInput valuesError={[0]} suffix="วัน" />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Flex className="!h-[32px]" align="center" justify="center">
                      แต่ไม่ถึง
                    </Flex>
                  </Col>
                  <Col span={2}>
                    <Form.Item {...restField} name={[name, "untilYear"]}>
                      <NumberInput valuesError={[0]} suffix="ปี" />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item {...restField} name={[name, "untilMonth"]}>
                      <NumberInput valuesError={[0]} suffix="เดือน" />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item {...restField} name={[name, "untilDay"]}>
                      <NumberInput valuesError={[0]} suffix="วัน" />
                    </Form.Item>
                  </Col>
                  <Col flex="auto" />
                  <Col span={4}>
                    <Form.Item {...restField} name={[name, "percent"]}>
                      <NumberInput
                        maxValError={100}
                        suffix="%"
                        onPercentBlur={this.handlePercentBlur}
                        isError={percentErrors.mid[name] ?? false}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ))}
              <Row className="!mb-6">
                <Col flex="52.25px" />
                <Col span={9}>
                  <Button
                    variant="filled"
                    color="primary"
                    icon={<i className="fa fa-square-plus" />}
                    block
                    onClick={() => {
                      const curFirstLessthan = form.getFieldValue(["items", "first", 0, "lessthan"]);
                      add({
                        since: curFirstLessthan || 1,
                        lessthan: 1,
                        year: null,
                        month: null,
                        day: null,
                        untilYear: null,
                        untilMonth: null,
                        untilDay: null,
                        percent: null,
                      });
                      setTimeout(() => {
                        this.handlePercentBlur();
                      }, 0);
                    }}
                  >
                    เพิ่มขั้นอัตราเงินสมทบ
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Form.List>
        <Form.List name={["items", "last"]}>
          {(fields) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={[8, 0]} align={"top"}>
                  <Col flex="52.25px" />
                  <Form.Item {...restField} name={[name, "lessthan"]} hidden>
                    <Input />
                  </Form.Item>
                  <Col span={3}>
                    <Form.Item
                      {...restField}
                      name={[name, "since"]}
                      getValueProps={(value: number) => ({
                        value: opt.since.find((o) => o.value === value)?.label || value,
                      })}
                    >
                      <Input readOnly />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item {...restField} name={[name, "year"]}>
                      <NumberInput valuesError={[0]} suffix="ปี" />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item {...restField} name={[name, "month"]}>
                      <NumberInput valuesError={[0]} suffix="เดือน" />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Form.Item {...restField} name={[name, "day"]}>
                      <NumberInput valuesError={[0]} suffix="วัน" />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Flex className="!h-[32px]" align="center" justify="center">
                      ขึ้นไป
                    </Flex>
                  </Col>
                  <Col flex="auto" />
                  <Col span={4}>
                    <Form.Item {...restField} name={[name, "percent"]}>
                      <NumberInput
                        maxValError={100}
                        suffix="%"
                        onPercentBlur={this.handlePercentBlur}
                        isError={percentErrors.last}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Form.List>
        {/* <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item> */}
      </Form>
    );
  }
}

const StairComponent = withForm(StairInputComponent);
export default StairComponent;
