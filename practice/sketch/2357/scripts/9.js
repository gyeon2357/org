//  * Copyright: Park Jeong Gyeon, 2021-08-01
//  * Published under the Creative Commons license NonCommercial 4.0.
//  * Check CC-Attribut-NonCommercial for more information at https://creativecommons.org/licenses/by-nc/4.0/

var t;
var circleSize;
var interval;
var runContinuous;
var radius;
var h;
var w;

function setup() {
  initializeFields();
  createCanvas(windowWidth, windowHeight);
  frameRate(200);
  smooth();
  colorMode(RGB, 255, 100, 0, 100);
  ellipseMode(CENTER);
  radius = h * 0.935;
}

function draw() {
  background(255);
  noStroke();
  var a = sin(t) * TWO_PI;
  for (var i = 100; i < radius; i += 30) {
    var r = radius * tan(i * a-1000);
    fill(color(round(map(i, 0.0, radius - 1.0, 0.0, 360.0)), 10.0, 10.0));
    ellipse(
      sin(i) * r + width / 2,
      cos(i) * r + height / 2,
      circleSize,
      circleSize
    );
  }
  if (runContinuous) {
    t = (t + interval) % TWO_PI;
  }
}

function initializeFields() {
  t = 0;
  circleSize = 50.0;
  interval = 0.00003;
  runContinuous = true;
  radius = 0;
  h = 300;
  w = 300;
}
