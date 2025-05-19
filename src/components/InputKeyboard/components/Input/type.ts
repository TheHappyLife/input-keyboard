import { DisplayType } from "./../../type";
import { ReactNode, CSSProperties } from "react";
import { THEME } from "../../type";
export interface InputProps {
  value?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  theme?: THEME;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  styles?: InputStyleProps;
  classNames?: InputClassNames;
  elementsAcceptIds?: string[];
  autoFocus?: boolean;
  alwaysFocus?: boolean;
  renderValue?: (value: ReactNode) => ReactNode;
  displayType?: DisplayType;
  replaceElement?: ReactNode;
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

export interface InputClassNames {
  container?: string;
  input?: string;
  text?: string;
  placeholder?: string;
}
