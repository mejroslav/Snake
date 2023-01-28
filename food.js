import { onSnake, expandSnake } from "./snake.js";

let food = { x: 16, y: 5 };
const EXPANSION_RATE = 1;


export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        food = {x: 20, y: 10}
    }
}

export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

function addSegments()