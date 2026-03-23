import { Button, Divider } from "antd";
import { Component } from "react";

class CondPayment extends Component {
  render() {
    return (
      <div className="flex flex-col gap-4">
        <div className="font-bold">มีเงื่อนไขในการจ่าย</div>
        <div className="!px-4">
          <div className="flex flex-row gap-2 items-center">
            <div className="font-bold">1. ไม่มีสิทธิได้รับเงินสมทบและผลประโยชน์ของเงินสมทบ (0%) ในกรณีดังต่อไปนี้</div>
            <Button color="primary" variant="text" icon={<i className="fa-solid fa-circle-plus" />} iconPlacement="end">
              เหตุสิ้นสุดสมาชิกภาพ
            </Button>
          </div>
          <Divider size="middle" />
          <div className="flex flex-row gap-2 items-center">
            <div className="font-bold">2. มีสิทธิได้รับเงินสมทบและผลประโยชน์ของเงินสมทบ (100%) ในกรณีดังต่อไปนี้</div>
            <Button color="primary" variant="text" icon={<i className="fa-solid fa-circle-plus" />} iconPlacement="end">
              เหตุสิ้นสุดสมาชิกภาพ
            </Button>
          </div>
          <Divider size="middle" />
        </div>
      </div>
    );
  }
}

export default CondPayment;
