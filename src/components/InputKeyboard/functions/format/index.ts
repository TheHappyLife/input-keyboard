import { formatDisplayValue } from "./formatDisplayValue";
import { reverseFormattedValue } from "./reverseFormattedValue";

export type FormatValue = {
  value: string;
  displayValue: string;
};

export const formatValues = (value: string): FormatValue => {
  if (!value) return { value: "", displayValue: "" };
  if (value === "00") value = "0";
  const length = value?.length;

  let numOfDot = 0;
  for (let i = 0; i < length; i++) {
    if (value[i] == ".") numOfDot++;
    if (numOfDot >= 2 && i == length - 1) {
      value = value.slice(0, i);
      break;
    }
    if (numOfDot >= 2 && i < length - 1) {
      return { value: "", displayValue: "" };
    }
  }
  let temp = reverseFormattedValue(value);
  const tempLength = temp.length;
  for (let i = 0; i < tempLength; i++) {
    if (temp[i] == ".") {
      temp = temp.slice(i - 1);
      break;
    }
    if (temp[i] != "0") {
      temp = temp.slice(i);
      break;
    }
  }
  const displayValue = formatDisplayValue(temp);

  return { value: reverseFormattedValue(displayValue), displayValue };
};
