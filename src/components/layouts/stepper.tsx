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

  componentDidMount() {
    this.syncStepsWithRoute();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.syncStepsWithRoute();
    }
  }

  private syncStepsWithRoute = () => {
    const { location } = this.props;
    const path = location.pathname;

    let subIndex = 0;

    if (path.includes("/welcome")) subIndex = 0;
    else if (path.includes("/radio-group")) subIndex = 1;
    else if (path.includes("/ka-test")) subIndex = 2;
    else if (path.includes("/regl-standard")) subIndex = 3;
    else {
      subIndex = -1;
    }

    this.setState({ sub: subIndex });
  };

  private onChangeMain = (value: number) => {
    this.setState({ main: value });
  };

  private onChangeSub = (value: number) => {
    const { navigate } = this.props;
    switch (value) {
      case 0:
        navigate("/welcome");
        break;
      case 1:
        navigate("/radio-group");
        break;
      case 2:
        navigate("/ka-test");
        break;
      case 3:
        navigate("/regl-standard");
        break;
      default:
        break;
    }
  };

  render() {
    const { main, sub } = this.state;
    return (
      <Card className="!min-w-[250px] !max-w-[320px]">
        <Steps
          classNames={{ itemRail: "!hidden" }}
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
                  orientation="vertical"
                  items={[
                    { title: "1. ชื่อนายจ้าง" },
                    { title: "2. ประเภทกิจการ" },
                    { title: "3. ที่ตั้งสำนักงาน" },
                    { title: "4. เพิ่มเงื่อนไขการจ่ายเงินสมทบและประโยชน์ของเงินสมทบ" },
                  ]}
                />
              ),
            },
            { title: "ส่วนที่ 2" },
            { title: "ส่วนที่ 3" },
          ]}
        />
      </Card>
    );
  }
}

const StepperCardComponent = withRouter(StepperCard);
export { StepperCardComponent as StepperCard };
