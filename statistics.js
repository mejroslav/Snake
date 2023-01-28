import { SNAKE_SPEED } from "./snake.js";
import { gameActive, gameOver } from "./game.js";

const gameOverElement = document.getElementById("game-over");
const gameStartedElement = document.getElementById("game-started");
const infoSpeedElement = document.getElementById("info-speed");

export function updateStatistics() {
  gameOverElement.innerText = `gameOver: ${gameOver}`;
  gameStartedElement.innerText = `gameActive: ${gameActive}`;
  infoSpeedElement.innerText = `snake speed: ${SNAKE_SPEED}`;
}
