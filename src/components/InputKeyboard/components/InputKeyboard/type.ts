import { ReactNode } from "react";
import { InputProps } from "../Input/type";
import { KeyboardProps } from "../Keyboard/type";

export interface InputKeyboardProps {
  keyboardProps?: Omit<KeyboardProps, "openInit" | "onChange">;
  inputProps?: Omit<InputProps, "displayValue" | "value">;
  alwaysOpen?: boolean;
  openInit?: boolean;
  onChange?: KeyboardProps["onChange"];
  value?: string;
  theme?: THEME;
}

export interface InputKeyboardRef {
  focus: () => void;
  blur: () => void;
}

export enum THEME {
  LIGHT = "tek-keyboard-light",
  DARK = "tek-keyboard-dark",
}

export enum DisplayType {
  Text = "text",
  Number = "number",
  Replace = "replace",
}

export type DisplayValue = ReactNode;

export interface StandardValues {
  displayValue: DisplayValue[];
  value: string;
}
