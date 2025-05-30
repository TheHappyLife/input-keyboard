"use client";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import clsx from "clsx";
import { TheKeyProps } from "../type";

export interface TheKeyRef {
  click: () => void;
}

const TheKey = forwardRef<TheKeyRef, TheKeyProps>(({ keyboard, handleKeyboardKeyClick, classNames }, ref) => {
  const keyRef = useRef<HTMLButtonElement>(null);
  const [isActive, setIsActive] = useState(false);

  useImperativeHandle(ref, () => ({
    click: () => {
      keyRef.current?.click();
    },
  }));

  const handleActive = () => {
    setIsActive(true);
  };

  const handleInactive = () => {
    setIsActive(false);
  };

  return (
    <button
      ref={keyRef}
      type="button"
      aria-label={String(keyboard.label)}
      className={clsx("key-normal", isActive ? "key-active" : "", classNames?.key)}
      onClick={() => handleKeyboardKeyClick(keyboard)}
      onMouseDown={handleActive}
      onMouseUp={handleInactive}
      onTouchStart={handleActive}
      onTouchEnd={handleInactive}
    >
      <span className={clsx(classNames?.label)}>{keyboard.label}</span>
      {keyboard.subLabel && <span className={clsx("sub-label", classNames?.subLabel)}>{keyboard.subLabel}</span>}
    </button>
  );
});

TheKey.displayName = "TheKey";

export default TheKey;
