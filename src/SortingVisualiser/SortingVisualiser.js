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

  var c_delay = 0;
  const change_color = (div, height, color) => {
    setTimeout(() => {
      div.style.backgroundColor = color;
      div.style.height = `${height}px`;
    }, (c_delay += ANIMATION_SPEED_MS));
  };

  function bubbleSort() {
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

  function selectionSort() {
    const arrayBars = document.getElementsByClassName("array-bar");
    var min;
    var temparr = array;
    for (let i = 0; i < temparr.length - 1; i++) {
      change_color(arrayBars[i], temparr[i], CHANGE_COLOR);
      min = i;
      for (let j = i + 1; j < temparr.length; j++) {
        change_color(arrayBars[j], temparr[j], CHECK_COLOR);
        if (temparr[j] < temparr[min]) {
          change_color(arrayBars[j], temparr[j], CHANGE_COLOR);
          if (min !== i)
            change_color(arrayBars[min], temparr[min], PRIMARY_COLOR);

          min = j;
        }
        if (j !== min) {
          change_color(arrayBars[j], temparr[j], PRIMARY_COLOR);
        }
      }
      var temp = temparr[min];
      temparr[min] = temparr[i];
      temparr[i] = temp;
      change_color(arrayBars[i], temparr[i], CHANGE_COLOR);
      change_color(arrayBars[min], temparr[min], CHANGE_COLOR);
      change_color(arrayBars[i], temparr[i], PRIMARY_COLOR);
      change_color(arrayBars[min], temparr[min], PRIMARY_COLOR);
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
    c_delay = 0;
    for (let i = 0; i < (window.innerWidth - 200) / 8; i++) {
      arr.push(randomIntFromInterval(50, window.innerHeight - 150));
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
        <button onClick={() => selectionSort()}>Selection Sort</button>
      </div>
    </>
  );
}

export default SortingVisualiser;
