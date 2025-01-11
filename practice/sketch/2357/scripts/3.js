//  * Copyright: Park Jeong Gyeon, 2021-08-01
//  * Published under the Creative Commons license NonCommercial 4.0.
//  * Check CC-Attribut-NonCommercial for more information at https://creativecommons.org/licenses/by-nc/4.0/

var angle;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  angle = cos(frameCount * 0.009);
  strokeWeight(1);
  stroke(0);
  fill(255);
  translate(width / 2, height / 2);
  for (var i = 0; i < 100; i++) {
    rotate(angle);
    scale(0.9);
    ellipse(0 + i * 5, 0, windowWidth / 1, windowWidth / 1);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
