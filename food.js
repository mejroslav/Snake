import {
  onSnake,
  expandSnake,
  increaseSpeed,
  equalPositions,
  snakeSpeed,
} from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
let barrierSegment = [];
let barrierCreatorNumber = 0;
export let gameScore = 0;
const EXPANSION_RATE = 1;
const scoreElement = document.getElementById("game-score");


const gameSpeedElement = document.getElementById("game-speed");

/**
 * Whenever snake eats food, expand snake and generate next food on position which does not interfere with snake.
 */
export function updateFood() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    gameScore += 10;
    console.log(gameScore);
    food = getRandomFoodPosition();
    increaseSpeed();
  }
}

export function updateBarrier() {
  if (onSnake(food)) {
    if (barrierCreatorNumber % 3 === 0) {
      barrierSegment.push(getRandomBarrierPosition());
      console.log(barrierSegment);
    }
    barrierCreatorNumber++;
    console.log(barrierCreatorNumber);
  }
}

export function updateStatistics() {
  // gameStartedElement.innerText = `gameActive: ${gameActive}`;
  gameSpeedElement.innerText = `Speed: ${snakeSpeed}`;
  scoreElement.innerText = `Score: ${gameScore}`;
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

export function barrierCollision(position) {
  return barrierSegment.some((segment) => {
    return equalPositions(segment, position);
  });
}
