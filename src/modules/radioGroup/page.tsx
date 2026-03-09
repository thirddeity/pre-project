import { Component } from "react";
import RadioGroup from "./components/radioGroup";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props {}
interface State {
  itemVal: number;
}
class RadioPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      itemVal: 0,
    };
  }

  render() {
    const { itemVal } = this.state;
    return (
      <div>
        <RadioGroup
          headerContent={<>Header ! </>}
          onChange={(e) => {
            this.setState({ itemVal: Number(e.target.value) });
          }}
          value={[
            { key: 1, children: "A" },
            { key: 2, children: "B" },
            { key: 3, children: "C" },
            { key: 4, children: "D" },
          ]}
          itemVal={itemVal}
          itemsCount={2}
        />
      </div>
    );
  }
}

export default RadioPage;
