function setup() {
	createCanvas(375, 812, WEBGL);
	background(200);
}

function draw() {
	// background(200);
	// ambientMaterial(250, 20, 20);
	rotateX(frameCount * 0.01);
	rotateY(frameCount * 0.01);
	fill(255);
	box(50, 50, 50);
	box(100, 100, 100);
}