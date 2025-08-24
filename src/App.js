import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [isDegree, setIsDegree] = useState(true);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      let expression = input
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/log/g, "Math.log10")
        .replace(/ln/g, "Math.log")
        .replace(/√/g, "Math.sqrt")
        .replace(/\^/g, "**");

      // If DEG mode, convert degrees to radians
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
    "(", ")", "√", "ln", "=",
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
              onClick={() => (btn === "=" ? handleCalculate() : handleClick(btn))}
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
