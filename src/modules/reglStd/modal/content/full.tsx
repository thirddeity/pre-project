import { Button, type CheckboxOptionType } from "antd";
import { Component } from "react";
import TerminateReasonsModal from "../terminationReasons";

interface State {
  reasonModal: boolean;
  reasonsInfo: CheckboxOptionType<number>[];
}

interface Props {
  updateIsInvalid: (hasItem: boolean) => void;
}

class FullPayment extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      reasonModal: false,
      reasonsInfo: [],
    };
  }

  private showModal = (v: boolean) => {
    this.setState({ reasonModal: v });
  };

  public validate = async (): Promise<boolean> => {
    const { reasonsInfo } = this.state;
    if (reasonsInfo.length === 0) return false;
    return true;
  };

  render() {
    const { reasonModal, reasonsInfo } = this.state;
    const { updateIsInvalid } = this.props;
    return (
      <div className="flex flex-col gap-2">
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
            reasonsInfo={reasonsInfo}
            hideModal={() => this.showModal(false)}
            onConfirm={(reasonsInfo) => {
              this.setState({ reasonsInfo }, () => {
                this.showModal(false);
                updateIsInvalid(!!reasonsInfo.length);
              });
            }}
          />
        </div>
        {!!reasonsInfo.length && (
          <div className="flex flex-col gap-1">
            {reasonsInfo.map((item, idx) => {
              return (
                <div key={idx} className="flex flex-row gap-2 items-center">
                  <i className="fa-solid fa-check text-green-500" />
                  <span>
                    {idx + 1}. {item.label}
                  </span>
                  <i
                    className="fa-regular fa-circle-xmark text-red-500 cursor-pointer"
                    onClick={() => {
                      this.setState({ reasonsInfo: reasonsInfo.filter((ele) => ele.value !== item.value) });
                    }}
                  ></i>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default FullPayment;
