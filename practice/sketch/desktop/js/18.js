//  * Copyright: Park Jeong Gyeon, 2021-08-01
//  * Published under the Creative Commons license NonCommercial 4.0.
//  * Check CC-Attribut-NonCommercial for more information at https://creativecommons.org/licenses/by-nc/4.0/

var angle;

function setup() {
  createCanvas(375, 812);
}

function draw() {
  background(255);
  angle = cos(frameCount * 0.009);
  strokeWeight(15);
  stroke(0);
  fill(255);
  translate(width / 2, height / 2);
  for (var i = 0; i < 300; i++) {
    rotate(angle);
    scale(0.89);
    rect(0 + i * 1, 0, windowWidth / 1.05, windowWidth / 1.05);
  }
}