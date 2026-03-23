import { Checkbox, Divider, Modal, type CheckboxOptionType, type CheckboxProps } from "antd";
import { Component } from "react";

interface Props {
  open: boolean;
  onConfirm: () => void;
  hideModal: () => void;
}

interface State {
  reasonsChecked: number[];
}

const reasons: CheckboxOptionType<number>[] = [
  { label: "ลาออกจากงาน", value: 1 },
  { label: "ถูกไล่ออก หรือนายจ้างเลิกจ้าง", value: 2 },
  { label: "นายจ้างเลิกจ้าง", value: 3 },
  { label: "นายจ้างเลิกจ้าง โดยสมาชิกผู้นั้นไม่ได้กระทำความผิด", value: 4 },
  { label: "ปลดออก", value: 5 },
  { label: "เกษียณอายุ", value: 6 },
  { label: "เลิกกิจการ", value: 7 },
  { label: "โอนย้ายไป PVD (Emchoice)", value: 8 },
  { label: "ออกจากงาน - โอนย้ายตามนโยบาย", value: 9 },
  { label: "เสียชีวิต", value: 10 },
  { label: "ทุพพลภาพ", value: 11 },
  { label: "ลาออกจากกองทุนโดยไม่ออกจากงาน", value: 12 },
  { label: "เลิกกองทุน", value: 13 },
  { label: "นายจ้างถอนตัวจากการเป็นนายจ้างของกองทุน", value: 14 },
];

class TerminateReasonsModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      reasonsChecked: [],
    };
  }

  private onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    this.setState({ reasonsChecked: e.target.checked ? reasons.map((e) => e.value) : [] });
  };

  private onGroupChange = (checkedValues: number[]) => {
    this.setState({ reasonsChecked: checkedValues });
  };

  render() {
    const { open, hideModal, onConfirm } = this.props;
    const { reasonsChecked } = this.state;

    const checkAll = reasons.length === reasonsChecked.length;
    const indeterminate = reasonsChecked.length > 0 && reasonsChecked.length < reasons.length;

    return (
      <Modal
        title={
          <span className="flex flex-col">
            <span>เหตุสิ้นสุดสมาชิกภาพ</span>
            <Divider size="middle" />
          </span>
        }
        open={open}
        onOk={onConfirm}
        onCancel={hideModal}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
        centered
      >
        <div className="flex flex-col gap-3">
          <Checkbox indeterminate={indeterminate} onChange={this.onCheckAllChange} checked={checkAll}>
            ทั้งหมด
          </Checkbox>
          <Checkbox.Group
            className="!px-4 flex flex-col gap-3"
            options={reasons}
            value={reasonsChecked}
            onChange={this.onGroupChange}
          />
        </div>
      </Modal>
    );
  }
}

export default TerminateReasonsModal;
