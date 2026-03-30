import { Divider } from "antd";
import { Component, createRef } from "react";
import ReasonsButton from "../reasonsBtn";
import ThirdChoiceComponent from "./stair";

interface Props {
  isValid: boolean;
  updateIsValid: (hasItem: boolean) => void;
}

class CondPayment extends Component<Props> {
  private reasonsBtnRef1 = createRef<ReasonsButton>();
  private reasonsBtnRef2 = createRef<ReasonsButton>();

  constructor(props: Props) {
    super(props);
  }

  public validate = (): boolean => {
    const validate1 = this.reasonsBtnRef1.current?.validate();
    const validate2 = this.reasonsBtnRef1.current?.validate();
    const result = !!validate1 && !!validate2;

    return result;
  };

  render() {
    const { updateIsValid, isValid: modalIsValid } = this.props;

    return (
      <div className="flex flex-col gap-4">
        <div className="font-bold">มีเงื่อนไขในการจ่าย</div>
        <div className="!px-4">
          <ReasonsButton
            ref={this.reasonsBtnRef1}
            title="1. ไม่มีสิทธิได้รับเงินสมทบและผลประโยชน์ของเงินสมทบ (0%) ในกรณีดังต่อไปนี้"
            updateIsValid={updateIsValid}
            isValid={modalIsValid}
          />
          <Divider size="middle" />
          <ReasonsButton
            ref={this.reasonsBtnRef2}
            title="2. มีสิทธิได้รับเงินสมทบและผลประโยชน์ของเงินสมทบ (100%) ในกรณีดังต่อไปนี้"
            updateIsValid={updateIsValid}
            isValid={modalIsValid}
          />
          <Divider size="middle" />
          <ThirdChoiceComponent title="3. นอกเหนือจากข้อ (1) หรือ (2) ให้เป็นไปตามอายุงานหรืออายุสมาชิกภาพ" />
          <div className="!mt-8 flex flex-col gap-2">
            <div className="font-bold">ข้อควรทราบ</div>
            <div>
              สำนักงาน ก.ล.ต. ไม่รับจดทะเบียน
              หากกำหนดให้สมาชิกได้รับเงินสมทบและผลประโยชน์ของเงินสมทบเมื่อสมาชิกสิ้นสุดสมาชิกภาพ
              โดยต้องมีอายุงานหรืออายุสมาชิกภาพ (แล้วแต่กรณี) มากกว่า 10 ปีขึ้นไป
              จึงจะได้รับเงินสมทบและผลประโยชน์ของเงินสมทบ 100%
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CondPayment;
