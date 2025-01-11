var time;
var luv = Math.floor(Math.random() * (100 - 10) + 10);

function setup() {
  initializeFields();
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  noFill();
  background(255);
}

function draw() {
  for (var i = 0; i < luv; i++) {
    rectoid(frameCount - time, i);
  }
}

function rectoid(time, index) {
  stroke((time * noise(index)) % 100, 100, 80, 25);
  rect(width / 2, height / 2, cos(index) * time, sin(index) * time);
}

// function touchStarted() {
//   background(0);
//   time = frameCount;
// }

function initializeFields() {
  time = 0;
}
