var bez;
var angle = 0;
var posAngle = 0;

function setup() {
  createCanvas(375, 812);
  rectMode(CENTER); 
  let w = 550;
  bez = new Bez(width / 2, height / 2, w);

}

function draw() {


  translate(-bez.rectSize / 2, -bez.rectSize / 2);
  bez.drawCurves();

  bez.updateControls();

}

class Bez {

  constructor(x, y, w) {
    this.rectPos = createVector(x, y)
    this.rectSize = random(200, 500);
    this.inc = random(15, 20);
    this.anchor1 = createVector(random(width/2), random(height/2));
    this.cp1 = createVector(random(width/2), random(height/2));
    this.cp2 = createVector(random(width/2), random(height/2));
    this.anchor2 = createVector(random(width/2), random(height/2));

  }

  showSquare() {
    noFill();
    stroke(200);
    strokeWeight(2);
    rect(this.rectPos.x, this.rectPos.y, this.rectSize, this.rectSize);
  }

  drawCurves() {
    noFill();
    strokeWeight(1);

    let ax1, ay1, cx1, cy1, cx2, cy2, ax2, ay2;

    let steps = this.rectSize / this.inc;

    for (let i = 0; i < steps * 2; i++) {

      ax1 = this.anchor1.x + this.inc * sin(i / 3 + angle);
      ay1 = this.anchor1.y + this.rectSize + this.inc * cos(i / 7 + angle / 3);

      cx1 = this.cp1.x + this.inc * i;
      cy1 = this.cp1.y + this.inc * sin(i / 3 + angle);
      cx2 = this.cp2.x - this.inc * sin(i / 3 + angle);
      cy2 = this.cp2.y + this.inc * cos(i / 9 + angle);
      ax2 = this.anchor2.x + this.rectSize + this.inc * sin(i / 3 + angle);
      ay2 = this.anchor2.y + this.rectSize + this.inc * cos(i / 8 + angle / 2);


      stroke(0 - this.inc / 2 * i, this.inc * i / 2, this.inc * i, 255);
      bezier(ax1, ay1, cx1, cy1, cx2, cy2, ax2, ay2);

      push();
      strokeWeight(0.3);
      line(ax1, ay1, cx1, cy1);
      // line(cx2, cy2, ax2, ay2);
      strokeWeight(3);
      point(cx1, cy1);
      point(cx2, cy2);
      pop();
    }

    angle += 0.04;
  }

  updateControls() {
    
    this.anchor1.x += sin(posAngle);
    this.anchor1.y += cos(posAngle);
    this.cp1.x += cos(posAngle);
    this.cp1.y += sin(posAngle);
    this.cp2.x += sin(posAngle);
    this.cp2.y += cos(posAngle);
    this.anchor2.x += cos(posAngle);
    this.anchor2.y += sin(posAngle);
    
    
    posAngle += 0.01;

  }
}

