import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [isDegree, setIsDegree] = useState(true);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => setInput("");
  const handleBackspace = () => setInput((prev) => prev.slice(0, -1));

  const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

  const handleCalculate = () => {
    try {
      let expression = input
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/cot/g, "1/Math.tan")
        .replace(/sinh/g, "Math.sinh")
        .replace(/cosh/g, "Math.cosh")
        .replace(/tanh/g, "Math.tanh")
        .replace(/log/g, "Math.log10")
        .replace(/ln/g, "Math.log")
        .replace(/√/g, "Math.sqrt")
        .replace(/∛/g, "Math.cbrt")
        .replace(/x²/g, "**2")
        .replace(/x³/g, "**3")
        .replace(/10\^/g, "10**")
        .replace(/e\^/g, "Math.E**")
        .replace(/\^/g, "**")
        .replace(/(\d+)!/g, (_, n) => factorial(parseInt(n)));

      // Convert trig to DEG if necessary
      if (isDegree) {
        expression = expression.replace(
          /Math\.(sin|cos|tan)\(([^)]+)\)/g,
          (_, fn, val) => `Math.${fn}((${val}) * Math.PI / 180)`
        );
      }

      setInput(String(eval(expression)));
    } catch (error) {
      setInput("Error");
    }
  };

  const buttons = [
    "7", "8", "9", "/", "sin",
    "4", "5", "6", "*", "cos",
    "1", "2", "3", "-", "tan",
    "0", ".", "^", "+", "log",
    "(", ")", "√", "ln", "cot",
    "π", "e", "x²", "x³", "∛",
    "10^", "e^", "sinh", "cosh", "tanh",
    "!", "=", 
  ];

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">{input || "0"}</div>

        <div className="top-buttons">
          <button onClick={() => setIsDegree(!isDegree)}>
            {isDegree ? "DEG" : "RAD"}
          </button>
          <button className="yellow" onClick={handleBackspace}>⌫</button>
          <button className="red" onClick={handleClear}>C</button>
        </div>

        <div className="buttons">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() =>
                btn === "=" ? handleCalculate() : handleClick(btn)
              }
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
