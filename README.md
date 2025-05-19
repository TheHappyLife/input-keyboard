# Package Overview

This package provides three main components for creating a virtual keyboard input system:

1. [Input Component](#input-component) - A customizable text input field
2. [Keyboard Component](#keyboard-component) - A virtual keyboard with different types and display modes
3. [InputKeyboard Component](#inputkeyboard-component) - An integrated solution combining Input and Keyboard components

Each component can be used independently or together to create a complete virtual keyboard input system. Click on the component names above to jump to their detailed documentation.

## Installation

```bash
npm install tek-keyboard
```

## Usage

### Import CSS

You can import the CSS in one of two ways:

1. Direct CSS import:

```typescript
import "tek-keyboard/dist/components/InputKeyboard/input-keyboard.css";
```

2. Import through styles object:

```typescript
import { styles } from "tek-keyboard";
```

### Basic Usage

```tsx
import { InputKeyboard } from "tek-keyboard";
import "tek-keyboard/dist/components/InputKeyboard/input-keyboard.css";

function App() {
  return <InputKeyboard placeholder="Enter text" theme="light" />;
}
```

## Input Component

### Overview

The Input component is a customizable text input field that supports various themes, styling options, and additional features like left/right elements and cursor animation.

### Exposed Methods

The Input component exposes the following methods through `forwardRef`:

```typescript
interface InputRef {
  focus: () => void; // Focus the input field
  blur: () => void; // Remove focus from the input field
}
```

Usage example:

```tsx
const inputRef = useRef<InputRef>(null);

// Focus the input
inputRef.current?.focus();

// Blur the input
inputRef.current?.blur();

<Input ref={inputRef} />;
```

## Props

### Basic Props

| Prop           | Type          | Description                               | Default       |
| -------------- | ------------- | ----------------------------------------- | ------------- |
| `displayValue` | `ReactNode[]` | Array of elements to display in the input | -             |
| `value`        | `string`      | The actual value of the input             | -             |
| `placeholder`  | `string`      | Placeholder text when input is empty      | -             |
| `theme`        | `THEME`       | Theme of the input (LIGHT/DARK)           | `THEME.LIGHT` |

### Event Handlers

| Prop      | Type         | Description                     |
| --------- | ------------ | ------------------------------- |
| `onFocus` | `() => void` | Callback when input is focused  |
| `onBlur`  | `() => void` | Callback when input loses focus |

### Custom Elements

| Prop           | Type        | Description                                   |
| -------------- | ----------- | --------------------------------------------- |
| `leftElement`  | `ReactNode` | Element to display on the left side of input  |
| `rightElement` | `ReactNode` | Element to display on the right side of input |

### Styling Props

| Prop               | Type            | Description                           |
| ------------------ | --------------- | ------------------------------------- |
| `inputStyle`       | `CSSProperties` | Custom styles for the input container |
| `textStyle`        | `CSSProperties` | Custom styles for the input text      |
| `placeholderStyle` | `CSSProperties` | Custom styles for the placeholder     |
| `containerStyle`   | `CSSProperties` | Custom styles for the main container  |

### Theme Customization

| Prop                  | Type               | Description                   |
| --------------------- | ------------------ | ----------------------------- |
| `themeValuesOverride` | `InputThemeValues` | Override default theme values |

### InputThemeValues Interface

```typescript
interface InputThemeValues {
  color?: string; // Text color
  border?: string; // Border style
  placeholderColor?: string; // Placeholder text color
  backgroundColor?: string; // Background color
}
```

## Default Styles

The component comes with predefined styles that can be overridden:

### Container Style

```typescript
{
  display: "flex",
  alignItems: "center",
  minWidth: "250px",
  padding: "0.75rem 1rem",
  borderRadius: "0.75rem"
}
```

### Input Style

```typescript
{
  overflow: "hidden",
  flexGrow: 1,
  fontSize: "1rem"
}
```

## Default Theme Values

### Light Theme

```typescript
{
  color: "#000",
  border: "1px solid #333",
  backgroundColor: "#fff",
  placeholderColor: "#888"
}
```

### Dark Theme

```typescript
{
  color: "#ddd",
  border: "1px solid #333",
  backgroundColor: "#000",
  placeholderColor: "#888"
}
```

## Usage Example

```tsx
import { Input } from 'tek-keyboard';

// Basic usage
<Input
  placeholder="Enter text"
  theme="light"
/>

// With custom styling
<Input
  placeholder="Custom styled input"
  inputStyle={{ fontSize: '1.2rem' }}
  containerStyle={{ border: '2px solid blue' }}
/>

// With left and right elements
<Input
  placeholder="With icons"
  leftElement={<IconLeft />}
  rightElement={<IconRight />}
/>

// With custom theme values
<Input
  placeholder="Custom theme"
  themeValuesOverride={{
    color: '#ff0000',
    backgroundColor: '#f0f0f0'
  }}
/>
```

## Features

- Responsive design
- Customizable themes (Light/Dark)
- Support for left and right elements
- Animated cursor
- Customizable styling
- Placeholder support
- Focus/blur handling

## Keyboard Component

### Overview

The Keyboard component is a customizable virtual keyboard that can be integrated with the Input component. It supports different keyboard types, display modes, and themes.

### Exposed Methods

The Keyboard component exposes the following methods through `forwardRef`:

```typescript
interface KeyboardRef {
  open: () => void; // Open the keyboard
  close: () => void; // Close the keyboard
  setValue: (value: string) => void; // Set the keyboard's value
}
```

Usage example:

```tsx
const keyboardRef = useRef<KeyboardRef>(null);

// Open the keyboard
keyboardRef.current?.open();

// Close the keyboard
keyboardRef.current?.close();

// Set keyboard value
keyboardRef.current?.setValue("123");

<Keyboard ref={keyboardRef} />;
```

## Props

### Basic Props

| Prop             | Type           | Description                                                                                           | Default                |
| ---------------- | -------------- | ----------------------------------------------------------------------------------------------------- | ---------------------- |
| `keyboardType`   | `KeyboardType` | Type of keyboard (Decimal/Number)                                                                     | `KeyboardType.Decimal` |
| `displayType`    | `DisplayType`  | How to display the input (Text/Number/Replace)                                                        | `DisplayType.Text`     |
| `replaceElement` | `ReactNode`    | Element to use for replacement display. Only works when `displayType` is set to `DisplayType.Replace` | `"*"`                  |
| `openInit`       | `boolean`      | Whether keyboard should be open initially                                                             | `false`                |
| `theme`          | `THEME`        | Theme of the keyboard (LIGHT/DARK)                                                                    | `THEME.LIGHT`          |

### Event Handlers

| Prop       | Type                                   | Description                          |
| ---------- | -------------------------------------- | ------------------------------------ |
| `onChange` | `(values: KeyboardValuesType) => void` | Callback when keyboard value changes |
| `onOpen`   | `() => void`                           | Callback when keyboard opens         |
| `onClose`  | `() => void`                           | Callback when keyboard closes        |

### Custom Elements

| Prop      | Type        | Description                              |
| --------- | ----------- | ---------------------------------------- |
| `toolbar` | `ReactNode` | Custom toolbar to display above keyboard |

### Theme Customization

| Prop                  | Type                  | Description                   |
| --------------------- | --------------------- | ----------------------------- |
| `themeValuesOverride` | `KeyboardThemeValues` | Override default theme values |

### KeyboardValuesType Interface

```typescript
interface KeyboardValuesType {
  displayValue: ReactNode[]; // Array of elements to display
  value: string; // Actual value
}
```

### DisplayType Enum

```typescript
enum DisplayType {
  Text = "Text", // Display as plain text
  Number = "Number", // Display as numbers
  Replace = "Replace", // Display with replacement characters
}
```

### KeyboardType Enum

```typescript
enum KeyboardType {
  Decimal = "Decimal", // Decimal keyboard with decimal point
  Number = "Number", // Numbers only keyboard
}
```

## Default Theme Values

### Light Theme

```typescript
{
  backgroundColor: "#fff",
  keyBackgroundColor: "#f0f0f0",
  keyTextColor: "#000",
  keyActiveBackgroundColor: "#e0e0e0",
  keyActiveTextColor: "#000",
  toolbarBackgroundColor: "#f8f8f8",
  toolbarTextColor: "#000"
}
```

### Dark Theme

```typescript
{
  backgroundColor: "#1a1a1a",
  keyBackgroundColor: "#2d2d2d",
  keyTextColor: "#fff",
  keyActiveBackgroundColor: "#3d3d3d",
  keyActiveTextColor: "#fff",
  toolbarBackgroundColor: "#2d2d2d",
  toolbarTextColor: "#fff"
}
```

## Usage Example

```tsx
import { Keyboard, KeyboardType, DisplayType } from 'tek-keyboard';

// Basic usage
<Keyboard
  keyboardType={KeyboardType.Decimal}
  displayType={DisplayType.Text}
  onChange={(values) => console.log(values)}
/>

// With custom toolbar
<Keyboard
  toolbar={<CustomToolbar />}
  theme="dark"
/>

// With custom theme values
<Keyboard
  themeValuesOverride={{
    keyBackgroundColor: '#e0e0e0',
    keyTextColor: '#333'
  }}
/>

// With replacement display
<Keyboard
  displayType={DisplayType.Replace}
  replaceElement="•"
/>
```

## Features

- Multiple keyboard types (Decimal/Number)
- Different display modes (Text/Number/Replace)
- Customizable themes (Light/Dark)
- Custom toolbar support
- Responsive design
- Animated key presses
- Value formatting
- Event handling for open/close/change

## InputKeyboard Component

### Overview

The InputKeyboard component is a combination of the Input and Keyboard components, providing an integrated solution for text input with a virtual keyboard. It handles the interaction between the input field and keyboard, managing focus states and value synchronization.

### Exposed Methods

The InputKeyboard component exposes the following methods through `forwardRef`:

```typescript
interface InputKeyboardRef {
  focus: () => void; // Focus the input and open the keyboard
  blur: () => void; // Remove focus from the input and close the keyboard
}
```

Usage example:

```tsx
const inputKeyboardRef = useRef<InputKeyboardRef>(null);

// Focus the input and open keyboard
inputKeyboardRef.current?.focus();

// Blur the input and close keyboard
inputKeyboardRef.current?.blur();

<InputKeyboard ref={inputKeyboardRef} />;
```

## Props

### Basic Props

| Prop         | Type      | Description                                    | Default       |
| ------------ | --------- | ---------------------------------------------- | ------------- |
| `value`      | `string`  | The current value of the input                 | -             |
| `theme`      | `THEME`   | Theme for both input and keyboard (LIGHT/DARK) | `THEME.LIGHT` |
| `alwaysOpen` | `boolean` | Keep keyboard always visible                   | `false`       |
| `openInit`   | `boolean` | Open keyboard on initial render                | `false`       |

### Component Props

| Prop            | Type                                            | Description                  |
| --------------- | ----------------------------------------------- | ---------------------------- |
| `inputProps`    | `Omit<InputProps, "displayValue" \| "value">`   | Props for Input component    |
| `keyboardProps` | `Omit<KeyboardProps, "openInit" \| "onChange">` | Props for Keyboard component |

### Event Handlers

| Prop       | Type                                   | Description                 |
| ---------- | -------------------------------------- | --------------------------- |
| `onChange` | `(values: KeyboardValuesType) => void` | Callback when value changes |

## Usage Example

```tsx
import { InputKeyboard, KeyboardType, DisplayType } from 'tek-keyboard';

// Basic usage
<InputKeyboard
  value=""
  onChange={(values) => console.log(values)}
/>

// With custom input and keyboard props
<InputKeyboard
  value=""
  theme="dark"
  inputProps={{
    placeholder: "Enter amount",
    leftElement: <CurrencyIcon />
  }}
  keyboardProps={{
    keyboardType: KeyboardType.Decimal,
    displayType: DisplayType.Number
  }}
/>

// Always visible keyboard
<InputKeyboard
  value=""
  alwaysOpen={true}
  keyboardProps={{
    toolbar: <CustomToolbar />
  }}
/>

// With custom theme values
<InputKeyboard
  value=""
  inputProps={{
    themeValuesOverride: {
      color: '#ff0000',
      backgroundColor: '#f0f0f0'
    }
  }}
  keyboardProps={{
    themeValuesOverride: {
      keyBackgroundColor: '#e0e0e0',
      keyTextColor: '#333'
    }
  }}
/>
```

## Features

- Integrated Input and Keyboard components
- Automatic focus management
- Value synchronization between input and keyboard
- Customizable themes for both components
- Support for always visible keyboard
- Custom toolbar support
- Responsive design
- Event handling for value changes
- Support for different keyboard types and display modes

## Component Integration

The InputKeyboard component manages the following interactions:

- Opens keyboard when input is focused
- Closes keyboard when input loses focus
- Synchronizes value between input and keyboard
- Handles theme consistency between components
- Manages keyboard visibility state

## Best Practices

1. Use `alwaysOpen` when you want the keyboard to be permanently visible
2. Use `openInit` when you want the keyboard to be open on initial render
3. Customize input and keyboard separately using their respective prop objects
4. Use theme props at the InputKeyboard level for consistent theming
5. Handle value changes through the `onChange` callback
