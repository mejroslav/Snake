export const GRID_SIZE = 21;
const NEAR_EDGE = 4;

/**
 * Returns a random grid position.
 * @returns new position object {x,y}
 */
export function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
}

/**
 * Returns a random grid position.
 * @returns new position object {x,y}
 */
export function randomSnakePosition() {
  return {
    x: Math.floor(Math.random() * (GRID_SIZE - NEAR_EDGE)) + NEAR_EDGE,
    y: Math.floor(Math.random() * (GRID_SIZE - NEAR_EDGE)) + NEAR_EDGE,
  };
}

export function randomDirection() {
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
