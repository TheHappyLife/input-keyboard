import React, {
  ChangeEventHandler,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
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
import { useKeyboard } from "../../hook/useKeyboard";

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
    focusId,
    validateKeyValue = (value) => value,
    ...rest
  } = props;
  const triggerRef = useRef<HTMLLabelElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const keyboardsSectionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef(value || "");
  const { isShowBrowserInput } = useKeyboard();
  const numOfRows = useMemo(() => NUM_OF_ROWS[layoutType] ?? 4, [layoutType]);
  const numOfColumns = useMemo(() => NUM_OF_COLUMNS[layoutType] ?? 3, [layoutType]);
  const keyboardKeys = useMemo(() => KEYBOARD_KEYS[layoutType] ?? KEYBOARD_KEYS[LayoutType.Decimal], [layoutType]);
  const [isOpen, setIsOpen] = useState(openInit);
  const theKeyRefs = useRef<Record<string, TheKeyRef>>({});
  const isOpened = useMemo(() => {
    return isOpen || alwaysOpen;
  }, [isOpen, alwaysOpen]);

  const open = () => {
    triggerRef.current?.click();
  };

  const handOpen = () => {
    if (isShowBrowserInput) {
      inputRef.current?.focus();

      return;
    }

    const height = keyboardsSectionRef.current?.clientHeight;
    onOpen?.(height);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    onClose?.();
    inputRef.current?.blur();
  };

  useEffect(() => {
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

  const handleTypingBrowserInput: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const inputValue = event.target.value;

    const isDelete = Math.max(value?.length, valueRef?.current?.length) > inputValue?.length;

    const newChar = isDelete ? DELETE_KEY_VALUE : inputValue?.slice(-1);
    theKeyRefs.current?.[newChar]?.click();
  }, []);

  useEffect(() => {
    if (isShowBrowserInput === null) return;
    const body = document.querySelector("body");
    const box = document.createElement("div");
    if (keyboardsSectionRef.current) {
      box?.appendChild(keyboardsSectionRef.current);
      body?.appendChild(box);
    }

    return () => {
      box?.remove();
    };
  }, [isShowBrowserInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (alwaysOpen || isShowBrowserInput) return;
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
  }, [alwaysOpen, isShowBrowserInput]);

  useEffect(() => {
    const validatedValue = validateKeyValue?.(value || "");
    const { value: exactValue } = formatValues(validatedValue);
    if (exactValue === valueRef.current) return;
    valueRef.current = exactValue;
  }, [value, validateKeyValue]);

  return (
    <div style={{ ...styles?.container }} {...rest} className={clsx(theme, classNames?.container)}>
      <label onClick={handOpen} ref={triggerRef} className={clsx(classNames?.trigger)}>
        {trigger}
      </label>

      {isShowBrowserInput && (
        <input
          ref={inputRef}
          id={focusId}
          type="text"
          onFocus={(e) => {
            console.warn("focus", e);
          }}
          onBlur={(e) => {
            console.warn("blur", e);
          }}
          inputMode={layoutType as any}
          onChange={handleTypingBrowserInput}
          style={{
            width: 0,
            height: 0,
          }}
          value={value}
        />
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
          className={clsx("board-of-keys-container", classNames?.keyboards)}
          style={{
            gridTemplateColumns: `repeat(${numOfColumns}, 1fr)`,
            gridTemplateRows: `repeat(${numOfRows}, 1fr)`,
            display: isShowBrowserInput !== false ? "none" : "grid",
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
