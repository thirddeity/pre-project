import { Card, Divider, Modal } from "antd";
import { Component, createRef } from "react";
import FullPayment from "./content/full";
import CondPayment from "./content/cond";
import { ErrorMessage } from "../../../ui/utils/ErrorMessage";

interface Props {
  open: boolean;
  radioVal: number | null;
  hideModal: () => void;
}

interface State {
  isValid: boolean;
}

class ConditionModal extends Component<Props, State> {
  private fullPaymentRef = createRef<FullPayment>();

  constructor(props: Props) {
    super(props);
    this.state = {
      isValid: true,
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.open && !this.props.open) {
      this.setState({ isValid: true });
    }
  }

  private handleOk = async () => {
    const { hideModal, radioVal } = this.props;

    if (radioVal === 1 && this.fullPaymentRef.current) {
      const isValid = await this.fullPaymentRef.current.validate();
      console.log("isValid =>", isValid);
      this.setState({ isValid });
      if (!isValid) return;
    }

    hideModal();
  };

  private handleCancel = () => {
    this.setState({ isValid: true });
    this.props.hideModal();
  };

  render() {
    const { open, radioVal } = this.props;
    const { isValid } = this.state;
    return (
      <Modal
        title={
          <span className="flex flex-col">
            <span>เพิ่มเงื่อนไขการจ่ายเงินสมทบและประโยชน์ของเงินสมทบ</span>
            <Divider size="middle" />
          </span>
        }
        open={open}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText="บันทึก"
        cancelText="ยกเลิก"
        width={1000}
        destroyOnHidden
        centered
      >
        <Card className="w-full" classNames={{ root: isValid ? "" : "!border-red-500" }}>
          {radioVal === 1 ? (
            <FullPayment ref={this.fullPaymentRef} updateIsInvalid={(isValid) => this.setState({ isValid })} />
          ) : (
            <CondPayment />
          )}
          {!isValid && <div className="!mt-4">{ErrorMessage("กรุณาระบุเหตุสิ้นสุดสมาชิกภาพ")}</div>}
        </Card>
      </Modal>
    );
  }
}

export default ConditionModal;
