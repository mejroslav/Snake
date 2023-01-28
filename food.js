import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";
let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

/**
 * Whenever snake eats food, expand snake and generate next food on position which does not interfere with snake.
 */
export function updateFood() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
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

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
