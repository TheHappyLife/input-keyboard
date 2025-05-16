import { ReactNode, CSSProperties } from "react";
import { THEME } from "../../type";
export interface InputProps {
  displayValue?: ReactNode[];
  value?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  theme?: THEME;
  themeValuesOverride?: InputThemeValues;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  styles?: InputStyleProps;
}

export interface InputRef {
  focus: () => void;
  blur: () => void;
}

export interface InputThemeValues {
  color?: string;
  border?: string;
  placeholderColor?: string;
  backgroundColor?: string;
}

export interface InputStyleProps {
  container?: CSSProperties;
  input?: CSSProperties;
  text?: CSSProperties;
  placeholder?: CSSProperties;
}
