export const GRID_SIZE = 21;

/**
 * Returns a random grid position.
 * @returns new position object {x,y}
 */
export function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}
