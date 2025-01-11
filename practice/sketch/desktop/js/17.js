/*Moire Pattern frame 
	homework 3, Creative Coding Victoria Q Cooper
*/

//create global variables
	//variable to initialize angle of rotation
	var theta = 0.0;
	//variable for rotationSpeed
	var rotSpeed = 0.00015;
	//Width variable
	var rectWidthMult = 10;
	//height variable
	var rectHeightMult = 20;

function setup() {
	createCanvas(375, 812);
	//rectMode(CENTER);
}

function draw() {
	//set stroke/no fill
	strokeWeight(1);
	noFill();
	background(255);
	
	push(); //reset
	//set middle of canvas for rotation
	translate(width / 2, height / 2);
	//for loop to draw squares
	for (x = 0; x < 250; x++){
		//rotate command
		rotate(theta);
		//draw squares
		rect(50, 50, x*rectWidthMult, x*rectHeightMult);
	}
	pop(); //reset
	theta += rotSpeed; //update rotation angle to rotation speed
}