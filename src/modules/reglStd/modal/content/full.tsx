import { Button } from "antd";
import { Component } from "react";
import TerminateReasonsModal from "../terminationReasons";

interface State {
  reasonModal: boolean;
}

class FullPayment extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      reasonModal: false,
    };
  }

  private showModal = (v: boolean) => {
    this.setState({ reasonModal: v });
  };

  render() {
    const { reasonModal } = this.state;
    return (
      <div className="flex flex-row gap-2 items-center">
        <div className="font-bold">จ่าย 100% ยกเว้นกรณีดังต่อไปนี้ จ่าย 0%</div>
        <Button
          color="primary"
          variant="text"
          icon={<i className="fa-solid fa-circle-plus" />}
          iconPlacement="end"
          onClick={() => this.showModal(true)}
        >
          เหตุสิ้นสุดสมาชิกภาพ
        </Button>
        <TerminateReasonsModal
          open={reasonModal}
          hideModal={() => this.showModal(false)}
          onConfirm={() => this.showModal(false)}
        />
      </div>
    );
  }
}

export default FullPayment;
