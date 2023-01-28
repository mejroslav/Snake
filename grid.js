export const GRID_SIZE = 21;
const NEAR_EDGE = 6;

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

