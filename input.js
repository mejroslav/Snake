let inputDirection = randomDirection();

let lastInputDirection = { x: 0, y: 0 };

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: +1 };
      break;
    case "ArrowLeft":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: +1, y: 0 };
      break;
    case "Escape":
      inputDirection = { x: 0, y: 0 };
      break;
  }
});

export function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}

function randomDirection() {
  let x_direction = 0;
  let y_direction = 0;

  while (true) {
    x_direction = Math.floor(Math.random() * 2) - 1;
    y_direction = Math.floor(Math.random() * 2) - 1;

    if (
      (x_direction !== 0 && y_direction === 0) ||
      (x_direction === 0 && y_direction !== 0)
    ) {
      break;
    }
  }

  return {
    x: x_direction,
    y: y_direction,
  };
}
