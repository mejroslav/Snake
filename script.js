import { SNAKE_SPEED } from "./snake.js";
import {update as updateSnake, draw as drawSnake} from "./snake.js"

let lastRenderTime = 0;


function main(currentTime) {
  // OK browser, tell me when i should render next frame to animate my game
  // currentTime
  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  console.log("Render");
  lastRenderTime = currentTime;


  function update() {
    console.log("updating")
  }

  function draw() {
    console.log("drawing snake")
  }
}

window.requestAnimationFrame(main);
