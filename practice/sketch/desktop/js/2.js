function setup() {
	createCanvas(812, 375);
  background(255);  
   
  
} 

function draw() {
  fill(200);
  ellipse(mouseX+2, mouseY+2, 3, 3);

  triangle(mouseX, mouseY, 812/2, 375/2);
}