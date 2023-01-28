import { SNAKE_SPEED } from "./snake.js";
import { update as updateSnake, draw as drawSnake } from "./snake.js";
import {update as updateFood, draw as drawFood} from "./food.js"
let lastRenderTime = 0;
const gameBoard = document.getElementById("game-board");

function main(currentTime) {
  // OK browser, tell me when i should render next frame to animate my game
  // currentTime
  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  console.log("Render");
  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  console.log("updating");
  updateSnake();
  updateFood()
}

function draw() {
  console.log("drawing snake");
  gameBoard.innerHTML = ''
  drawSnake(gameBoard);
  drawFood(gameBoard);
}
