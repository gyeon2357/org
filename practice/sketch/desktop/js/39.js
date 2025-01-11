let t = 200,
  br = 0,
  lapse = 1e3;
var luv = Math.floor(200 * Math.random() + 350);
function setup() {
  createCanvas(375, 812, WEBGL),
    colorMode(HSB, luv, 100, 100, 1),
    angleMode(DEGREES),
    background(0);
}
function draw() {
  background(255),
    lights(),
    ambientLight(5),
    push(),
    rotateX(mouseY / 10 + frameCount / 2),
    rotateY(mouseX / 10 + frameCount / 2);
  var e = mouseX - width / 2,
    o = mouseY - height / 2;
  for (
    directionalLight(0, 0, 200, -e, -o, 0),
      noStroke(),
      ambientMaterial(300, 60, 60),
      br = 90,
      sphere(175, 50, 50),
      t = 220;
    t < 310;
    t += 15
  )
    ambientMaterial(550 - t, 80, br), torus(t, 10, 60, 24);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
