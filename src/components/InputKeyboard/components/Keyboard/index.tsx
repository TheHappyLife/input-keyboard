import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DisplayType,
  KeyboardType,
  KeyboardKey,
  KeyboardDisplayValue,
  KeyboardProps,
  KeyboardRef,
  KeyboardValuesType,
} from "./type";
import {
  NUM_OF_ROWS,
  NUM_OF_COLUMNS,
  KEYBOARD_THEME,
  KEYBOARD_KEYS,
  BOARD_OF_KEYS_CONTAINER,
  KEYBOARD_SECTION_STYLE,
  KEYBOARD_TOOLBAR,
  DELETE_KEY_VALUE,
} from "./const";
import TheKey from "./components/TheKey";
import { THEME } from "../../type";

const Keyboard = forwardRef<KeyboardRef, KeyboardProps>((props, ref) => {
  const {
    keyboardType = KeyboardType.Decimal,
    displayType = DisplayType.Text,
    replaceElement = "•",
    theme = THEME.LIGHT,
    themeValuesOverride,
    onOpen,
    onClose,
    onChange,
    toolbar,
    initialValue = "",
    styles,
    outFocusOnClickToolbar = true,
    toolbarFullHeight = false,
    keyboardId,
    toolbarId,
    hideKeyboard = false,
    ...rest
  } = props;
  const triggerRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const keyboardsSectionRef = useRef<HTMLDivElement>(null);
  const { alwaysOpen, trigger, openInit } = props;
  const valueRef = useRef(initialValue);
  const displayValueRef = useRef<KeyboardDisplayValue[]>([]);
  const numOfRows = useMemo(() => NUM_OF_ROWS[keyboardType] ?? 4, [keyboardType]);
  const numOfColumns = useMemo(() => NUM_OF_COLUMNS[keyboardType] ?? 3, [keyboardType]);
  const themeValues = useMemo(() => themeValuesOverride ?? KEYBOARD_THEME[theme], [theme, themeValuesOverride]);
  const keyboardKeys = useMemo(
    () => KEYBOARD_KEYS[keyboardType] ?? KEYBOARD_KEYS[KeyboardType.Decimal],
    [keyboardType]
  );
  const [isOpen, setIsOpen] = useState(openInit);

  const isOpened = useMemo(() => {
    return isOpen || alwaysOpen;
  }, [isOpen, alwaysOpen]);

  const open = () => {
    setIsOpen(true);
    const height = keyboardsSectionRef.current?.clientHeight;
    onOpen?.(height);
  };

  const close = () => {
    setIsOpen(false);
    onClose?.();
  };

  useLayoutEffect(() => {
    if (openInit || alwaysOpen) {
      open();
    }
  }, [openInit, alwaysOpen]);

  const updateValue = useCallback((inputValue: string) => {
    const { displayValue, value } = getKeyboardValues(inputValue);
    if (value === valueRef.current) return;
    valueRef.current = value;
    displayValueRef.current = [displayValue];
    onChange?.({
      displayValue: displayValue,
      value: value,
    });
  }, []);

  const setValue = (value: string) => {
    updateValue(value);
  };

  const getKeyboardHeight = () => {
    return keyboardsSectionRef.current?.clientHeight;
  };

  useImperativeHandle(ref, () => ({
    open: open,
    close: close,
    setValue,
    getKeyboardHeight,
  }));

  const getKeyboardValues = useCallback(
    (value: string): KeyboardValuesType => {
      if (displayType === DisplayType.Text) {
        return { displayValue: value?.split(""), value: value };
      }
      if (displayType === DisplayType.Number) {
        const numberValue = Number(value);
        if (isNaN(numberValue)) {
          return { displayValue: [""], value: "" };
        }

        return { displayValue: value?.split(""), value: value };
      }

      return { displayValue: value?.split("").map(() => replaceElement), value: value };
    },
    [displayType, replaceElement]
  );

  const handleKeyboardKeyClick = useCallback(
    (clickedKey: KeyboardKey) => {
      if (keyboardType === KeyboardType.Decimal || keyboardType === KeyboardType.Number) {
        if (clickedKey.value === DELETE_KEY_VALUE) {
          updateValue(valueRef.current.slice(0, -1));
        } else {
          updateValue(valueRef.current + clickedKey.value);
        }
      } else {
      }
    },
    [getKeyboardValues, keyboardType]
  );

  useEffect(() => {
    if (isOpened) return;
    if (keyboardsSectionRef.current) {
      const body = document.querySelector("body");

      body?.appendChild(keyboardsSectionRef.current);
    }
  }, [isOpened]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (alwaysOpen) return;
      const isClickOnTrigger = triggerRef.current?.contains(event.target as Node);
      const isClickOnKeyboard = keyboardRef.current?.contains(event.target as Node);
      const isClickOnToolbar = toolbarRef.current?.contains(event.target as Node);
      if (isClickOnTrigger || isClickOnKeyboard) {
        return;
      }
      if (isClickOnToolbar && !outFocusOnClickToolbar) {
        return;
      }
      setTimeout(() => {
        close();
      }, 100);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [alwaysOpen]);

  return (
    <div style={{ ...styles?.container }} {...rest}>
      {trigger && (
        <div onClick={open} ref={triggerRef} style={styles?.trigger}>
          {trigger}
        </div>
      )}

      <div
        ref={keyboardsSectionRef}
        style={{
          ...KEYBOARD_SECTION_STYLE,
          height: toolbarFullHeight ? "100dvh" : "fit-content",
          ...styles?.keyboardContainer,
          visibility: isOpened ? "visible" : "hidden",
        }}
      >
        {!!toolbar && (
          <div
            id={toolbarId}
            ref={toolbarRef}
            style={{
              ...KEYBOARD_TOOLBAR,
              flex: toolbarFullHeight ? 1 : "unset",
              overflowY: "auto",
              ...styles?.toolbar,
            }}
          >
            {toolbar}
          </div>
        )}
        {!hideKeyboard && (
          <div
            id={keyboardId}
            ref={keyboardRef}
            style={{
              ...BOARD_OF_KEYS_CONTAINER,
              gridTemplateColumns: `repeat(${numOfColumns}, 1fr)`,
              gridTemplateRows: `repeat(${numOfRows}, 1fr)`,
              backgroundColor: themeValues.backgroundColor,
              color: themeValues.color,
              ...styles?.keyboardContainer,
            }}
          >
            {keyboardKeys!.map((keyboard, index) => (
              <TheKey
                key={index}
                keyboard={keyboard}
                handleKeyboardKeyClick={handleKeyboardKeyClick}
                themeValues={themeValues}
                styles={{
                  key: styles?.key,
                  keyActive: styles?.keyActive,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

Keyboard.displayName = "Keyboard";

export { Keyboard };
