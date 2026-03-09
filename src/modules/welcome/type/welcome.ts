import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export interface FormValues {
  date: Dayjs;
}

export const initialValues: FormValues = {
  date: dayjs(),
};