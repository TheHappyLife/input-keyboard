import { forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Input } from "./components/Input";
import Keyboard from "./components/Keyboard";
import { KeyboardRef, KeyboardValuesType } from "./components/Keyboard/type";
import { InputRef } from "./components/Input/type";
import { InputKeyboardProps, InputKeyboardRef, THEME } from "./type";

const InputKeyboard = forwardRef<InputKeyboardRef, InputKeyboardProps>((props: InputKeyboardProps, ref) => {
  const { keyboardProps, inputProps, alwaysOpen, openInit, onChange, value, theme = THEME.LIGHT } = props;
  const { theme: keyboardTheme, ...keyboardRest } = keyboardProps || {};
  const { onFocus, onBlur, theme: inputTheme, ...inputRest } = inputProps || {};

  const inputKeyboardRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<KeyboardRef>(null);
  const inputRef = useRef<InputRef>(null);

  const [_displayValue, _setDisplayValue] = useState<ReactNode[]>([]);
  const [_value, _setValue] = useState<string>("");

  const _onFocus = () => {
    keyboardRef.current?.open();
    inputRef.current?.focus();
  };

  const _onBlur = () => {
    keyboardRef.current?.close();
    inputRef.current?.blur();
  };

  const _onFocusInput = () => {
    keyboardRef.current?.open();
    onFocus?.();
  };

  const _onChange = (values: KeyboardValuesType) => {
    _setDisplayValue(values.displayValue);
    _setValue(values.value);
    onChange?.(values);
  };

  const _setValueToKeyboard = (value?: string) => {
    keyboardRef.current?.setValue(value || "");
  };

  useImperativeHandle(ref, () => ({
    focus: _onFocus,
    blur: _onBlur,
  }));

  useEffect(() => {
    if (openInit || alwaysOpen) {
      _onFocus();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (alwaysOpen) return;
      if (inputKeyboardRef.current && !inputKeyboardRef.current.contains(event.target as Node)) {
        _onBlur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [alwaysOpen]);

  useEffect(() => {
    //tracking value changed from parent
    _setValueToKeyboard(value);
  }, [value]);

  return (
    <div ref={inputKeyboardRef}>
      <Input
        ref={inputRef}
        displayValue={_displayValue}
        value={_value}
        onFocus={_onFocusInput}
        onBlur={onBlur}
        theme={inputTheme ?? theme}
        {...inputRest}
      />
      <Keyboard ref={keyboardRef} onChange={_onChange} theme={keyboardTheme ?? theme} {...keyboardRest} />
    </div>
  );
});

InputKeyboard.displayName = "InputKeyboard";

export { InputKeyboard };
