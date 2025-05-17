import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
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
  const inputRef = useRef<HTMLDivElement>(null);
  const {
    displayValue,
    placeholder,
    elementsAcceptIds,
    theme = THEME.LIGHT,
    themeValuesOverride,
    onFocus,
    onBlur,
    styles,
    leftElement,
    rightElement,
    ...rest
  } = props;
  const isEmpty = !displayValue || displayValue.length === 0;

  const themeValues = useMemo(() => themeValuesOverride ?? INPUT_THEME[theme], [theme, themeValuesOverride]);

  const focus = () => {
    setTimeout(() => {
      onFocus?.();
      setIsFocused(true);
    }, 100);
  };

  const blur = () => {
    onBlur?.();
    setIsFocused(false);
  };

  useImperativeHandle(ref, () => ({
    focus,
    blur,
  }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickOnInput = inputRef.current?.contains(event.target as Node);
      const isClickOnAcceptedElements = elementsAcceptIds?.some((elementId) =>
        document.getElementById(elementId)?.contains(event.target as Node)
      );
      if (isClickOnInput || isClickOnAcceptedElements) {
        return;
      }
      setTimeout(() => {
        blur();
      }, 100);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      {...rest}
      ref={inputRef}
      onClick={focus}
      style={{
        ...INPUT_CONTAINER_STYLE,
        color: themeValues.color,
        border: themeValues.border,
        backgroundColor: themeValues.backgroundColor,
        ...styles?.container,
      }}
    >
      {leftElement}
      <div
        style={{
          ...INPUT_STYLE,
          ...styles?.input,
        }}
      >
        {(!isEmpty || isFocused) && (
          <div
            style={{
              ...INPUT_TEXT_CONTAINER_STYLE,
              ...styles?.text,
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
                  ...styles?.placeholder,
                }}
              >
                {placeholder}
              </span>
            )}
            {BUFFER_ELEMENT}
          </span>
        )}
      </div>
      {rightElement}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
