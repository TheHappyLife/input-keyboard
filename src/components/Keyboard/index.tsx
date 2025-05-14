import React, {
  CSSProperties,
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

const KEYBOARD_SECTION_STYLE: CSSProperties = {
  position: "fixed",
  height: "fit-content",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
};

const KEYBOARD_TOOLBAR: CSSProperties = {};

export enum DisplayType {
  Text = "text",
  Number = "number",
  Replace = "replace",
}

export enum InputType {
  Text = "text",
  Number = "number",
  Decimal = "decimal",
}

const NUM_OF_ROWS: Partial<Record<InputType, number>> = {
  [InputType.Decimal]: 4,
};

const NUM_OF_COLUMNS: Partial<Record<InputType, number>> = {
  [InputType.Decimal]: 3,
};

export interface KeyboardKey {
  label: ReactNode;
  value: string;
  subLabel?: string;
}

const DELETE_KEY_VALUE = "backspace";

const KEYBOARD_KEYS: Partial<Record<InputType, KeyboardKey[]>> = {
  [InputType.Decimal]: [
    { label: "1", value: "1", subLabel: "" },
    { label: "2", value: "2", subLabel: "ABC" },
    { label: "3", value: "3", subLabel: "DEF" },
    { label: "4", value: "4", subLabel: "GHI" },
    { label: "5", value: "5", subLabel: "JKL" },
    { label: "6", value: "6", subLabel: "MNO" },
    { label: "7", value: "7", subLabel: "PQRS" },
    { label: "8", value: "8", subLabel: "TUV" },
    { label: "9", value: "9", subLabel: "WXYZ" },
    { label: ".", value: "." },
    { label: "0", value: "0" },
    { label: "Backspace", value: DELETE_KEY_VALUE },
  ],
};

const KEYBOARDS_CONTAINER_STYLE: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(10, 1fr)",
  gap: "0.44rem",
  padding: "0.44rem 0.44rem 4.88rem",
  backgroundColor: "rgba(206, 210, 217, 0.70)",
  backdropFilter: "blur(35px)",
  //   fontSize: "clamp(1rem,6.7vw,2rem)",
};

const KEY_ACTIVE_STYLE: CSSProperties = {
  backgroundColor: "rgba(206, 210, 217, 0.70)",
};

const KEY_NORMAL_STYLE: CSSProperties = {
  width: "100%",
  aspectRatio: "2.6071428571",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: "0.3125rem",
  boxShadow: "1px 1px 4px 1px rgba(0, 0, 0, 0.30)",
  color: "#000",
};

export type KeyboardDisplayValue = ReactNode;

export interface InputKeyboardProps {
  children?: ReactNode;
  toolbar?: ReactNode;
  inputType?: InputType;
  displayType?: DisplayType;
  onChange?: (value: string) => void;
  replaceElement?: ReactNode; // Only used if displayType is Replace
  isFloating?: boolean;
  autoFocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  alwaysFocus?: boolean;
}

export interface InputKeyboardRef {
  focus: () => void;
  blur: () => void;
}

