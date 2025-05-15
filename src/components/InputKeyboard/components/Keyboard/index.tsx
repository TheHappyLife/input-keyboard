import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
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
  KEYBOARDS_CONTAINER_STYLE,
  KEYBOARD_SECTION_STYLE,
  KEYBOARD_TOOLBAR,
  DELETE_KEY_VALUE,
} from "./const";
import TheKey from "./components/TheKey";
import { THEME } from "../../type";

const Keyboard = forwardRef<KeyboardRef, KeyboardProps>((props, ref) => {
  const keyboardsSectionRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef("");
  const displayValueRef = useRef<KeyboardDisplayValue[]>([]);
  const keyboardType = useMemo(() => props.keyboardType ?? KeyboardType.Decimal, [props.keyboardType]);
  const displayType = useMemo(() => props.displayType ?? DisplayType.Text, [props.displayType]);
  const replaceElement = useMemo(() => props.replaceElement ?? "*", [props.replaceElement]);
  const numOfRows = useMemo(() => NUM_OF_ROWS[keyboardType] ?? 4, [keyboardType]);
  const numOfColumns = useMemo(() => NUM_OF_COLUMNS[keyboardType] ?? 3, [keyboardType]);
  const theme = useMemo(() => props.theme ?? THEME.LIGHT, [props.theme]);
  const themeValues = useMemo(
    () => props.themeValuesOverride ?? KEYBOARD_THEME[theme],
    [theme, props.themeValuesOverride]
  );
  const keyboardKeys = useMemo(
    () => KEYBOARD_KEYS[keyboardType] ?? KEYBOARD_KEYS[KeyboardType.Decimal],
    [keyboardType]
  );
  const [isOpen, setIsOpen] = useState(!!props.openInit);

  const open = () => {
    setIsOpen(true);
    props.onOpen?.();
  };

  const close = () => {
    setIsOpen(false);
    props.onClose?.();
  };

  const updateValue = useCallback((inputValue: string) => {
    const { displayValue, value } = getKeyboardValues(inputValue);
    valueRef.current = value;
    displayValueRef.current = [displayValue];
    props.onChange?.({
      displayValue: displayValue,
      value: value,
    });
  }, []);

  const setValue = (value: string) => {
    updateValue(value);
  };

  useImperativeHandle(ref, () => ({
    open: open,
    close: close,
    setValue,
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
    if (isOpen) return;
    if (keyboardsSectionRef.current) {
      const body = document.querySelector("body");

      body?.appendChild(keyboardsSectionRef.current);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          ref={keyboardsSectionRef}
          style={{
            ...KEYBOARD_SECTION_STYLE,
          }}
        >
          {
            <>
              <div style={{ ...KEYBOARD_TOOLBAR }}>{props.toolbar}</div>
              <div
                style={{
                  ...KEYBOARDS_CONTAINER_STYLE,
                  gridTemplateColumns: `repeat(${numOfColumns}, 1fr)`,
                  gridTemplateRows: `repeat(${numOfRows}, 1fr)`,
                  backgroundColor: themeValues.backgroundColor,
                  color: themeValues.color,
                }}
              >
                {keyboardKeys!.map((keyboard, index) => (
                  <TheKey
                    key={index}
                    keyboard={keyboard}
                    handleKeyboardKeyClick={handleKeyboardKeyClick}
                    themeValues={themeValues}
                  />
                ))}
              </div>
            </>
          }
        </div>
      )}
    </>
  );
});

Keyboard.displayName = "Keyboard";

export default Keyboard;
