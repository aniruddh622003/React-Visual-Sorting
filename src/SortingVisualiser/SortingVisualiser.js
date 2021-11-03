import React, { useState, useEffect } from "react";
import { getMergeSortAnimations } from "./algorithms/SortingAlgorithms";
import { ANIMATION_SPEED_MS, PRIMARY_COLOR, SECONDARY_COLOR } from "./settings";
import "./SortingVisualiser.css";

function SortingVisualiser() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  function mergeSort() {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

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
    <>
      <div className="array-cont">
        {array.map((value, id) => (
          <div
            className="array-bar"
            key={id}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={() => resetArray()}>Generate New Array</button>
        <button onClick={() => mergeSort()}>Merge Sort</button>
      </div>
    </>
  );
}

export default SortingVisualiser;
