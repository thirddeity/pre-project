import { Component } from "react";
import { Card, Steps } from "antd";
import { withRouter, type WithRouterProps } from "../../hoc/withRouter";

type State = {
  main: number;
  sub: number;
};

type Props = WithRouterProps;

class StepperCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      main: 0,
      sub: 0,
    };
  }

  private onChangeMain = (value: number) => {
    this.setState({ main: value });
  };
  private onChangeSub = (value: number) => {
    const { router } = this.props;
    this.setState({ sub: value }, () => {
      switch (value) {
        case 0:
          router("/welcome");
          break;
        case 1:
          console.log("value sub =>", value);
          router("/radio-group");
          break;
        default:
          break;
      }
    });
  };

  render() {
    const { main, sub } = this.state;
    return (
      <Card className="!min-w-[250px]">
        <Steps
          classNames={{ itemRail: "hidden" }}
          current={main}
          onChange={this.onChangeMain}
          orientation="vertical"
          items={[
            {
              title: "ส่วนที่ 1",
              content: main === 0 && (
                <Steps
                  type="dot"
                  current={sub}
                  onChange={this.onChangeSub}
                  className="!mt-2"
                  classNames={{ itemTitle: "!w-[130px]" }}
                  orientation="vertical"
                  items={[
                    {
                      title: "1. ชื่อนายจ้าง",
                    },
                    {
                      title: "2. ประเภทกิจการ",
                    },
                    {
                      title: "3. ที่ตั้งสำนักงาน",
                    },
                    {
                      title: "4. กรรมการบริษัท",
                    },
                  ]}
                />
              ),
            },
            {
              title: "ส่วนที่ 2",
            },
            {
              title: "ส่วนที่ 3",
            },
          ]}
        />
      </Card>
    );
  }
}
const StepperCardComponent = withRouter(StepperCard);
export { StepperCardComponent as StepperCard };
