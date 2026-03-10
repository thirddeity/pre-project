import type { ReactNode } from "react";

export interface Lookup {
  code: string;
  label: ReactNode | null;
  opt?: string | null;
  children?: ReactNode;
}