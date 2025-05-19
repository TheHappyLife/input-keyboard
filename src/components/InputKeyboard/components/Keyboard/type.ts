import { CSSProperties, ReactNode } from "react";
import { THEME } from "../../type";

export interface KeyboardThemeValues {
  backgroundColor: string;
  color: string;
  keyBackground: string;
  keyShadow: string;
  keyActiveBackground: string;
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

export interface KeyboardStyleProps {
  container?: CSSProperties;
  toolbar?: CSSProperties;
  keyboardContainer?: CSSProperties;
  key?: CSSProperties;
  keyHover?: CSSProperties;
  keyActive?: CSSProperties;
  trigger?: CSSProperties;
}
export interface KeyboardClassNamesProps {
  container?: string;
  toolbar?: string;
  keyboardContainer?: string;
  trigger?: string;
  theKey?: TheKeyClassNames;
}

export interface KeyboardProps {
  keyboardType?: KeyboardType;
  theme?: THEME;
  onOpen?: (height?: number) => void;
  onClose?: () => void;
  onChange?: (values: string) => void;
  toolbar?: React.ReactNode;
  alwaysOpen?: boolean;
  trigger?: React.ReactNode;
  openInit?: boolean;
  styles?: KeyboardStyleProps;
  classNames?: KeyboardClassNamesProps;
  outFocusOnClickToolbar?: boolean;
  toolbarFullHeight?: boolean; // if true, the toolbar will be full remain height of the screen after minus the height of the keyboard
  keyboardId?: string;
  toolbarId?: string;
  value?: string;
  validateKeyValue?: (value: string) => string;
}

export interface KeyboardRef {
  open: () => void;
  close: () => void;
  // setValue: (value: string) => void;
  getKeyboardHeight?: () => number | undefined;
}

export interface TheKeyProps {
  keyboard: KeyboardKey;
  handleKeyboardKeyClick: (keyboard: KeyboardKey) => void;
  classNames?: TheKeyClassNames;
}

export interface TheKeyClassNames {
  key?: string;
  keyActive?: string;
  label?: string;
  subLabel?: string;
}
