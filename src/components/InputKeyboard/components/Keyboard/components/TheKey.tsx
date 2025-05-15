import { useState } from "react";
import { TheKeyProps } from "../type";
import { KEY_NORMAL_STYLE, SUB_LABEL_STYLE } from "../const";
const TheKey = ({ keyboard, handleKeyboardKeyClick, themeValues }: TheKeyProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleActive = () => {
    setIsActive(true);
  };

  const handleInactive = () => {
    setIsActive(false);
  };

  return (
    <button
      style={{
        ...KEY_NORMAL_STYLE,
        backgroundColor: themeValues.keyBackground,
        boxShadow: themeValues.keyShadow,
        ...(isActive ? { backgroundColor: themeValues.keyActiveBackground } : {}),
      }}
      onClick={() => handleKeyboardKeyClick(keyboard)}
      onMouseDown={handleActive}
      onMouseUp={handleInactive}
      onTouchStart={handleActive}
      onTouchEnd={handleInactive}
    >
      <span style={{ color: themeValues.color }}>{keyboard.label}</span>
      {!!keyboard.subLabel && <span style={{ ...SUB_LABEL_STYLE }}>{keyboard.subLabel}</span>}
    </button>
  );
};

export default TheKey;
