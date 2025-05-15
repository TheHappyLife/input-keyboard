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
