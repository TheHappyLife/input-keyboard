// Main component exports
export { InputKeyboard } from "./components/InputKeyboard";
export { Input } from "./components/InputKeyboard/components/Input";
export { Keyboard } from "./components/InputKeyboard/components/Keyboard";

// Theme exports
export { THEME, DisplayType } from "./components/InputKeyboard/type";

// CSS path export
export const CSS_PATH = "styles/input-keyboard.css";

// InputKeyboard types
export type {
  InputKeyboardProps,
  InputKeyboardRef,
  DisplayValue,
  StandardValues,
} from "./components/InputKeyboard/type";

// Input component types
export type {
  InputProps,
  InputRef,
  InputThemeValues,
  InputStyleProps,
} from "./components/InputKeyboard/components/Input/type";

// Keyboard component types
export type {
  KeyboardProps,
  KeyboardRef,
  KeyboardThemeValues,
  KeyboardKey,
  TheKeyProps,
  KeyboardStyleProps,
} from "./components/InputKeyboard/components/Keyboard/type";

// Keyboard enums
export { KeyboardType } from "./components/InputKeyboard/components/Keyboard/type";
