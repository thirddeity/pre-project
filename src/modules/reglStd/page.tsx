import { Component } from "react";
import { withForm, type WithFormProps } from "../../hoc/withForm";
import { Button, Col, Dropdown, Flex, Radio, Row, type DropdownProps, type RadioChangeEvent } from "antd";
import ConditionModal from "./modal/condition";

type Props = WithFormProps;

type State = {
  dropdown: {
    open: boolean;
    radioVal: number | null;
  };
  modal: {
    open: boolean;
  };
};

class ReglStandardComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dropdown: {
        open: false,
        radioVal: null,
      },
      modal: {
        open: false,
      },
    };
  }

  private handleOpenChange: DropdownProps["onOpenChange"] = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      this.setState({ dropdown: { ...this.state.dropdown, open: nextOpen } });
    }
  };

  private onChange = (e: RadioChangeEvent) => {
    this.setState({ dropdown: { ...this.state.dropdown, radioVal: e.target.value } });
  };

  render() {
    const {
      dropdown: { open, radioVal },
      modal,
    } = this.state;

    return (
      <div>
        <Row>
          <Col span={24}>
            <Flex justify="center">
              <Dropdown
                open={open}
                trigger={["click"]}
                popupRender={() => (
                  <div className="rounded-lg !shadow-lg">
                    <Radio.Group
                      className="!py-[8px] !px-[16px]"
                      vertical
                      onChange={this.onChange}
                      value={radioVal}
                      options={[
                        { value: 1, label: "จ่าย 100% ยกเว้นกรณีดังต่อไปนี้ จ่าย 0%" },
                        { value: 2, label: "มีเงื่อนไขในการจ่าย" },
                        { value: 3, label: "เงื่อนไขซับซ้อน" },
                      ]}
                    />
                    <Flex className="!p-[8px]">
                      <Button
                        type="primary"
                        block
                        onClick={() => this.setState({ dropdown: { open: false, radioVal }, modal: { open: true } })}
                      >
                        ยืนยัน
                      </Button>
                    </Flex>
                  </div>
                )}
                onOpenChange={this.handleOpenChange}
              >
                <Button variant="filled" color="primary" icon={<i className="fa fa-square-plus" />} block>
                  เพิ่มเงื่อนไขการจ่ายเงินสมทบและประโยชน์ของเงินสมทบ
                </Button>
              </Dropdown>
            </Flex>
          </Col>
        </Row>
        <ConditionModal
          open={modal.open}
          radioVal={radioVal}
          hideModal={() => this.setState({ modal: { open: false }, dropdown: { radioVal: null, open: false } })}
        />
      </div>
    );
  }
}

const ReglStandardPage = withForm(ReglStandardComponent);
export default ReglStandardPage;
