function setup(){
	createCanvas(375, 812);
	
}

var yPos = 25;
var g = 0.1;
var acceleration =0;

function draw(){
	background(150);

	makeball();
	yPos += acceleration;
	acceleration += g;
	
	if(yPos>812){
		acceleration =-acceleration/1.15;
	}
}

function makeball(){
	ellipse(width/2, yPos, 50,50);
	fill(255);
}