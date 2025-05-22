import { ReactNode } from "react";
import { DisplayType, StandardValues } from "../components/InputKeyboard/type";

export const getStandardValues = (
  value: string,
  displayType?: DisplayType,
  replaceElement?: ReactNode
): StandardValues => {
  if (displayType === DisplayType.Text) {
    return { displayValue: value?.split(""), value: value };
  }
  if (displayType === DisplayType.Number) {
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      return { displayValue: [""], value: "" };
    }

    return { displayValue: value?.split(""), value: value };
  }

  return { displayValue: value?.split("").map(() => replaceElement), value: value };
};
