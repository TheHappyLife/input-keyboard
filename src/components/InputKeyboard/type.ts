import { ReactNode } from "react";
import { InputProps } from "./components/Input/type";
import { KeyboardProps } from "./components/Keyboard/type";

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
  LIGHT = "light",
  DARK = "dark",
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
