//  * Copyright: Park Jeong Gyeon, 2021-08-01
//  * Published under the Creative Commons license NonCommercial 4.0.
//  * Check CC-Attribut-NonCommercial for more information at https://creativecommons.org/licenses/by-nc/4.0/

let squareSize = 30;
let white = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0);
  rectMode(CENTER);
}

function draw() {
  background(255);

  for (let x = 0; x < width; x = x + squareSize) {
    for (let y = 0; y < height; y = y + squareSize) {
      let chaosScaler = map(x, 0, height, 0, 1);
      chaosScaler = chaosScaler;

      let rotationOffset = chaosScaler * (random(3) - 1);

      let offsetX =
        squareSize / 2 + chaosScaler * (random(2) - 1) * squareSize * 2;
      let offsetY =
        squareSize / 2 + chaosScaler * (random(2) - 1) * squareSize * 2;
      let sizeVariationX =
        squareSize + chaosScaler * (random(2) - 1) * squareSize * 2;
      let sizeVariationY =
        squareSize + chaosScaler * (random(2) - 1) * squareSize * 2;

      // calculate the gray level: the further to the left the square, the more random variation in level
      let level = white - chaosScaler * random(200);
      fill(level);
      // save the current coordinate system so we can restore, using push(), for the next square
      push();
      translate(x + offsetX, y + offsetY);
      rotate(rotationOffset);
      noLoop();
      rect(0, 0, sizeVariationX, sizeVariationY);
      pop(); // restore the coordinate system
    }
  }
}

function touchStarted() {
  redraw();
}

function touchMoved() {
  redraw();
}
