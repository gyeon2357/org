
var size = 200; //declaring a global variable
var transparency = 1; //how transparent are the circles?
var spread = 30; //how far away can the spray be? 

function setup() {
	createCanvas(812, 375);
	background(255);
	rectMode(CENTER); //change how rectaangles draw
}
function draw() {
	//local variables:
	var r = mouseX/width * 255;
	var g = mouseX/height * 255;
	var b = random(25);
	noStroke(); //get rid of border around shape
	fill(r, g, b, transparency);
	//for loop: i is the counter variable
	for(var i = 0; i<random(200); i = i+1) //for has three mini-statements: start, test, increment)
	{
		ellipse(mouseX+random(-spread,spread), mouseX+random(-spread,spread), size, size);
	}
}