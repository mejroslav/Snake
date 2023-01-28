import { SNAKE_SPEED } from "./snake.js";
import { update as updateSnake, draw as drawSnake } from "./snake.js";
import { getSnakeHead, snakeIntersection } from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./snake.js";
import { updateStatistics } from "./statistics.js";

let lastRenderTime = 0;

export let gameActive = false;
export let gameOver = false;

const gameBoard = document.getElementById("game-board");

main();

function main() {
  window.requestAnimationFrame(game);
}

function game(currentTime) {
  gameActive = true;
  checkDeath();
  updateStatistics(); // TODO: this should be in if(gameOver) statement?

  if (gameOver) {

    if (confirm("You lost. Press OK to start.")) {
      gameActive = false;
      window.location = "/"; // refresh page -> start new game
    }
    return;
  }

  // OK browser, tell me when i should render next frame to animate my game
  // currentTime
  window.requestAnimationFrame(game);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

function update() {
  updateSnake();
  updateFood();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
