import React, { useState, useEffect } from "react";
import { getMergeSortAnimations } from "./algorithms/SortingAlgorithms";
import {
  ANIMATION_SPEED_MS,
  PRIMARY_COLOR,
  CHECK_COLOR,
  CHANGE_COLOR,
} from "./settings";
import "./SortingVisualiser.css";

function SortingVisualiser() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  function bubbleSort() {
    var c_delay = 0;
    const change_color = (div, height, color) => {
      setTimeout(() => {
        div.style.backgroundColor = color;
        div.style.height = `${height}px`;
      }, (c_delay += ANIMATION_SPEED_MS));
    };
    const arrayBars = document.getElementsByClassName("array-bar");
    var temparr = array;
    for (let i = 0; i < arrayBars.length; i++) {
      for (let j = 0; j < arrayBars.length - i - 1; j++) {
        change_color(arrayBars[j], temparr[j], CHECK_COLOR);
        change_color(arrayBars[j + 1], temparr[j + 1], CHECK_COLOR);
        var temp;
        if (temparr[j] > temparr[j + 1]) {
          temp = temparr[j];
          temparr[j] = temparr[j + 1];
          temparr[j + 1] = temp;
          change_color(arrayBars[j], temparr[j], CHANGE_COLOR);
          change_color(arrayBars[j + 1], temparr[j + 1], CHANGE_COLOR);
        }
        change_color(arrayBars[j], temparr[j], PRIMARY_COLOR);
        change_color(arrayBars[j + 1], temparr[j + 1], PRIMARY_COLOR);
      }
    }
  }

  function mergeSort() {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? CHECK_COLOR : PRIMARY_COLOR;
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
    for (let i = 0; i < (window.innerWidth - 200) / 8; i++) {
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
        <button onClick={() => bubbleSort()}>Bubble Sort</button>
      </div>
    </>
  );
}

export default SortingVisualiser;
