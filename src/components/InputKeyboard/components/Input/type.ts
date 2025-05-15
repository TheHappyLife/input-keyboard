import { ReactNode } from "react";
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
