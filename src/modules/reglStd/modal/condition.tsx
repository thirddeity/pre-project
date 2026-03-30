import { Card, Divider, Modal } from "antd";
import { Component, createRef } from "react";
import ReasonsButton from "./reasonsBtn";
import CondPayment from "./hasCond/content";

interface Props {
  open: boolean;
  radioVal: number | null;
  hideModal: () => void;
}

interface State {
  isValid: boolean;
}

class ConditionModal extends Component<Props, State> {
  private reasonsBtnRef = createRef<ReasonsButton>();
  private condPaymentRef = createRef<CondPayment>();

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
    if (radioVal === 1 && this.reasonsBtnRef.current) {
      const isValid = this.reasonsBtnRef.current.validate();
      console.log("isValid 1 =>", isValid);
      this.setState({ isValid });
      if (!isValid) return;
    } else if (radioVal === 2 && this.condPaymentRef.current) {
      const isValid = this.condPaymentRef.current.validate();
      console.log("isValid 2 =>", isValid);
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
        width={"95vw"}
        classNames={{ body: "!max-h-[70vh] !overflow-y-auto" }}
        destroyOnHidden
        centered
      >
        <Card className="w-full" classNames={{ root: isValid ? "" : "!border-red-500" }}>
          {radioVal === 1 ? (
            <ReasonsButton
              ref={this.reasonsBtnRef}
              title="จ่าย 100% ยกเว้นกรณีดังต่อไปนี้ จ่าย 0%"
              updateIsValid={(isValid) => this.setState({ isValid })}
              isValid={isValid}
            />
          ) : (
            <CondPayment
              ref={this.condPaymentRef}
              isValid={isValid}
              updateIsValid={(isValid) => this.setState({ isValid })}
            />
          )}
        </Card>
      </Modal>
    );
  }
}

export default ConditionModal;
