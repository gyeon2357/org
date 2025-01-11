let earthOrbit = 0;
let moonOrbit = 180;
let middleX = 187.5;
let middleY = 406;

function setup() {
	createCanvas(375, 812);
}

function draw() {
	background(100);
	//Draw Sun
	fill(0);
	noStroke();
	ellipse(middleX, middleY, 150, 150);
	
	//Draw Earth
	push();
	translate(middleX,middleY);
	rotate(radians(earthOrbit));
	fill(69, 150, 255);
	ellipse(180,0, 50,50);
		push();
		translate(180,0);
		rotate(radians(moonOrbit));
		fill(173, 173, 173);
		ellipse(55,0, 25,25);
		pop();
	pop();
	
	earthOrbit = earthOrbit +1;
	moonOrbit = moonOrbit +.75;
}