import { CSSProperties } from "react";
import { THEME } from "../../type";
import { InputThemeValues } from "./type";

export const INPUT_THEME: Record<THEME, InputThemeValues> = {
  [THEME.LIGHT]: {
    color: "#000",
    border: "1px solid #333",
    backgroundColor: "#fff",
    placeholderColor: "#888",
  },
  [THEME.DARK]: {
    color: "#ddd",
    border: "1px solid #333",
    backgroundColor: "#000",
    placeholderColor: "#888",
  },
};

export const INPUT_CONTAINER_STYLE: CSSProperties = {
  display: "flex",
  alignItems: "center",
  minWidth: "250px",
  padding: "0.75rem 1rem",
  borderRadius: "0.75rem",
};
export const INPUT_STYLE: CSSProperties = {
  overflow: "hidden",
  flexGrow: 1,
  fontSize: "1rem",
};

export const INPUT_PLACEHOLDER_STYLE: CSSProperties = {
  fontSize: "0.9em",
};
