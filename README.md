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

You can import the CSS:

```typescript
import "tek-keyboard/dist/components/InputKeyboard/input-keyboard.css";
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

| Prop             | Type          | Description                                                        | Default       |
| ---------------- | ------------- | ------------------------------------------------------------------ | ------------- |
| `value`          | `string`      | The current value of the input                                     | -             |
| `placeholder`    | `string`      | Placeholder text when input is empty                               | -             |
| `theme`          | `THEME`       | Theme of the input (LIGHT/DARK)                                    | `THEME.LIGHT` |
| `autoFocus`      | `boolean`     | Whether to focus the input on mount                                | `false`       |
| `alwaysFocus`    | `boolean`     | Whether to keep the input always focused                           | `false`       |
| `displayType`    | `DisplayType` | How to display the input (Text/Number/Replace)                     | `Text`        |
| `replaceElement` | `ReactNode`   | Element to use for replacement display when displayType is Replace | `"●"`         |

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

| Prop         | Type              | Description                          |
| ------------ | ----------------- | ------------------------------------ |
| `styles`     | `InputStyleProps` | Custom styles for different elements |
| `classNames` | `InputClassNames` | Custom class names for elements      |

### InputStyleProps Interface

```typescript
interface InputStyleProps {
  container?: CSSProperties; // Styles for the main container
  input?: CSSProperties; // Styles for the input area
  text?: CSSProperties; // Styles for the text content
  placeholder?: CSSProperties; // Styles for the placeholder
}
```

### InputClassNames Interface

```typescript
interface InputClassNames {
  container?: string; // Class name for the main container
  input?: string; // Class name for the input area
  text?: string; // Class name for the text content
  placeholder?: string; // Class name for the placeholder
}
```

## Keyboard Component

### Overview

The Keyboard component is a customizable virtual keyboard that can be integrated with the Input component. It supports different keyboard types, display modes, and themes.

### Exposed Methods

The Keyboard component exposes the following methods through `forwardRef`:

```typescript
interface KeyboardRef {
  open: () => void; // Open the keyboard
  close: () => void; // Close the keyboard
  getKeyboardHeight: () => number | undefined; // Get the keyboard height
}
```

Usage example:

```tsx
const keyboardRef = useRef<KeyboardRef>(null);

// Open the keyboard
keyboardRef.current?.open();

// Close the keyboard
keyboardRef.current?.close();

// Get keyboard height
const height = keyboardRef.current?.getKeyboardHeight();

<Keyboard ref={keyboardRef} />;
```

## Props

### Basic Props

| Prop                     | Type           | Description                                       | Default                |
| ------------------------ | -------------- | ------------------------------------------------- | ---------------------- |
| `keyboardType`           | `KeyboardType` | Type of keyboard (Text/Number/Decimal)            | `KeyboardType.Decimal` |
| `theme`                  | `THEME`        | Theme of the keyboard (LIGHT/DARK)                | `THEME.LIGHT`          |
| `alwaysOpen`             | `boolean`      | Whether keyboard should always be visible         | `false`                |
| `openInit`               | `boolean`      | Whether keyboard should be open initially         | `false`                |
| `outFocusOnClickToolbar` | `boolean`      | Whether to close keyboard when clicking toolbar   | `true`                 |
| `toolbarFullHeight`      | `boolean`      | Whether toolbar should take full remaining height | `false`                |
| `value`                  | `string`       | Current value of the keyboard                     | -                      |

### Event Handlers

| Prop       | Type                        | Description                          |
| ---------- | --------------------------- | ------------------------------------ |
| `onChange` | `(value: string) => void`   | Callback when keyboard value changes |
| `onOpen`   | `(height?: number) => void` | Callback when keyboard opens         |
| `onClose`  | `() => void`                | Callback when keyboard closes        |

### Custom Elements

| Prop      | Type        | Description                              |
| --------- | ----------- | ---------------------------------------- |
| `toolbar` | `ReactNode` | Custom toolbar to display above keyboard |
| `trigger` | `ReactNode` | Element that triggers keyboard opening   |

### Styling Props

| Prop         | Type                 | Description                          |
| ------------ | -------------------- | ------------------------------------ |
| `styles`     | `KeyboardStyleProps` | Custom styles for different elements |
| `classNames` | `KeyboardClassNames` | Custom class names for elements      |

### KeyboardStyleProps Interface

```typescript
interface KeyboardStyleProps {
  container?: CSSProperties; // Styles for the main container
  toolbar?: CSSProperties; // Styles for the toolbar
  keyboardContainer?: CSSProperties; // Styles for the keyboard container
  key?: CSSProperties; // Styles for individual keys
  keyHover?: CSSProperties; // Styles for key hover state
  keyActive?: CSSProperties; // Styles for key active state
  trigger?: CSSProperties; // Styles for the trigger element
}
```

### KeyboardClassNames Interface

```typescript
interface KeyboardClassNames {
  container?: string; // Class name for the main container
  toolbar?: string; // Class name for the toolbar
  keyboardContainer?: string; // Class name for the keyboard container
  trigger?: string; // Class name for the trigger element
  theKey?: TheKeyClassNames; // Class names for individual keys
}
```

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

| Prop       | Type                      | Description                 |
| ---------- | ------------------------- | --------------------------- |
| `onChange` | `(value: string) => void` | Callback when value changes |

## Features

### Input Component

- Responsive design
- Customizable themes (Light/Dark)
- Support for left and right elements
- Animated cursor
- Customizable styling
- Placeholder support
- Focus/blur handling
- Auto-focus and always-focus options
- Display type customization (Text/Number/Replace)

### Keyboard Component

- Multiple keyboard types (Text/Number/Decimal)
- Customizable themes (Light/Dark)
- Custom toolbar support
- Responsive design
- Animated key presses
- Value validation
- Height management
- Click outside handling
- Full-height toolbar option

### InputKeyboard Component

- Integrated Input and Keyboard components
- Automatic focus management
- Value synchronization between input and keyboard
- Customizable themes for both components
- Support for always visible keyboard
- Custom toolbar support
- Responsive design
- Event handling for value changes
- Support for different keyboard types and display modes

## Best Practices

1. Use `alwaysOpen` when you want the keyboard to be permanently visible
2. Use `openInit` when you want the keyboard to be open on initial render
3. Customize input and keyboard separately using their respective prop objects
4. Use theme props at the InputKeyboard level for consistent theming
5. Handle value changes through the `onChange` callback
6. Use `displayType` and `replaceElement` for secure input display
7. Utilize `autoFocus` and `alwaysFocus` for better user experience
8. Customize styles and class names for better integration with your design system
