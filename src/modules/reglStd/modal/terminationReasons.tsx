import { Checkbox, Divider, Form, Modal, type CheckboxOptionType, type CheckboxProps } from "antd";
import { Component } from "react";
import { ErrorMessage } from "../../../ui/utils/ErrorMessage";
import { withForm, type WithFormProps } from "../../../hoc/withForm";

interface Props extends WithFormProps<{ reasonsChecked: number[] }> {
  open: boolean;
  reasonsInfo: CheckboxOptionType<number>[];
  onConfirm: (selected: CheckboxOptionType<number>[]) => void;
  hideModal: () => void;
}

const reasons: CheckboxOptionType<number>[] = [
  { label: "ลาออกจากงาน", value: 1 },
  { label: "ถูกไล่ออก หรือนายจ้างเลิกจ้าง", value: 2 },
  { label: "นายจ้างเลิกจ้าง", value: 3 },
  { label: "นายจ้างเลิกจ้าง โดยสมาชิกผู้นั้นไม่ได้กระทำความผิด", value: 4 },
  { label: "ปลดออก", value: 5 },
  { label: "เกษียณอายุ", value: 6 },
  { label: "เลิกกิจการ", value: 7 },
  { label: "โอนย้ายไป PVD (Emchoice)", value: 8 },
  { label: "ออกจากงาน - โอนย้ายตามนโยบาย", value: 9 },
  { label: "เสียชีวิต", value: 10 },
  { label: "ทุพพลภาพ", value: 11 },
  { label: "ลาออกจากกองทุนโดยไม่ออกจากงาน", value: 12 },
  { label: "เลิกกองทุน", value: 13 },
  { label: "นายจ้างถอนตัวจากการเป็นนายจ้างของกองทุน", value: 14 },
];

class ReasonsModal extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const { reasonsInfo, form, open } = this.props;
    if (open && prevProps.open !== open) {
      const selectedValues = reasonsInfo.map((item) => item.value);
      form.setFieldValue("reasonsChecked", selectedValues);
    }
  }

  private onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    const { form, reasonsInfo } = this.props;
    const disabledIds = reasonsInfo?.map((i) => i.value) || [];
    const allValues = reasons.map((item) => item.value);

    form.setFieldsValue({ reasonsChecked: e.target.checked ? allValues : disabledIds });
  };

  private handleOk = async () => {
    const { onConfirm, form } = this.props;
    try {
      const values = await form.validateFields();
      const selectedIds = values.reasonsChecked;
      const result = reasons.filter((item) => selectedIds.includes(item.value));
      onConfirm(result);
    } catch (error) {
      console.log("handle ok error:", error);
    }
  };

  private getEnabledValues(): number[] {
    const disabledIds = this.props.reasonsInfo?.map((i) => i.value) ?? [];
    return reasons.filter((item) => !disabledIds.includes(item.value)).map((item) => item.value as number);
  }

  private onGroupChange = (checkedValues: number[]) => {
    const disabledIds = this.props.reasonsInfo?.map((i) => i.value) ?? [];
    const merged = [...new Set([...disabledIds, ...checkedValues])];
    this.setChecked(merged);
  };

  private setChecked = (values: number[]) => {
    const { form } = this.props;
    form.setFieldsValue({ reasonsChecked: values });
    form.validateFields(["reasonsChecked"]);
  };

  render() {
    const { open, hideModal, form, reasonsInfo } = this.props;

    const disabledIds = reasonsInfo?.map((item) => item.value as number) ?? [];
    const enabledValues = this.getEnabledValues();
    const dynamicOptions = reasons.map((option) => ({
      ...option,
      disabled: disabledIds.includes(option.value as number),
    }));

    return (
      <Modal
        open={open}
        title={
          <span className="flex flex-col">
            <span>เหตุสิ้นสุดสมาชิกภาพ</span>
            <Divider size="middle" />
          </span>
        }
        forceRender
        centered
        destroyOnHidden
        okText="ยืนยัน"
        cancelText="ยกเลิก"
        onOk={this.handleOk}
        onCancel={hideModal}
      >
        <Form form={form} layout="vertical" requiredMark={false}>
          <div className="flex flex-col gap-3">
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue, getFieldError }) => {
                const reasonsChecked: number[] = getFieldValue("reasonsChecked") ?? [];
                const checkedEnabledValues = enabledValues.filter((val) => reasonsChecked.includes(val));
                const checkAll = enabledValues.length > 0 && checkedEnabledValues.length === enabledValues.length;
                const indeterminate = checkedEnabledValues.length > 0 && !checkAll;
                const hasError = getFieldError("reasonsChecked").length > 0;

                return (
                  <>
                    <Checkbox
                      indeterminate={indeterminate}
                      onChange={this.onCheckAllChange}
                      checked={checkAll}
                      disabled={enabledValues.length === 0}
                    >
                      ทั้งหมด
                    </Checkbox>

                    <Form.Item
                      name="reasonsChecked"
                      rules={[
                        {
                          validator: (_, value: number[]) => {
                            const enabledChecked = (value ?? []).filter((v) => !disabledIds.includes(v));
                            return enabledChecked.length > 0 ? Promise.resolve() : Promise.reject();
                          },
                        },
                      ]}
                      help={
                        hasError ? <div className="!mt-3">{ErrorMessage("กรุณาระบุเหตุสิ้นสุดสมาชิกภาพ")}</div> : null
                      }
                    >
                      <Checkbox.Group
                        className="!px-4 flex flex-col gap-3"
                        options={dynamicOptions}
                        onChange={this.onGroupChange}
                      />
                    </Form.Item>
                  </>
                );
              }}
            </Form.Item>
          </div>
        </Form>
      </Modal>
    );
  }
}

const TerminateReasonsModal = withForm(ReasonsModal);
export default TerminateReasonsModal;
