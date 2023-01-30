
const gameOverElement = document.getElementById("game-over");
const gameStartedElement = document.getElementById("game-started");




export function getGameOverInfo() {
  gameOverElement.classList.remove("hide");
}
