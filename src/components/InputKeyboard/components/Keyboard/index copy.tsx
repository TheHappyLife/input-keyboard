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
import { KeyboardType, KeyboardKey, KeyboardProps, KeyboardRef } from "./type";
import { NUM_OF_ROWS, NUM_OF_COLUMNS, KEYBOARD_KEYS, DELETE_KEY_VALUE } from "./const";
import TheKey from "./components/TheKey";
import { THEME } from "../InputKeyboard/type";
import clsx from "clsx";

const Keyboard = forwardRef<KeyboardRef, KeyboardProps>((props, ref) => {
  const {
    keyboardType = KeyboardType.Decimal,
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
  const numOfRows = useMemo(() => NUM_OF_ROWS[keyboardType] ?? 4, [keyboardType]);
  const numOfColumns = useMemo(() => NUM_OF_COLUMNS[keyboardType] ?? 3, [keyboardType]);
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
    console.warn("closed");
    setIsOpen(false);
    onClose?.();
  };

  //perform open when component is mounted if openInit is true or alwaysOpen is true
  useLayoutEffect(() => {
    if (openInit || alwaysOpen) {
      open();
    }
  }, [openInit, alwaysOpen]);

  const updateValue = useCallback(
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
      const currentValue = valueRef.current;
      if (keyboardType === KeyboardType.Decimal || keyboardType === KeyboardType.Number) {
        if (clickedKey.value === DELETE_KEY_VALUE) {
          updateValue(currentValue.slice(0, -1));
        } else {
          updateValue(currentValue + clickedKey.value);
        }
      } else {
      }
    },
    [keyboardType, updateValue]
  );

  useEffect(() => {
    const body = document.querySelector("body");
    if (keyboardsSectionRef.current) {
      body?.appendChild(keyboardsSectionRef.current);
    }

    return () => {
      if (keyboardsSectionRef.current) {
        body?.removeChild(keyboardsSectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.warn("handleClickOutside");
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
      setTimeout(() => {
        document.removeEventListener("mousedown", handleClickOutside);
      }, 500);
    };
  }, [alwaysOpen]);

  useEffect(() => {
    const validatedValue = validateKeyValue?.(value || "");
    if (validatedValue === valueRef.current) return;
    valueRef.current = validatedValue;
  }, [value, validateKeyValue]);

  return (
    <div style={{ ...styles?.container }} {...rest} className={clsx(theme, classNames?.container)}>
      {trigger && (
        <div onClick={open} ref={triggerRef} className={clsx(classNames?.trigger)}>
          {trigger}
        </div>
      )}

      <div
        ref={keyboardsSectionRef}
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
          className={clsx("board-of-keys-container", classNames?.keyboardContainer)}
          style={{
            gridTemplateColumns: `repeat(${numOfColumns}, 1fr)`,
            gridTemplateRows: `repeat(${numOfRows}, 1fr)`,
            ...styles?.keyboardContainer,
          }}
        >
          {keyboardKeys!.map((keyboard, index) => (
            <TheKey
              key={index}
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
