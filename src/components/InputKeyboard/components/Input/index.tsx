import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { InputProps, InputRef } from "./type";
import Cursor from "./Components/Cursor";
import { DisplayType, THEME } from "../../type";
import clsx from "clsx";
import getStandardValues from "../../functions/getStandardValues";

const BUFFER_ELEMENT = <span style={{ opacity: 0 }}>i</span>;

const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const {
    placeholder,
    elementsAcceptIds,
    theme = THEME.LIGHT,
    value,
    onFocus,
    onBlur,
    styles,
    leftElement,
    rightElement,
    classNames,
    autoFocus,
    alwaysFocus,
    displayType = DisplayType.Text,
    replaceElement = "●",
    renderValue = (value) => value,
    ...rest
  } = props;

  const displayValue = useMemo(() => {
    if (!value) return [];

    const { displayValue } = getStandardValues(value, displayType, replaceElement);

    return displayValue;
  }, [value, displayType, replaceElement]);

  const isEmpty = !displayValue || displayValue.length === 0;

  const focus = () => {
    setTimeout(() => {
      onFocus?.();
      setIsFocused(true);
    }, 100);
  };

  const blur = useCallback(() => {
    if (alwaysFocus) return;
    onBlur?.();
    setIsFocused(false);
  }, [alwaysFocus]);

  useEffect(() => {
    if (autoFocus || alwaysFocus) {
      focus();
    }
  }, [autoFocus, alwaysFocus]);

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
      className={clsx(theme, "input-container", classNames?.container)}
      style={{
        ...styles?.container,
      }}
    >
      {leftElement}
      <div
        className={clsx("input", classNames?.input)}
        style={{
          ...styles?.input,
        }}
      >
        {(!isEmpty || isFocused) && (
          <div
            className={clsx("input-text-container", classNames?.text)}
            style={{
              ...styles?.text,
            }}
          >
            {isEmpty && BUFFER_ELEMENT}
            {displayValue?.map((value, index) => <span key={index}>{renderValue(value)}</span>)}
            {isFocused && <Cursor style={{ position: "absolute", left: isEmpty ? 0 : "100%" }} />}
          </div>
        )}
        {isEmpty && !isFocused && (
          <span className={clsx("input-placeholder-container", classNames?.placeholder)}>
            {!!placeholder && (
              <span
                style={{
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
