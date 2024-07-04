import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import Display from './components/Screen';
import ConfettiExplosion from 'react-confetti-explosion';
import { evaluate, format } from 'mathjs';

const App = () => {
  const [display, setDisplay] = useState(''); // State to manage calculator display
  const [isExploding, setIsExploding] = useState(false); // State to manage confetti explosion
  const [angleUnit, setAngleUnit] = useState('deg'); // State to manage angle units
  const [isSecondary, setIsSecondary] = useState(false); // State to manage secondary functions
  const [memory, setMemory] = useState(0); // State to manage memory storage

  // Function to calculate the result of the current expression
  const calculateResult = (expression) => {
    try {
      const formattedExpression = expression.replace('×', '*').replace('÷', '/').replace('−', '-');
      const result = evaluate(formattedExpression);
      if (result === Infinity || result === -Infinity) {
        return 'Error';
      }
      return format(result, { precision: 10 });
    } catch (e) {
      console.error('Calculation error:', e);
      return 'Error';
    }
  };

  // Function to handle button clicks
  const handleClick = (label) => {
    switch (label) {
      case 'C':
        setDisplay('');
        break;
      case '=':
        const result = calculateResult(display);
        setDisplay(result.toString());
        if (/\b5\b.*\b6\b|\b6\b.*\b5\b/.test(display)) {
          setIsExploding(true);
          setTimeout(() => setIsExploding(false), 3000);
        }
        break;
      case '±':
        setDisplay((prev) => (prev.charAt(0) === '-' ? prev.slice(1) : '-' + prev));
        break;
      case '%':
        setDisplay((prev) => (evaluate(prev) / 100).toString());
        break;
      case '2nd':
        setIsSecondary(!isSecondary);
        break;
      case 'Rad':
        setAngleUnit(angleUnit === 'deg' ? 'rad' : 'deg');
        break;
      case 'MC':
        setMemory(0);
        break;
      case 'M+':
        setMemory((prevMemory) => prevMemory + evaluate(display));
        break;
      case 'M-':
        setMemory((prevMemory) => prevMemory - evaluate(display));
        break;
      case 'MR':
        setDisplay(memory.toString());
        break;
      default:
        handleSpecialFunctions(label);
    }
  };

  // Function to handle special function buttons
  const handleSpecialFunctions = (label) => {
    switch (label) {
      case 'x²':
        setDisplay((prev) => Math.pow(evaluate(prev), 2).toString());
        break;
      case 'x³':
        setDisplay((prev) => Math.pow(evaluate(prev), 3).toString());
        break;
      case 'xʸ':
        setDisplay((prev) => prev + '**');
        break;
      case 'eˣ':
        setDisplay((prev) => Math.exp(evaluate(prev)).toString());
        break;
      case '10ˣ':
        setDisplay((prev) => Math.pow(10, evaluate(prev)).toString());
        break;
      case '¹/x':
        setDisplay((prev) => (1 / evaluate(prev)).toString());
        break;
      case '²√x':
        setDisplay((prev) => Math.sqrt(evaluate(prev)).toString());
        break;
      case '³√x':
        setDisplay((prev) => Math.cbrt(evaluate(prev)).toString());
        break;
      case 'ʸ√x':
        setDisplay((prev) => prev + '^(1/');
        break;
      case 'ln':
        setDisplay((prev) => Math.log(evaluate(prev)).toString());
        break;
      case 'log₁₀':
        setDisplay((prev) => Math.log10(evaluate(prev)).toString());
        break;
      case 'x!':
        const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
        setDisplay((prev) => factorial(evaluate(prev)).toString());
        break;
      case 'sin':
      case 'cos':
      case 'tan':
        handleTrigonometry(label);
        break;
      case 'asin':
      case 'acos':
      case 'atan':
        handleInverseTrigonometry(label);
        break;
      case 'e':
        setDisplay(Math.E.toString());
        break;
      case 'EE':
        setDisplay((prev) => prev + 'e');
        break;
      case 'sinh':
        setDisplay((prev) => Math.sinh(evaluate(prev)).toString());
        break;
      case 'cosh':
        setDisplay((prev) => Math.cosh(evaluate(prev)).toString());
        break;
      case 'tanh':
        setDisplay((prev) => Math.tanh(evaluate(prev)).toString());
        break;
      case 'π':
        setDisplay((prev) => prev + Math.PI.toString());
        break;
      case 'Rand':
        setDisplay(Math.random().toString());
        break;
      default:
        setDisplay((prev) => prev + label);
    }
  };

  // Function to handle trigonometric functions
  const handleTrigonometry = (func) => {
    const angle = angleUnit === 'deg' ? (evaluate(display) * Math.PI) / 180 : evaluate(display);
    const result = func === 'sin' ? Math.sin(angle) :
                   func === 'cos' ? Math.cos(angle) : Math.tan(angle);
    setDisplay(result.toString());
  };

  // Function to handle inverse trigonometric functions
  const handleInverseTrigonometry = (func) => {
    const value = evaluate(display);
    const resultInRadians = func === 'asin' ? Math.asin(value) :
                            func === 'acos' ? Math.acos(value) : Math.atan(value);
    const resultInDegrees = resultInRadians * (180 / Math.PI);
    setDisplay(resultInDegrees.toString());
  };

  // Button configuration array
  const buttons = [
    { label: '(', className: 'hidden-mobile' },
    { label: ')', className: 'hidden-mobile' },
    { label: 'MC', className: 'hidden-mobile' },
    { label: 'M+', className: 'hidden-mobile' },
    { label: 'M-', className: 'hidden-mobile' },
    { label: 'MR', className: 'hidden-mobile' },
    { label: 'C' },
    { label: '±' },
    { label: '%' },
    { label: '÷', className: 'operator' },
    { label: '2nd', className: 'hidden-mobile' },
    { label: 'x²', className: 'hidden-mobile' },
    { label: 'x³', className: 'hidden-mobile' },
    { label: 'xʸ', className: 'hidden-mobile' },
    { label: 'eˣ', className: 'hidden-mobile' },
    { label: '10ˣ', className: 'hidden-mobile' },
    { label: '7', className: 'number' },
    { label: '8', className: 'number' },
    { label: '9', className: 'number' },
    { label: '×', className: 'operator' },
    { label: '¹/x', className: 'hidden-mobile' },
    { label: '²√x', className: 'hidden-mobile' },
    { label: '³√x', className: 'hidden-mobile' },
    { label: 'ʸ√x', className: 'hidden-mobile' },
    { label: 'ln', className: 'hidden-mobile' },
    { label: 'log₁₀', className: 'hidden-mobile' },
    { label: '4', className: 'number' },
    { label: '5', className: 'number' },
    { label: '6', className: 'number' },
    { label: '−', className: 'operator' },
    { label: 'x!', className: 'hidden-mobile' },
    { label: isSecondary ? 'asin' : 'sin', className: 'hidden-mobile' },
    { label: isSecondary ? 'acos' : 'cos', className: 'hidden-mobile' },
    { label: isSecondary ? 'atan' : 'tan', className: 'hidden-mobile' },
    { label: 'e', className: 'hidden-mobile' },
    { label: 'EE', className: 'hidden-mobile' },
    { label: '1', className: 'number' },
    { label: '2', className: 'number' },
    { label: '3', className: 'number' },
    { label: '+', className: 'operator' },
    { label: 'Rad', className: 'hidden-mobile rrad' },
    { label: 'sinh', className: 'hidden-mobile' },
    { label: 'cosh', className: 'hidden-mobile' },
    { label: 'tanh', className: 'hidden-mobile' },
    { label: 'π', className: 'hidden-mobile' },
    { label: 'Rand', className: 'hidden-mobile' },
    { label: '0', className: 'zero number' },
    { label: '.', className: 'number' },
    { label: '=', className: 'operator equals' },
  ];

  return (
    <div className="calculator">
      {isExploding && <ConfettiExplosion />}
      <Display value={display} />
      <div className="buttons">
        {buttons.map((btn, index) => (
          <Button
            key={index}
            label={btn.label}
            className={btn.className}
            onClick={() => handleClick(btn.label)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
