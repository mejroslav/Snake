

const gameOverElement = document.getElementById("game-over");
const gameStartedElement = document.getElementById("game-started");
const infoSpeedElement = document.getElementById("info-speed");

export function updateStatistics() {
  // gameStartedElement.innerText = `gameActive: ${gameActive}`;
  // infoSpeedElement.innerText = `snake speed: ${snakeSpeed}`;
}

export function getGameOverInfo() {
  gameOverElement.classList.remove("hide");
}
