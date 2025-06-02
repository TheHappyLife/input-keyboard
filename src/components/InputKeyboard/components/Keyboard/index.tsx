import React, {
  forwardRef,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { KeyboardType, KeyboardKey, KeyboardProps, KeyboardRef, LayoutType } from "./type";
import { NUM_OF_ROWS, NUM_OF_COLUMNS, KEYBOARD_KEYS, DELETE_KEY_VALUE } from "./const";
import TheKey, { TheKeyRef } from "./components/TheKey";
import { THEME } from "../InputKeyboard/type";
import clsx from "clsx";
import { formatValues } from "../../functions/format";

const Keyboard = forwardRef<KeyboardRef, KeyboardProps>((props, ref) => {
  const {
    keyboardType = KeyboardType.Number,
    layoutType = LayoutType.Decimal,
    theme = THEME.LIGHT,
    onOpen,
    onClose,
    onChange,
    toolbar,
    styles,
    outFocusOnClickToolbar = true,
    toolbarFullHeight = false,
    keyboardId,
    toolbarId,
    classNames,
    value = "",
    alwaysOpen,
    trigger,
    openInit,
    validateKeyValue = (value) => value,
    ...rest
  } = props;
  const triggerRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const keyboardsSectionRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(value || "");
  const numOfRows = useMemo(() => NUM_OF_ROWS[layoutType] ?? 4, [layoutType]);
  const numOfColumns = useMemo(() => NUM_OF_COLUMNS[layoutType] ?? 3, [layoutType]);
  const keyboardKeys = useMemo(() => KEYBOARD_KEYS[layoutType] ?? KEYBOARD_KEYS[LayoutType.Decimal], [layoutType]);
  const [isOpen, setIsOpen] = useState(openInit);
  const theKeyRefs = useRef<Record<string, TheKeyRef>>({});
  const isOpened = useMemo(() => {
    return isOpen || alwaysOpen;
  }, [isOpen, alwaysOpen]);

  // focus to listen physical keyboard event
  const focusKeyboard = useCallback(() => {
    setTimeout(() => {
      keyboardsSectionRef.current?.focus();
    }, 100);
  }, []);
  const blurKeyboard = useCallback(() => {
    keyboardsSectionRef.current?.blur();
  }, []);

  const open = () => {
    setIsOpen(true);
    const height = keyboardsSectionRef.current?.clientHeight;
    onOpen?.(height);
    focusKeyboard();
  };

  const close = () => {
    setIsOpen(false);
    onClose?.();
    blurKeyboard();
  };

  useLayoutEffect(() => {
    if (openInit || alwaysOpen) {
      open();
    }
  }, [openInit, alwaysOpen]);

  const updateValueAsNumber = useCallback(
    (value: string) => {
      const validatedValue = validateKeyValue?.(value);
      const { value: exactValue } = formatValues(validatedValue);
      valueRef.current = exactValue;
      onChange?.(exactValue);
    },
    [onChange, validateKeyValue]
  );
  const updateValueAsString = useCallback(
    (value: string) => {
      const validatedValue = validateKeyValue?.(value);
      valueRef.current = validatedValue;
      onChange?.(validatedValue);
    },
    [onChange, validateKeyValue]
  );

  const getKeyboardHeight = () => {
    return keyboardsSectionRef.current?.clientHeight;
  };

  useImperativeHandle(ref, () => ({
    open: open,
    close: close,
    getKeyboardHeight,
  }));

  const handleKeyboardKeyClick = useCallback(
    (clickedKey: KeyboardKey) => {
      const currentValue = value;
      switch (keyboardType) {
        case KeyboardType.Number:
          if (clickedKey.value === DELETE_KEY_VALUE) {
            updateValueAsNumber(currentValue.slice(0, -1));
          } else {
            updateValueAsNumber(currentValue + clickedKey.value);
          }
          break;
        case KeyboardType.Text:
          if (clickedKey.value === DELETE_KEY_VALUE) {
            updateValueAsString(currentValue.slice(0, -1));
          } else {
            updateValueAsString(currentValue + clickedKey.value);
          }
          break;
      }
    },
    [keyboardType, updateValueAsNumber, updateValueAsString, value]
  );

  useEffect(() => {
    const body = document.querySelector("body");
    const box = document.createElement("div");
    if (keyboardsSectionRef.current) {
      box?.appendChild(keyboardsSectionRef.current);
      body?.appendChild(box);
    }

    return () => {
      box?.remove();
    };
  }, []);

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

  useEffect(() => {
    const validatedValue = validateKeyValue?.(value || "");
    const { value: exactValue } = formatValues(validatedValue);
    if (exactValue === valueRef.current) return;
    valueRef.current = exactValue;
  }, [value, validateKeyValue]);

  const handleKeyDown: KeyboardEventHandler = useCallback(
    (event) => {
      if (!isOpened) return;
      event.preventDefault();
      event.stopPropagation();
      const keyValue = event.key;
      theKeyRefs.current?.[keyValue]?.click();
    },
    [isOpened]
  );

  return (
    <div style={{ ...styles?.container }} {...rest} className={clsx(theme, classNames?.container)}>
      {trigger && (
        <div onClick={open} ref={triggerRef} className={clsx(classNames?.trigger)}>
          {trigger}
        </div>
      )}

      <div
        ref={keyboardsSectionRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={clsx(theme, "keyboard-section", classNames?.keyboardContainer)}
        style={{
          height: toolbarFullHeight ? "100dvh" : "fit-content",
          ...styles?.keyboardContainer,
          visibility: isOpened ? "visible" : "hidden",
        }}
      >
        {!!toolbar && (
          <div
            id={toolbarId}
            ref={toolbarRef}
            className={clsx(classNames?.toolbar)}
            style={{
              flex: toolbarFullHeight ? 1 : "unset",
              overflowY: "auto",
              ...styles?.toolbar,
            }}
          >
            {toolbar}
          </div>
        )}
        <div
          id={keyboardId}
          ref={keyboardRef}
          className={clsx("board-of-keys-container", classNames?.keyboards)}
          style={{
            gridTemplateColumns: `repeat(${numOfColumns}, 1fr)`,
            gridTemplateRows: `repeat(${numOfRows}, 1fr)`,
            ...styles?.keyboards,
          }}
        >
          {keyboardKeys!.map((keyboard, index) => (
            <TheKey
              key={index}
              ref={(el) => {
                theKeyRefs.current[keyboard.value] = el as TheKeyRef;
              }}
              keyboard={keyboard}
              handleKeyboardKeyClick={handleKeyboardKeyClick}
              classNames={classNames?.theKey}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

Keyboard.displayName = "Keyboard";

export { Keyboard };
