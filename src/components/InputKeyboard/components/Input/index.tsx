import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { InputProps, InputRef } from "./type";
import Cursor from "./Components/Cusor";
import {
  INPUT_CONTAINER_STYLE,
  INPUT_STYLE,
  INPUT_PLACEHOLDER_STYLE,
  INPUT_THEME,
  INPUT_TEXT_CONTAINER_STYLE,
  INPUT_PLACEHOLDER_CONTAINER_STYLE,
} from "./const";
import { THEME } from "../../type";

const BUFFER_ELEMENT = <span style={{ opacity: 0 }}>i</span>;

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const displayValue = props.displayValue;
  const placeholder = props.placeholder;
  const isEmpty = !displayValue || displayValue.length === 0;

  const theme = useMemo(() => props.theme ?? THEME.LIGHT, [props.theme]);
  const themeValues = useMemo(
    () => props.themeValuesOverride ?? INPUT_THEME[theme],
    [theme, props.themeValuesOverride]
  );

  const focus = () => {
    props.onFocus?.();
    setIsFocused(true);
  };

  const blur = () => {
    props.onBlur?.();
    setIsFocused(false);
  };

  useImperativeHandle(ref, () => ({
    focus,
    blur,
  }));

  return (
    <div
      style={{
        ...INPUT_CONTAINER_STYLE,
        color: themeValues.color,
        border: themeValues.border,
        backgroundColor: themeValues.backgroundColor,
        ...props.containerStyle,
      }}
    >
      {props.leftElement}
      <div
        onClick={focus}
        style={{
          ...INPUT_STYLE,
          ...props.inputStyle,
        }}
      >
        {(!isEmpty || isFocused) && (
          <div
            style={{
              ...INPUT_TEXT_CONTAINER_STYLE,
              ...props.textStyle,
            }}
          >
            {isEmpty && BUFFER_ELEMENT}
            {displayValue?.map((value, index) => <span key={index}>{value}</span>)}
            {isFocused && <Cursor style={{ position: "absolute", left: isEmpty ? 0 : "100%" }} />}
          </div>
        )}
        {isEmpty && !isFocused && (
          <span style={INPUT_PLACEHOLDER_CONTAINER_STYLE}>
            {!!placeholder && (
              <span
                style={{
                  ...INPUT_PLACEHOLDER_STYLE,
                  color: themeValues.placeholderColor,
                  ...props.placeholderStyle,
                }}
              >
                {placeholder}
              </span>
            )}
            {BUFFER_ELEMENT}
          </span>
        )}
      </div>
      {props.rightElement}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
