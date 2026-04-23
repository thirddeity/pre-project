import { Input } from "antd";
import { Component } from "react";

interface NumericInputProps {
  value?: string | number;
  onChange?: (value: string) => void;
  suffix?: string;
  className?: string;
  valuesError?: string[] | number[];
  maxValError?: string | number;
  minValError?: string | number;
  isError?: boolean;
  onBlur?: () => void;
  isDisabled?: boolean;

  allowDecimal?: boolean;
  decimalPlaces?: number;
}

interface State {
  status: "" | "error";
}

class NumberInput extends Component<NumericInputProps, State> {
  constructor(props: NumericInputProps) {
    super(props);
    this.state = {
      status: "",
    };
  }

  componentDidUpdate(prevProps: NumericInputProps) {
    if (prevProps.isError === true && this.props.isError === false) {
      this.setState({ status: "" });
    }
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, allowDecimal, decimalPlaces } = this.props;
    const { value: inputValue } = e.target;
    const int = /^\d{0,3}$/;
    const decimal = new RegExp(`^\\d{0,3}(\\.\\d{0,${decimalPlaces ?? 2}})?$`);

    const reg = allowDecimal ? decimal : int;

    if (reg.test(inputValue)) {
      onChange?.(inputValue);
      if (inputValue.length > 0) this.setState({ status: "" });
    }
  };

  private handleBlur = () => {
    const { value, valuesError, minValError, maxValError, onBlur, onChange } = this.props;
    let val = value !== undefined && value !== null ? String(value) : "";

    if (val !== "" && val !== ".") {
      const formattedValue = String(parseFloat(val));
      if (formattedValue !== val) {
        val = formattedValue;
        onChange?.(formattedValue);
      }
    } else if (val === ".") {
      val = "";
      onChange?.("");
    }

    const arr = valuesError && valuesError.length ? valuesError.map((e) => String(e)) : [];
    const min = minValError !== undefined ? Number(minValError) : null;
    const max = maxValError !== undefined ? Number(maxValError) : null;
    const numericVal = Number(val);

    if (arr.length && val && arr.includes(val)) {
      this.setState({ status: "error" });
    } else if (min !== null && val !== "" && numericVal < min) {
      this.setState({ status: "error" });
    } else if (max !== null && val !== "" && numericVal > max) {
      this.setState({ status: "error" });
    } else {
      this.setState({ status: "" });
    }

    setTimeout(() => onBlur?.(), 0);
  };

  render() {
    const { value, suffix, className, isError, allowDecimal, isDisabled = false } = this.props;
    const { status } = this.state;
    const statusError = isError || status === "error" ? "error" : "";
    return (
      <Input
        value={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        status={statusError}
        maxLength={allowDecimal ? 6 : 3}
        suffix={suffix}
        inputMode={allowDecimal ? "decimal" : "numeric"}
        className={className ? className : "!w-full"}
        classNames={{
          input: "text-end",
          suffix: "opacity-70",
        }}
        disabled={isDisabled}
      />
    );
  }
}

export default NumberInput;
