import { CSSProperties, ReactNode } from "react";
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

export interface KeyboardStyleProps {
  container?: CSSProperties;
  toolbar?: CSSProperties;
  keyboardContainer?: CSSProperties;
  key?: CSSProperties;
  keyHover?: CSSProperties;
  keyActive?: CSSProperties;
  trigger?: CSSProperties;
}

export interface KeyboardProps {
  keyboardType?: KeyboardType;
  displayType?: DisplayType;
  replaceElement?: string;
  theme?: THEME;
  themeValuesOverride?: KeyboardThemeValues;
  onOpen?: (height?: number) => void;
  onClose?: () => void;
  onChange?: (values: KeyboardValuesType) => void;
  toolbar?: React.ReactNode;
  initialValue?: string;
  alwaysOpen?: boolean;
  trigger?: React.ReactNode;
  openInit?: boolean;
  styles?: KeyboardStyleProps;
  outFocusOnClickToolbar?: boolean;
  toolbarFullHeight?: boolean; // if true, the toolbar will be full remain height of the screen after minus the height of the keyboard
  keyboardId?: string;
  toolbarId?: string;
}

export interface KeyboardRef {
  open: () => void;
  close: () => void;
  setValue: (value: string) => void;
  getKeyboardHeight?: () => number | undefined;
}

export interface TheKeyProps {
  keyboard: KeyboardKey;
  handleKeyboardKeyClick: (keyboard: KeyboardKey) => void;
  themeValues: KeyboardThemeValues;
  styles?: {
    key?: CSSProperties;
    keyActive?: CSSProperties;
  };
}
