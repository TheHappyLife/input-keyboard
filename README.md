# Input Keyboard Component

A customizable virtual keyboard component for React applications that provides a native-like input experience.

## Features

- Multiple input types (Text, Number, Decimal)
- Customizable display types
- Floating keyboard option
- Auto-focus capability
- Custom toolbar support
- Replace element display option
- Responsive design
- Touch and mouse support

## Installation

```bash
npm install input-keyboard
# or
yarn add input-keyboard
```

## Basic Usage

```tsx
import { InputKeyboard } from "input-keyboard";

function App() {
  const handleChange = (value: string) => {
    console.log("Input value:", value);
  };

  return <InputKeyboard onChange={handleChange} inputType="decimal" displayType="text" />;
}
```

## Props

| Prop             | Type                      | Default             | Description                                                 |
| ---------------- | ------------------------- | ------------------- | ----------------------------------------------------------- |
| `children`       | `ReactNode`               | -                   | Custom content to be rendered inside the input              |
| `toolbar`        | `ReactNode`               | -                   | Custom toolbar component to be displayed above the keyboard |
| `inputType`      | `InputType`               | `InputType.Decimal` | Type of keyboard to display                                 |
| `displayType`    | `DisplayType`             | `DisplayType.Text`  | How the input value should be displayed                     |
| `onChange`       | `(value: string) => void` | -                   | Callback function when input value changes                  |
| `replaceElement` | `ReactNode`               | -                   | Element to display when `displayType` is set to `Replace`   |
| `isFloating`     | `boolean`                 | -                   | Whether the keyboard should float above other content       |
| `autoFocus`      | `boolean`                 | -                   | Whether the keyboard should automatically focus on mount    |
| `onFocus`        | `() => void`              | -                   | Callback function when keyboard gains focus                 |
| `onBlur`         | `() => void`              | -                   | Callback function when keyboard loses focus                 |
| `alwaysFocus`    | `boolean`                 | -                   | Whether the keyboard should always remain focused           |

## Types

### InputType

```typescript
enum InputType {
  Text = "text",
  Number = "number",
  Decimal = "decimal",
}
```

### DisplayType

```typescript
enum DisplayType {
  Text = "text",
  Number = "number",
  Replace = "replace",
}
```

## Keyboard Layouts

### Decimal Keyboard

- 4 rows x 3 columns layout
- Numbers 0-9
- Decimal point (.)
- Backspace key
- Sub-labels for letters on number keys

## Styling

The component uses inline styles by default, but you can override them using the following CSS properties:

```css
.keyboard-section {
  position: fixed;
  height: fit-content;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

.keyboard-container {
  display: grid;
  gap: 0.44rem;
  padding: 0.44rem 0.44rem 4.88rem;
  background-color: rgba(206, 210, 217, 0.7);
  backdrop-filter: blur(35px);
}

.key {
  width: 100%;
  aspect-ratio: 2.6071428571;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 0.3125rem;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.3);
  color: #000;
}
```

## Examples

### Basic Decimal Input

```tsx
<InputKeyboard inputType={InputType.Decimal} displayType={DisplayType.Text} onChange={(value) => console.log(value)} />
```

### Number Input with Custom Toolbar

```tsx
<InputKeyboard
  inputType={InputType.Number}
  displayType={DisplayType.Number}
  toolbar={<div>Custom Toolbar</div>}
  onChange={(value) => console.log(value)}
/>
```

### Replace Display Type

```tsx
<InputKeyboard
  inputType={InputType.Decimal}
  displayType={DisplayType.Replace}
  replaceElement={<div>🔒</div>}
  onChange={(value) => console.log(value)}
/>
```

### Auto-focus with Always Focus

```tsx
<InputKeyboard autoFocus alwaysFocus onChange={(value) => console.log(value)} />
```

## Methods

The component exposes the following methods through ref:

```typescript
interface InputKeyboardRef {
  focus: () => void;
  blur: () => void;
  setValue: (value: string) => void;
}
```

Example usage:

```tsx
const keyboardRef = useRef<InputKeyboardRef>(null);

// Focus the keyboard
keyboardRef.current?.focus();

// Blur the keyboard
keyboardRef.current?.blur();

// Set value programmatically
keyboardRef.current?.setValue("123.45");
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
