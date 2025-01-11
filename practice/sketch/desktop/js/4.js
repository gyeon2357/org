function setup() {
	createCanvas(812, 375);
	background(150);
}
function draw() {
	//background(255, 0, 100)
	fill(100);
	stroke( random( 250, 100) );
	
	noFill();
	// ellipse(mouseX, mouseY, 200, 200);
	
	translate(mouseX, mouseY);
	rotate( millis() /10);
	rect( 20, 0, 400, 400);
}