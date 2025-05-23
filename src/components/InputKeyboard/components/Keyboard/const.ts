import { KeyboardKey, LayoutType } from "./type";

export const NUM_OF_ROWS: Partial<Record<LayoutType, number>> = {
  [LayoutType.Decimal]: 4,
};

export const NUM_OF_COLUMNS: Partial<Record<LayoutType, number>> = {
  [LayoutType.Decimal]: 3,
};

export const DELETE_KEY_VALUE = "delete";

export const KEYBOARD_KEYS: Partial<Record<LayoutType, KeyboardKey[]>> = {
  [LayoutType.Decimal]: [
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
