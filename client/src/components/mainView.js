import React, { useState } from "react";
import "../App.css";

function App() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const handleDecrement = (index) => {
    setCounts((prevCounts) => {
      const updatedCounts = [...prevCounts];
      updatedCounts[index] = Math.max(0, updatedCounts[index] - 1);
      return updatedCounts;
    });
  };

  const handleIncrement = (index) => {
    setCounts((prevCounts) => {
      const updatedCounts = [...prevCounts];
      updatedCounts[index] = updatedCounts[index] + 1;
      return updatedCounts;
    });
  };

  return (
    <div>
      <header>
        <h1>Simulate Production of Products</h1>
      </header>

      <div className="container">
        {[1, 2, 3, 4].map((machine, index) => (
          <div className="machine" key={index}>
            <h2>Machine {machine}</h2>
            <button className="button" onClick={() => handleDecrement(index)}>
              -
            </button>
            <button className="button count-button">{counts[index]}</button>
            <button className="button" onClick={() => handleIncrement(index)}>
              +
            </button>
          </div>
        ))}
      </div>

      <div className="stock-section">
        <h2>Stock of Materials</h2>
        <div id="stock"></div>
      </div>

      <div className="statistics-section">
        <h2>Statistics</h2>
        <div id="statistics"></div>
      </div>
    </div>
  );
}

export default App;
