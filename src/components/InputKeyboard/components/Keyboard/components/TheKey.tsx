import { useState } from "react";
import { TheKeyProps } from "../type";
import clsx from "clsx";

const TheKey: React.FC<TheKeyProps> = ({ keyboard, handleKeyboardKeyClick, classNames }) => {
  const [isActive, setIsActive] = useState(false);

  const handleActive = () => {
    setIsActive(true);
  };

  const handleInactive = () => {
    setIsActive(false);
  };

  return (
    <button
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
};

export default TheKey;
