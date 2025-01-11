/*
Warped

Uses simple vector math against the mouse to push the dots away, 
and uses that same vector to get a warping effect.

Controls:
  - Move the mouse around.

Author:
  Jason Labbe

Site:
  jasonlabbe3d.com
*/

var mouseSize = 100;


function setup() {
  createCanvas(375, 812);
}


function draw() {
  background(0);
  stroke(255);
  
  for (var y = 0; y < height; y += 40) {
    for (var x = 0; x < width; x += 40) {
      var pos = new p5.Vector(x, y);
      
      var d = dist(x, y, mouseX, mouseY);
      
      pos.sub(mouseX, mouseY);
      pos.normalize();
      pos.mult(mouseSize-d);
      
      if (d < mouseSize) {
      	pos.mult(0.25);
      } else {
        pos.mult(-d*0.001);
      }
      
      pos.add(x, y);
      
      strokeWeight(max((mouseSize-min(d, mouseSize))*0.05, 2));
      point(pos.x, pos.y);
    }
  }
}