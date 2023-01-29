import {
  onSnake,
  expandSnake,
  increaseSpeed,
  equalPositions,
} from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
let barrierSegment = [];
let barrierCreatorNumber = 0;

const EXPANSION_RATE = 1;

/**
 * Whenever snake eats food, expand snake and generate next food on position which does not interfere with snake.
 */
export function updateFood() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
    increaseSpeed();
  }
}

export function updateBarrier() {
  if (onSnake(food)) {
    if (barrierCreatorNumber % 3 === 0) {
      barrierSegment.push(randomGridPosition());
      console.log(barrierSegment);
    }
    barrierCreatorNumber++;
    console.log(barrierCreatorNumber);
  }
}

/**
 * Draw a new square with food.
 * @param {*} gameBoard
 */
export function drawFood(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

export function drawBarrier(gameBoard) {
  barrierSegment.forEach((segment) => {
    const barrierElement = document.createElement("div");
    barrierElement.style.gridColumnStart = segment.x;
    barrierElement.style.gridRowStart = segment.y;
    barrierElement.classList.add("barrier");
    gameBoard.appendChild(barrierElement);
  });
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}

function getRandomBarrierPosition() {
  let newBarrierPosition;
  while (
    newBarrierPosition == null ||
    onSnake(newBarrierPosition) ||
    onFood(newBarrierPosition)
  ) {
    newBarrierPosition = randomGridPosition();
  }
  console.log(newBarrierPosition);
  return newBarrierPosition;
}

function onFood(position) {
  return equalPositions(food, position);
}

function onBarrier(position) {
  return barrierSegment.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}
