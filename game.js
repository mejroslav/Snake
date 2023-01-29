import { snakeSpeed } from "./snake.js";
import { updateSnake as updateSnake, draw as drawSnake } from "./snake.js";
import { getSnakeHead, snakeIntersection } from "./snake.js";
import {
  updateFood,
  drawFood,
  drawBarrier,
  updateBarrier,
  barrierCollision,
  updateStatistics,
} from "./food.js";
import { outsideGrid } from "./snake.js";
import { getGameOverInfo } from "./settings.js";

let lastRenderTime = 0;

export let gameActive = false;
export let gameOver = false;

const gameBoard = document.getElementById("game-board");
const startButtonElement = document.getElementById("start-btn");
const pauseButtonElement = document.getElementById("pause-btn");
const continueButtonElement = document.getElementById("continue-btn");
const restartButtonElement = document.getElementById("restart-btn");
main();

function main() {
  updateStatistics();

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "Enter":
        startNewGame();
        break;
    }
  })

  startButtonElement.addEventListener("click", startNewGame);
  pauseButtonElement.addEventListener("click", pauseGame);
  continueButtonElement.addEventListener("click", continueGame);
  restartButtonElement.addEventListener("click", () => {
    window.location = "/";
  });
}

function startNewGame() {
  gameActive = true;
  window.requestAnimationFrame(game);

  startButtonElement.classList.add("hide");
  pauseButtonElement.classList.remove("hide");
}

function continueGame() {
  gameActive = true;
  window.requestAnimationFrame(game);

  pauseButtonElement.classList.remove("hide");
  continueButtonElement.classList.add("hide");
}

function pauseGame() {
  gameActive = false;
  updateStatistics();

  continueButtonElement.classList.remove("hide");
  pauseButtonElement.classList.add("hide");
}

function endGame() {
  getGameOverInfo();
  gameActive = false;
  updateStatistics();
  pauseButtonElement.classList.add("hide");
  restartButtonElement.classList.remove("hide");
}

function game(currentTime) {
  if (!gameActive) return;
  checkDeath();
  updateStatistics();

  if (gameOver) endGame();

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
  if (secondsSinceLastRender < 1 / snakeSpeed) return;
  lastRenderTime = currentTime;
  update();
  draw();
}

/**
 * Update snake and food positions.
 */
function update() {
  updateSnake();
  updateBarrier();
  updateFood();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
  drawBarrier(gameBoard);
}

function checkDeath() {
  gameOver =
    outsideGrid(getSnakeHead()) ||
    snakeIntersection() ||
    barrierCollision(getSnakeHead());
}
