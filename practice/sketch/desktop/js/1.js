
function setup() {
  initializeFields();
	createCanvas(812, 375);
  background(255);
  stroke(0, 0, 0);
}

function draw() {
  line(mouseX, mouseX, pmouseX, pmouseX);
  if (mouseIsPressed === true) {
      background(255);
  }
}

// the background is updated 60 times per second so when ellipse drawn
// around the baackground it is deleted almost right away
function initializeFields() {
}

