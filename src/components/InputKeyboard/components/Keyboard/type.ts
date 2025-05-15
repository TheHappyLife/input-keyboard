import { ReactNode } from "react";
import { THEME } from "../../type";

export interface KeyboardThemeValues {
  backgroundColor: string;
  color: string;
  keyBackground: string;
  keyShadow: string;
  keyActiveBackground: string;
}

export enum DisplayType {
  Text = "text",
  Number = "number",
  Replace = "replace",
}

export enum KeyboardType {
  Text = "text",
  Number = "number",
  Decimal = "decimal",
}

export interface KeyboardKey {
  label: ReactNode;
  value: string;
  subLabel?: string;
}

export interface KeyboardValuesType {
  displayValue: KeyboardDisplayValue[];
  value: string;
}

export type KeyboardDisplayValue = ReactNode;

export interface KeyboardProps {
  toolbar?: ReactNode;
  keyboardType?: KeyboardType;
  displayType?: DisplayType;
  onChange?: (values: KeyboardValuesType) => void;
  replaceElement?: ReactNode; // Only used if displayType is Replace
  openInit?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  theme?: THEME;
  themeValuesOverride?: KeyboardThemeValues;
}

export interface KeyboardRef {
  open: () => void;
  close: () => void;
  setValue: (value: string) => void;
}

export interface TheKeyProps {
  keyboard: KeyboardKey;
  handleKeyboardKeyClick: (keyboard: KeyboardKey) => void;
  themeValues: KeyboardThemeValues;
}
