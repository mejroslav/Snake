import { snakeSpeed } from "./snake.js";
import { updateSnake as updateSnake, drawSnake as drawSnake } from "./snake.js";
import { getSnakeHead, snakeIntersection } from "./snake.js";
import {
  updateFood,
  drawFood,
  drawBarrier,
  updateBarrier,
  barrierCollision,
  updateStatistics,
  barrierSegment,
} from "./food.js";
import { outsideGrid } from "./snake.js";
import { getGameOverInfo } from "./settings.js";

let lastRenderTime = 0;

export let gameStarted = false;
export let gameActive = false;
export let gameOver = false;
let paintModeActive = false;

const gameBoard = document.getElementById("game-board");
const startButtonElement = document.getElementById("start-btn");
const pauseButtonElement = document.getElementById("pause-btn");
const continueButtonElement = document.getElementById("continue-btn");
const restartButtonElement = document.getElementById("restart-btn");

const paintModeButtonElement = document.getElementById("paint-btn");
const gameModeButtonElement = document.getElementById("game-btn");

const introScreen = document.getElementById("intro-screen");
let cells = document.querySelectorAll("[data-type='cell']");

main();

/**
 * The main function. Adds listeners to all buttons.
 */
function main() {
  generateGrid(gameBoard, 21);

  paintModeButtonElement.addEventListener("click", enablePaintMode);
  gameModeButtonElement.addEventListener("click", disablePaintMode);

  updateStatistics();

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "Enter":
        if (!gameStarted) {
          startNewGame();
          return
        };
        if (gameActive) pauseGame();
        else continueGame();
        break;
      case "Escape":
        if (!gameStarted) {
          return
        };
        if (gameActive) pauseGame();
        else continueGame();
        break;
    }
  });

  startButtonElement.addEventListener("click", startNewGame);
  pauseButtonElement.addEventListener("click", pauseGame);
  continueButtonElement.addEventListener("click", continueGame);
  restartButtonElement.addEventListener("click", () => {
    window.location = "/";
  });
}

/**
 * Start new game. Replace the start button with pause button.
 */
function startNewGame() {
  gameStarted = true;
  gameActive = true;
  window.requestAnimationFrame(game);

  startButtonElement.classList.add("hide");
  pauseButtonElement.classList.remove("hide");
}

/**
 * Continue the game. Replace continue button with pause button.
 */
function continueGame() {
  gameActive = true;
  window.requestAnimationFrame(game);

  pauseButtonElement.classList.remove("hide");
  continueButtonElement.classList.add("hide");
}

/**
 * Pause the game. Replace the pause button with continue button.
 */
function pauseGame() {
  gameActive = false;
  updateStatistics();

  continueButtonElement.classList.remove("hide");
  pauseButtonElement.classList.add("hide");
}

/**
 * End game. Show game over info, replace pause button with restart button.
 */
function endGame() {
  getGameOverInfo();
  gameActive = false;
  updateStatistics();
  pauseButtonElement.classList.add("hide");
  restartButtonElement.classList.remove("hide");
}

/**
 * Run the game. Depending on snakeSpeed, update position and render it. Check for death and if the game is over, show endgame message.
 * @param {*} currentTime
 */
function game(currentTime) {
  if (!gameActive) return;

  window.requestAnimationFrame(game);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snakeSpeed) return;
  lastRenderTime = currentTime;

  update();
  checkDeath();
  if (gameOver) endGame();
  else draw();
  updateStatistics();
}

/**
 * Update snake, food and barrier positions.
 */
function update() {
  updateSnake();
  updateBarrier();
  updateFood();
}

/**
 * Render snake, food and barrier.
 */
function draw() {
  // gameBoard.innerHTML = "";
  clearGrid();
  drawSnake(gameBoard);
  drawFood(gameBoard);
  drawBarrier(gameBoard);
}

/**
 * Check if the snake is outside the grid, intersects himself or collides with barrier and update gameOver variable.
 */
function checkDeath() {
  gameOver =
    outsideGrid(getSnakeHead()) ||
    snakeIntersection() ||
    barrierCollision(getSnakeHead());
}

function generateGrid(parentElement, number) {
  for (let column = 1; column <= number; column++) {
    for (let row = 1; row <= number; row++) {
      const cell = document.createElement("div");
      cell.dataset.type = "cell";
      cell.dataset.fill = "empty";
      cell.dataset.x = column;
      cell.dataset.y = row;
      cell.style.gridColumnStart = column;
      cell.style.gridRowStart = row;
      parentElement.append(cell);
    }
  }
  cells = document.querySelectorAll("[data-type='cell']");
}

function enablePaintMode() {
  paintModeActive = true;
  gameBoard.classList.add("paint-mode")

    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (paintModeActive) addOrRemoveBarrier(cell);
      });
    });

  paintModeButtonElement.classList.add("hide");
  gameModeButtonElement.classList.remove("hide");
}

function disablePaintMode() {
  paintModeActive = false;
  gameBoard.classList.remove("paint-mode")

  paintModeButtonElement.classList.remove("hide");
  gameModeButtonElement.classList.add("hide");
}

function addOrRemoveBarrier(cell) {
  if (cell.dataset.fill === "empty") {
    cell.dataset.fill = "barrier";
    const x = Number(cell.dataset.x)
    const y = Number(cell.dataset.y)
    barrierSegment.push({ x, y})
  }
  else if (cell.dataset.fill === "barrier") {
    cell.dataset.fill = "empty";
    const x = Number(cell.dataset.x)
    const y = Number(cell.dataset.y)
    barrierSegment.splice(barrierSegment.indexOf({x,y},1))
  }
}

function clearGrid() {
  cells.forEach( cell => {
    cell.dataset.fill = "empty";
  })
}