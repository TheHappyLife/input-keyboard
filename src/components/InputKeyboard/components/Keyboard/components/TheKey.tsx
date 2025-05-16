import { useState } from "react";
import { TheKeyProps } from "../type";
import { KEY_NORMAL_STYLE, SUB_LABEL_STYLE } from "./const";

const TheKey: React.FC<TheKeyProps> = ({ keyboard, handleKeyboardKeyClick, themeValues, styles }) => {
  const [isActive, setIsActive] = useState(false);

  const handleActive = () => {
    setIsActive(true);
  };

  const handleInactive = () => {
    setIsActive(false);
  };

  const buttonStyle = {
    ...KEY_NORMAL_STYLE,
    backgroundColor: isActive ? themeValues.keyActiveBackground : themeValues.keyBackground,
    boxShadow: themeValues.keyShadow,
    transition: "background-color 0.1s ease",
    ...styles?.key,
    ...(isActive && styles?.keyActive),
  };

  const labelStyle = {
    color: themeValues.color,
  };

  const subLabelStyle = {
    ...SUB_LABEL_STYLE,
  };

  return (
    <button
      type="button"
      aria-label={String(keyboard.label)}
      style={buttonStyle}
      onClick={() => handleKeyboardKeyClick(keyboard)}
      onMouseDown={handleActive}
      onMouseUp={handleInactive}
      onTouchStart={handleActive}
      onTouchEnd={handleInactive}
    >
      <span style={labelStyle}>{keyboard.label}</span>
      {keyboard.subLabel && <span style={subLabelStyle}>{keyboard.subLabel}</span>}
    </button>
  );
};

export default TheKey;
