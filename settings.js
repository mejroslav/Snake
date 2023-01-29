
const gameOverElement = document.getElementById("game-over");
const gameStartedElement = document.getElementById("game-started");
const infoSpeedElement = document.getElementById("info-speed");



export function getGameOverInfo() {
  gameOverElement.classList.remove("hide");
}
