import type { ReactNode } from "react";
import type { RdxType } from "./rdx";

export interface Lookup {
  code: string;
  label: ReactNode | null;
  opt?: string | null;
  children?: ReactNode;
}

export interface RadioFieldType {
  radio: string;
  email: string;
  rdm: string;
  obtionC: string;
  contract: RdxType;
};