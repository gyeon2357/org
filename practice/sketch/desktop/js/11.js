//https://funprogramming.org/76-Slowly-morphing-bezier-curves.html

let csize = 50;
let grow = 0;

function setup() {
	createCanvas(375, 812);
	background(255);
	smooth();
	noFill();
	strokeWeight(2)
}

function draw() {
	drawCurves(30)
}

function drawCurves(howmany) {
	background(255);

	for (let i = 0; i < howmany; i++) {
		let t = float(frameCount / 2000.0);
		bezier(
			width / 2, height / 2,
			width / 2, noise(1, i, t) * height,
			noise(2, i, t) * width, noise(4, i, t) * height,
			noise(3, i, t) * width, noise(5, i, t) * height
		);
	}
}