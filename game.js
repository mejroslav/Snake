import { SNAKE_SPEED } from "./snake.js";
import { updateSnake as updateSnake, draw as drawSnake } from "./snake.js";
import { getSnakeHead, snakeIntersection } from "./snake.js";
import { updateFood as updateFood, drawFood as drawFood } from "./food.js";
import { outsideGrid } from "./snake.js";
import { getGameOverInfo, updateStatistics } from "./settings.js";

let lastRenderTime = 0;

export let gameActive = false;
export let gameOver = false;

const gameBoard = document.getElementById("game-board");
const startButtonElement = document.getElementById("start-btn");
const pauseButtonElement = document.getElementById("pause-btn");

main();

function main() {
  updateStatistics();

  startButtonElement.addEventListener("click", startNewGame);
  pauseButtonElement.addEventListener("click", pauseGame);
}

function startNewGame() {
  gameActive = true;
  
  window.requestAnimationFrame(game);
  
  startButtonElement.classList.add("hide");
  pauseButtonElement.classList.remove("hide");
}

function pauseGame() {
  gameActive = false;
  updateStatistics();

  startButtonElement.classList.remove("hide");
  pauseButtonElement.classList.add("hide");
}

function game(currentTime) {
  if (!gameActive) return
  checkDeath();
  updateStatistics();

  if (gameOver) {
    getGameOverInfo()
    pauseGame()
  }

  // the old way: gameOver alert
  // if (gameOver) {
  //   if (confirm("You lost. Press OK to start.")) {
  //     gameActive = false;
  //     window.location = "/"; // refresh page -> start new game
  //   }
  //   return;
  // }

  // OK browser, tell me when i should render next frame to animate my game
  // currentTime
  window.requestAnimationFrame(game);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;
  update();
  draw();
}

/**
 * Update snake and food positions.
 */
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
