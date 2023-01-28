import { getInputDirection } from "./input.js";


export const SNAKE_SPEED = 2;


// SNAKE BODY
const snakeBody = [{ x: 10, y: 5 }];
let newSegments = 0;

export function update() {
  const inputDirection = getInputDirection();

  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] }; // creates a duplicate
    // we make sure that we don't manipulate with the actual snakeBody array
    // therefore we create a brain new object with spreading
  }

  // for debug
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}





export function expandSnake(amount) {
    newSegments += amount;
}

export function onSnake(position) {
    return snakeBody.some(segment => {
        return equalPositions(segment, position)
    })
}


function equalPositions(pos1, pos2) {
    return (
        pos1.x === pos2.x && pos1.y === pos2.y
    )
}