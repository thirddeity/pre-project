import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

export interface FormValues {
  date1: Dayjs;
  date2: Dayjs;
  date3: Dayjs;
  date4: Dayjs;
}

export const initialValues: FormValues = {
  date1: dayjs(),
  date2: dayjs(),
  date3: dayjs(),
  date4: dayjs(),
};