import { CSSProperties } from "react";
import { KeyboardThemeValues, KeyboardType, KeyboardKey } from "./type";
import { THEME } from "../../type";

export const KEYBOARD_THEME: Record<THEME, KeyboardThemeValues> = {
  [THEME.LIGHT]: {
    backgroundColor: "rgba(206, 210, 217, 0.70)",
    color: "#000",
    keyBackground: "#FFF",
    keyShadow: "0px 1px 0px 0px rgba(0, 0, 0, 0.30)",
    keyActiveBackground: "rgba(206, 210, 217, 0.70)",
  },
  [THEME.DARK]: {
    backgroundColor: "rgba(32, 32, 32, 0.92)",
    color: "#fff",
    keyBackground: "#434343",
    keyShadow: "0px 1px 0px 0px #000",
    keyActiveBackground: "#585858",
  },
};

export const KEYBOARD_SECTION_STYLE: CSSProperties = {
  position: "fixed",
  height: "fit-content",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
};

export const KEYBOARD_TOOLBAR: CSSProperties = {};

export const NUM_OF_ROWS: Partial<Record<KeyboardType, number>> = {
  [KeyboardType.Decimal]: 4,
};

export const NUM_OF_COLUMNS: Partial<Record<KeyboardType, number>> = {
  [KeyboardType.Decimal]: 3,
};

export const DELETE_KEY_VALUE = "backspace";

export const KEYBOARD_KEYS: Partial<Record<KeyboardType, KeyboardKey[]>> = {
  [KeyboardType.Decimal]: [
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
    { label: "⌫", value: DELETE_KEY_VALUE },
  ],
};

export const KEYBOARDS_CONTAINER_STYLE: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(10, 1fr)",
  gap: "0.44rem",
  padding: "0.44rem 0.44rem 3rem",
  backdropFilter: "blur(35px)",
};

export const KEY_NORMAL_STYLE: CSSProperties = {
  width: "100%",
  aspectRatio: "2.6071428571",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "0.3125rem",
  color: "inherit",
  fontSize: "1.5rem",
};

export const SUB_LABEL_STYLE: CSSProperties = {
  fontSize: "0.4em",
  color: "inherit",
  fontWeight: 700,
};
