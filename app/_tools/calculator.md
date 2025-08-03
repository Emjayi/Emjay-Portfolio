---
title: "Calculator"
description: "Advanced calculator with scientific functions and mathematical operations."
date: "2023-12-12"
author: "Emjay Sepahi"
category: "Utility"
tags: "calculator, math, scientific, utility"
image: "/images/tools/calculator.png"
body: "A comprehensive calculator for all your mathematical needs..."
name: "Calculator"
href: "tools/calculator"
git_link: "https://github.com/Emjayi/Emjay-Portfolio/blob/main/app/tools/calculator/page.tsx"
---

# Calculator Tool

## Overview

A comprehensive web-based calculator that provides both basic arithmetic operations and advanced scientific functions. Built with modern web technologies, this calculator offers a clean, intuitive interface for all your mathematical calculations.

## Features

### 🔢 **Basic Operations**
- Addition, subtraction, multiplication, division
- Percentage calculations
- Square and square root functions
- Clear and delete functionality
- Decimal point support

### 🧮 **Scientific Functions**
- Trigonometric functions (sin, cos, tan)
- Logarithmic functions (log, ln)
- Exponential calculations
- Factorial operations
- Memory functions (M+, M-, MR, MC)

### 💻 **Advanced Features**
- Keyboard support for quick input
- History of calculations
- Copy results to clipboard
- Responsive design for all devices
- Dark/light theme support

## Technical Implementation

### Frontend Technologies
- **React.js** - Component-based architecture
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling
- **Framer Motion** - Smooth animations

### Key Components

#### Calculator Display
```tsx
interface CalculatorDisplayProps {
  currentValue: string;
  previousValue: string;
  operation: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  currentValue,
  previousValue,
  operation
}) => {
  return (
    <div className="calculator-display">
      <div className="previous-value">
        {previousValue} {operation}
      </div>
      <div className="current-value">
        {currentValue || '0'}
      </div>
    </div>
  );
};
```

#### Calculator Button
```tsx
interface CalculatorButtonProps {
  value: string;
  onClick: (value: string) => void;
  type: 'number' | 'operator' | 'function' | 'equals' | 'clear';
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  value,
  onClick,
  type,
  className
}) => {
  return (
    <button
      className={`calculator-button ${type} ${className}`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};
```

### State Management
```tsx
interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: string;
  waitingForOperand: boolean;
  memory: number;
}

const [state, setState] = useState<CalculatorState>({
  currentValue: '0',
  previousValue: '',
  operation: '',
  waitingForOperand: false,
  memory: 0
});
```

## Mathematical Operations

### Basic Arithmetic
```tsx
const performCalculation = (left: number, right: number, operation: string): number => {
  switch (operation) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '×':
      return left * right;
    case '÷':
      return right !== 0 ? left / right : 0;
    case '%':
      return (left * right) / 100;
    default:
      return right;
  }
};
```

### Scientific Functions
```tsx
const scientificFunctions = {
  sin: (value: number) => Math.sin(value * Math.PI / 180),
  cos: (value: number) => Math.cos(value * Math.PI / 180),
  tan: (value: number) => Math.tan(value * Math.PI / 180),
  log: (value: number) => Math.log10(value),
  ln: (value: number) => Math.log(value),
  sqrt: (value: number) => Math.sqrt(value),
  square: (value: number) => Math.pow(value, 2),
  factorial: (value: number) => {
    if (value < 0) return NaN;
    if (value === 0 || value === 1) return 1;
    let result = 1;
    for (let i = 2; i <= value; i++) {
      result *= i;
    }
    return result;
  }
};
```

## User Interface Design

### Layout Structure
- **Display Area** - Shows current and previous values
- **Number Pad** - 0-9 digits and decimal point
- **Operators** - Basic arithmetic operations
- **Functions** - Scientific and utility functions
- **Memory Controls** - Store and recall values

### Responsive Design
```css
.calculator {
  @apply max-w-sm mx-auto p-4;
}

.calculator-display {
  @apply bg-gray-100 p-4 rounded-t-lg text-right;
}

.calculator-buttons {
  @apply grid grid-cols-4 gap-1;
}

@media (max-width: 640px) {
  .calculator {
    @apply max-w-full;
  }
}
```

