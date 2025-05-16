import { forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Input } from "./components/Input";
import { Keyboard } from "./components/Keyboard";
import { KeyboardRef, KeyboardValuesType } from "./components/Keyboard/type";
import { InputRef } from "./components/Input/type";
import { InputKeyboardProps, InputKeyboardRef, THEME } from "./type";

const InputKeyboard = forwardRef<InputKeyboardRef, InputKeyboardProps>(
  (props: InputKeyboardProps, ref) => {
    const {
      keyboardProps,
      inputProps,
      alwaysOpen,
      openInit,
      onChange,
      value = "",
      theme = THEME.LIGHT,
    } = props;
    const { theme: keyboardTheme, styles: keyboardStyles, ...keyboardRest } = keyboardProps || {};
    const {
      onFocus,
      onBlur,
      theme: inputTheme,
      styles: inputStyles,
      ...inputRest
    } = inputProps || {};

    // const inputKeyboardRef = useRef<HTMLDivElement>(null);
    const keyboardRef = useRef<KeyboardRef>(null);
    const inputRef = useRef<InputRef>(null);

    const [_displayValue, _setDisplayValue] = useState<ReactNode[]>([]);

    const _focus = () => {
      inputRef.current?.focus();
      onFocus?.();
    };

    const _blur = () => {
      inputRef.current?.blur();
      onBlur?.();
    };

    const _onChange = (values: KeyboardValuesType) => {
      _setDisplayValue(values.displayValue);
      onChange?.(values);
    };

    const _setValueToKeyboard = (value?: string) => {
      keyboardRef.current?.setValue(value || "");
    };

    useImperativeHandle(ref, () => ({
      focus: _focus,
      blur: _blur,
    }));

    useEffect(() => {
      //tracking value changed from parent
      _setValueToKeyboard(value);
    }, [value]);

    return (
      <Keyboard
        alwaysOpen={alwaysOpen}
        openInit={openInit}
        onClose={_blur}
        onOpen={_focus}
        trigger={
          <Input
            ref={inputRef}
            displayValue={_displayValue}
            theme={inputTheme ?? theme}
            styles={inputStyles}
            {...inputRest}
          />
        }
        ref={keyboardRef}
        onChange={_onChange}
        theme={keyboardTheme ?? theme}
        styles={keyboardStyles}
        {...keyboardRest}
      />
    );
  }
);

InputKeyboard.displayName = "InputKeyboard";

export { InputKeyboard };
