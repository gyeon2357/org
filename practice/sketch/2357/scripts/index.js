//  * Copyright: Park Jeong Gyeon, 2021-08-01
//  * Published under the Creative Commons license NonCommercial 4.0.
//  * Check CC-Attribut-NonCommercial for more information at https://creativecommons.org/licenses/by-nc/4.0/

window.addEventListener(
  "load",
  function () {
    document.body.style.height =
      document.documentElement.clientHeight + 5 + "px";
    setTimeout(scrollTo, 0, 0, 1);
  },
  false
);

$(document).bind("mobileinit", function () {
  $.mobile.defaultPageTransition = "slide";
  $.mobile.ajaxLinksEnabled = false;
  $.mobile.ajaxFormsEnabled = false;
  $.mobile.ajaxEnabled = false;
});

var lvi = Math.floor(5 * Math.random() + 1);
var luv = Math.floor(150 * Math.random() + 100);
var lve = Math.floor(250 * Math.random() + 150);
const nbEllipses = 9;
(smallestDiameter = 200),
  (diameterIncrement = 15),
  (controlPointOffset = 10);
var x = 0,
  y = 0,
  angleMeter = [],
  positionHistory = [];

function setup() {
  for (
    createCanvas(windowWidth, windowHeight + 128), noStroke(), smooth();
    positionHistory.length < 2 * nbEllipses;

  )
    positionHistory.push([0, 0, 0]);
  (angleMeter = new AngleMeter(smallestDiameter / 30)),
    (x = positionHistory[0][0]),
    (y = positionHistory[0][1]);
}
function draw() {
  positionHistory.pop(),
    (x = 0.6 * x + 0.4 * mouseX),
    (y = 0.6 * y + 0.4 * mouseY),
    angleMeter.drag(x, y),
    positionHistory.unshift([x, y, angleMeter.angle]),
    drawEllipses();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawEllipses() {
  for (var e = 0; e < nbEllipses; e++) {
    var t = 2 * (nbEllipses - 1 - e);
    drawEllipse(
      positionHistory[t],
      smallestDiameter + diameterIncrement * (nbEllipses - 1 - e),
      e % 6 == 3 ? 255 : 75
    );
  }
}
function drawEllipse(e, t, fillcolor) {
  fill(250, 250, t - 30),
    push(),
    translate(e[0], e[1]),
    rotate(e[2]),
    stroke(255, 80, 0),
    strokeWeight(0.03),
    ellipse(-controlPointOffset, 0, t, 0.75 * t),
    pop();
}
class AngleMeter {
  constructor(distance) {
    this.angle = 0;
    this.draggedPoint = [0, 0];
    this.distance = distance;
  }
  drag(x, y) {
    const dx = x - this.draggedPoint[0];
    const dy = y - this.draggedPoint[1];
    this.angle = Math.atan2(dy, dx);
    this.draggedPoint[0] = x - Math.sin(this.angle) * this.distance;
    this.draggedPoint[1] = y - Math.sin(this.angle) * this.distance;
  }
}
