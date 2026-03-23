import { Card, Divider, Modal } from "antd";
import { Component } from "react";
import FullPayment from "./content/full";
import CondPayment from "./content/cond";

interface Props {
  open: boolean;
  radioVal: number | null;
  hideModal: () => void;
}

class ConditionModal extends Component<Props> {
  render() {
    const { open, hideModal, radioVal } = this.props;
    return (
      <Modal
        title={
          <span className="flex flex-col">
            <span>เพิ่มเงื่อนไขการจ่ายเงินสมทบและประโยชน์ของเงินสมทบ</span>
            <Divider size="middle" />
          </span>
        }
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="บันทึก"
        cancelText="ยกเลิก"
        width={1000}
      >
        <Card className="w-full">{radioVal === 1 ? <FullPayment /> : <CondPayment />}</Card>
      </Modal>
    );
  }
}

export default ConditionModal;
