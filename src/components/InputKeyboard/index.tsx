import { forwardRef, useId, useImperativeHandle, useRef } from "react";
import { Input } from "./components/Input";
import { Keyboard } from "./components/Keyboard";
import { KeyboardRef } from "./components/Keyboard/type";
import { InputRef } from "./components/Input/type";
import { InputKeyboardProps, InputKeyboardRef, THEME } from "./type";

const InputKeyboard = forwardRef<InputKeyboardRef, InputKeyboardProps>(
  (props: InputKeyboardProps, ref) => {
    const keyboardIdGenerated = useId();
    const toolbarIdGenerated = useId();
    const {
      keyboardProps,
      inputProps,
      alwaysOpen,
      openInit,
      onChange,
      value = "",
      theme = THEME.LIGHT,
    } = props;
    const {
      theme: keyboardTheme,
      styles: keyboardStyles,
      keyboardId,
      toolbarId,
      ...keyboardRest
    } = keyboardProps || {};
    const {
      onFocus,
      onBlur,
      theme: inputTheme,
      styles: inputStyles,
      ...inputRest
    } = inputProps || {};

    const keyboardRef = useRef<KeyboardRef>(null);
    const inputRef = useRef<InputRef>(null);

    const _focus = () => {
      inputRef.current?.focus();
      onFocus?.();
    };

    const _blur = () => {
      inputRef.current?.blur();
      onBlur?.();
    };

    useImperativeHandle(ref, () => ({
      focus: _focus,
      blur: _blur,
    }));

    return (
      <Keyboard
        value={value}
        alwaysOpen={alwaysOpen}
        openInit={openInit}
        onClose={_blur}
        onOpen={_focus}
        trigger={
          <Input
            elementsAcceptIds={[keyboardIdGenerated, toolbarIdGenerated]}
            ref={inputRef}
            theme={inputTheme ?? theme}
            styles={inputStyles}
            {...inputRest}
            value={value}
          />
        }
        ref={keyboardRef}
        onChange={onChange}
        theme={keyboardTheme ?? theme}
        styles={keyboardStyles}
        keyboardId={keyboardId ?? keyboardIdGenerated}
        toolbarId={toolbarId ?? toolbarIdGenerated}
        {...keyboardRest}
      />
    );
  }
);

InputKeyboard.displayName = "InputKeyboard";

export { InputKeyboard };
