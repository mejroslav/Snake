import { getInputDirection } from "./input.js";
import { GRID_SIZE, randomSnakePosition} from "./grid.js";

// SNAKE BODY
export let snakeSpeed = 6;
const snakeBody = [randomSnakePosition()];
let newSegments = 0;


/**
 * Update the snake position.
 */
export function updateSnake() {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }; // creates a duplicate
    // we make sure that we don't manipulate with the actual snakeBody array
    // therefore we create a brain new object with spreading
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

/**
 * Draw snake elements.
 */
export function drawSnake(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = gameBoard.querySelector(`[data-x='${segment.x}'][data-y='${segment.y}']`);
    snakeElement.dataset.fill = "snake";
  });
}

/**
 * Add new element to snakeBody.
 */
function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody[snakeBody.length] = { ...snakeBody[snakeBody.length - 1] };
  }

  newSegments = 0;
}

/**
 * Expand snake on given amount.
 */
export function expandSnake(amount) {
  newSegments += amount;
}

/**
 * Return true if snake is on given position. Ignore his head if needed.
 */
export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

export function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

/**
 * Return true if the snake is outside the grid.
 */
export function outsideGrid(position) {
  return (
    position.x < 1 ||
    position.x > GRID_SIZE ||
    position.y < 1 ||
    position.y > GRID_SIZE
  );
}

export function increaseSpeed() {
    snakeSpeed += 0.25
}