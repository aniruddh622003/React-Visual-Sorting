import React, { useState, useEffect } from "react";
import "./SortingVisualiser.css";

function SortingVisualiser() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min - 1) + min);
  }

  const resetArray = () => {
    const arr = [];
    for (let i = 0; i < (window.innerWidth - 200) / 4; i++) {
      arr.push(randomIntFromInterval(5, window.innerHeight - 150));
    }
    setArray(arr);
  };
  return (
    <div className="array-cont">
      {array.map((value, id) => (
        <div
          className="array-bar"
          key={id}
          style={{ height: `${value}px` }}
        ></div>
      ))}
    </div>
  );
}

export default SortingVisualiser;
