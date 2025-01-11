p5.disableFriendlyErrors = true;
// https://coolors.co/06aed5-086788-f0c808-fff1d0-dd1c1a
let m = 0;

function setup() {
  createCanvas(375, 812, WEBGL);
  colorMode(HSB,360,255,255,255);
}

function draw() {
	translate(0,0,-160);
  background(255);
  rotateX(frameCount * 0.05);
  rotateY(frameCount * 0.05);
	
	for (let i = 0; i < 70; i++) {
		let x = i * 4;
    ambientLight(100); // white light
    ambientMaterial(0, 0, 50, 2); // magenta material
		stroke((m + x * 1.5)%360, 100, 100);
		strokeWeight(1);
    box(x);
	}
	m++;
}

