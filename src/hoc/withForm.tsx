/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, type FormInstance } from "antd";
import type { ComponentType } from "react";

export interface WithFormProps<T> {
  form: FormInstance<T>;
}

export function withForm<P extends WithFormProps<any>>(ChildComponent: ComponentType<P>) {
  type FormDataType = P extends WithFormProps<infer T> ? T : any;
  return (props: Omit<P, keyof WithFormProps<any>>) => {
    const [form] = Form.useForm<FormDataType>();
    return <ChildComponent {...(props as P)} form={form} />;
  };
}