const InputKeyboard = forwardRef<InputKeyboardRef, InputKeyboardProps>((props, ref) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const keyboardsSectionRef = useRef<HTMLDivElement>(null);
  const inputValueRef = useRef("");
  const inputType = useMemo(() => props.inputType ?? InputType.Decimal, [props.inputType]);
  const displayType = useMemo(() => props.displayType ?? DisplayType.Text, [props.displayType]);
  const replaceElement = useMemo(() => props.replaceElement ?? null, [props.replaceElement]);
  const [isFocus, setIsFocus] = useState(!!props.autoFocus);

  const isFocused = useMemo(() => !!props.alwaysFocus || isFocus, [props.alwaysFocus, isFocus]);

  const numOfRows = useMemo(() => NUM_OF_ROWS[inputType] ?? 4, [inputType]);
  const numOfColumns = useMemo(() => NUM_OF_COLUMNS[inputType] ?? 3, [inputType]);
  const keyboardKeys = useMemo(() => KEYBOARD_KEYS[inputType] ?? KEYBOARD_KEYS[InputType.Decimal], [inputType]);

  const [displayValue, setDisplayValue] = useState<KeyboardDisplayValue[]>([]);
  const onFocus = () => {
    setIsFocus(true);
    props.onFocus?.();
  };

  const onBlur = () => {
    setIsFocus(false);
    props.onBlur?.();
  };

  const updateValue = useCallback((value: string) => {
    inputValueRef.current = value;
    props.onChange?.(value);
  }, []);

  const setValue = (value: string) => {
    updateValue(value);
    setDisplayValue([value]);
  };

  useImperativeHandle(ref, () => ({
    focus: onFocus,
    blur: onBlur,
    setValue,
  }));

  const getInputValue = useCallback(
    (value: string): { displayValue: KeyboardDisplayValue; inputValue: string } => {
      if (displayType === DisplayType.Text) {
        return { displayValue: value, inputValue: value };
      }
      if (displayType === DisplayType.Number) {
        const numberValue = Number(value);
        if (isNaN(numberValue)) {
          return { displayValue: "", inputValue: "" };
        }

        return { displayValue: value, inputValue: value };
      }

      return { displayValue: replaceElement, inputValue: value };
    },
    [displayType, replaceElement]
  );

  const handleKeyboardKeyClick = useCallback(
    (clickedKey: KeyboardKey) => {
      if (inputType === InputType.Decimal || inputType === InputType.Number) {
        if (clickedKey.value === DELETE_KEY_VALUE) {
          updateValue(inputValueRef.current.slice(0, -1));
          setDisplayValue((prev) => prev.slice(0, -1));
        } else {
          const { displayValue } = getInputValue(clickedKey.value);

          updateValue(inputValueRef.current + clickedKey.value);
          setDisplayValue((prev) => [...prev, displayValue]);
        }
      } else {
      }
    },
    [getInputValue, inputType]
  );

  useEffect(() => {
    if (isFocused) return;
    if (keyboardsSectionRef.current) {
      const body = document.querySelector("body");

      body?.appendChild(keyboardsSectionRef.current);
    }
  }, [isFocused]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        onBlur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const KeyBoards = useMemo(() => {
    console.warn("🚀 ~ rerender keyboard", numOfColumns);

    return (
      <div
        style={{
          ...KEYBOARDS_CONTAINER_STYLE,
          gridTemplateColumns: `repeat(${numOfColumns}, 1fr)`,
          gridTemplateRows: `repeat(${numOfRows}, 1fr)`,
        }}
      >
        {keyboardKeys!.map((keyboard, index) => (
          <TheKey key={index} keyboard={keyboard} handleKeyboardKeyClick={handleKeyboardKeyClick} />
        ))}
      </div>
    );
  }, [keyboardKeys, numOfColumns, numOfRows, handleKeyboardKeyClick]);

  return (
    <div
      onClick={onFocus}
      ref={inputRef}
      style={{
        border: "1px solid #fff",
        padding: "12px 16px",
        width: "250px",
        color: "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {displayValue?.join("")}
        {isFocused && <Cursor />}
      </div>

      {isFocused && (
        <div
          ref={keyboardsSectionRef}
          style={{
            ...KEYBOARD_SECTION_STYLE,
            //   opacity: isFocused ? 1 : 0,
            //   transform: `translateY(${isFocused ? 0 : 50}%)`,
            //   transition: "all 0.25s ease-in-out",
          }}
        >
          {
            <>
              <div style={{ ...KEYBOARD_TOOLBAR }}>{props.toolbar}</div>
              {KeyBoards}
            </>
          }
        </div>
      )}
    </div>
  );
});

InputKeyboard.displayName = "InputKeyboard";

export default InputKeyboard;

const Cursor = () => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "1px", height: "20px", color: "white" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "currentColor",
          transform: blink ? "scaleY(1)" : "scaleY(0.5)",
          transition: "all 0.25s ease-in-out",
          opacity: blink ? 1 : 0,
        }}
      ></div>
    </div>
  );
};

export interface TheKeyProps {
  keyboard: KeyboardKey;
  handleKeyboardKeyClick: (keyboard: KeyboardKey) => void;
}

const TheKey = ({ keyboard, handleKeyboardKeyClick }: TheKeyProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleActive = () => {
    setIsActive(true);
  };

  const handleInactive = () => {
    setIsActive(false);
  };

  return (
    <button
      style={{ ...KEY_NORMAL_STYLE, ...(isActive ? KEY_ACTIVE_STYLE : {}) }}
      onClick={() => handleKeyboardKeyClick(keyboard)}
      onMouseDown={handleActive}
      onMouseUp={handleInactive}
      onTouchStart={handleActive}
      onTouchEnd={handleInactive}
    >
      <span>{keyboard.label}</span>
      {!!keyboard.subLabel && <span>{keyboard.subLabel}</span>}
    </button>
  );
};
