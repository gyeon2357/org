// Source: Processing for Visual Artists
// Artist: Andrew Glassner
// Source: book - rewrite of .pde code at https://github.com/apress/processing
// Date: 2011
// PDE Source: moire2.pde in Ch07
// Chapter: Ch07-02 human Figure 7.2
// Description: mouse animate moivre effect
//

function setup() {
	createCanvas(windowWidth, windowHeight);
  smooth();
  noStroke();
	mouseX = width / 2;
	mouseY = height / 2 - 20;
}

function draw() {
  background(255);
  push();
  translate(width/2, height/2);
  fill(0, 200, 0);
  drawStar();
  push();
  
  push();
  translate(mouseX - width/1.5, mouseY - height/1.5);
  rotate(TWO_PI * frameCount/800);
	fill(0, 0, 255);
  drawStar();
  push();
}

function drawStar() {
  let  numSpokes = 100;
  for (let i=0; i<numSpokes; i++) {
     let t0 = map(i, 0, numSpokes-1, 0, TWO_PI);
     let t1 = t0 + (TWO_PI/(2*numSpokes));
     arc(0, 0, 1400, 1400, t0, t1);
  }
}


//
function keyTyped(){
  save('pix.jpg')
}