### Theme Support
```tsx
const [theme, setTheme] = useState<'light' | 'dark'>('light');

const themeClasses = {
  light: 'bg-white text-gray-900',
  dark: 'bg-gray-900 text-white'
};
```

## Keyboard Support

### Key Mappings
```tsx
const keyMappings = {
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  '.': '.', '+': '+', '-': '-', '*': '×', '/': '÷',
  'Enter': '=', 'Escape': 'C', 'Backspace': '⌫'
};

useEffect(() => {
  const handleKeyPress = (event: KeyboardEvent) => {
    const key = keyMappings[event.key];
    if (key) {
      event.preventDefault();
      handleInput(key);
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

## Performance Optimizations

### Memoization
```tsx
const CalculatorButton = React.memo<CalculatorButtonProps>(({
  value,
  onClick,
  type,
  className
}) => {
  const handleClick = useCallback(() => {
    onClick(value);
  }, [onClick, value]);

  return (
    <button
      className={`calculator-button ${type} ${className}`}
      onClick={handleClick}
    >
      {value}
    </button>
  );
});
```

### Debounced Input
```tsx
const debouncedCalculation = useMemo(
  () => debounce((value: string) => {
    // Perform calculation
  }, 100),
  []
);
```

## Accessibility Features

### ARIA Labels
```tsx
<button
  aria-label={`Calculate ${operation}`}
  className="calculator-button operator"
  onClick={() => handleOperation(operation)}
>
  {operation}
</button>
```

### Keyboard Navigation
- Tab navigation through all buttons
- Enter key for equals operation
- Escape key for clear function
- Arrow keys for navigation

### Screen Reader Support
```tsx
<div role="application" aria-label="Calculator">
  <div role="textbox" aria-label="Calculator display">
    {currentValue}
  </div>
</div>
```

## Testing

### Unit Tests
```tsx
describe('Calculator Operations', () => {
  test('should perform basic addition', () => {
    expect(performCalculation(5, 3, '+')).toBe(8);
  });

  test('should handle division by zero', () => {
    expect(performCalculation(5, 0, '÷')).toBe(0);
  });

  test('should calculate factorial', () => {
    expect(scientificFunctions.factorial(5)).toBe(120);
  });
});
```

### Integration Tests
```tsx
describe('Calculator Integration', () => {
  test('should display result after calculation', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    
    expect(screen.getByDisplayValue('8')).toBeInTheDocument();
  });
});
```

## Future Enhancements

### Planned Features
- **Graphing Calculator** - Plot mathematical functions
- **Unit Converter** - Convert between different units
- **Currency Calculator** - Real-time exchange rates
- **History Export** - Save calculation history
- **Custom Functions** - User-defined mathematical operations

### Technical Improvements
- **WebAssembly** - Faster mathematical computations
- **Service Worker** - Offline functionality
- **PWA Support** - Install as desktop app
- **Voice Input** - Speech-to-text for calculations

## Usage Examples

### Basic Calculation
1. Enter first number: `123`
2. Press operator: `+`
3. Enter second number: `456`
4. Press equals: `=`
5. Result: `579`

### Scientific Function
1. Enter number: `30`
2. Press `sin` button
3. Result: `0.5` (sin of 30 degrees)

### Memory Operations
1. Enter number: `100`
2. Press `M+` to store in memory
3. Enter new number: `50`
4. Press `MR` to recall memory value
5. Result: `100`

## Conclusion

The Calculator tool demonstrates how modern web technologies can be used to create powerful, user-friendly applications. With its comprehensive feature set, responsive design, and accessibility support, it provides a complete solution for mathematical calculations in the browser.

The project showcases best practices in React development, including component composition, state management, performance optimization, and user experience design.

**Try the Calculator**: [tools/calculator](/tools/calculator)  
**Source Code**: [GitHub](https://github.com/Emjayi/Emjay-Portfolio/blob/main/app/tools/calculator/page.tsx) 