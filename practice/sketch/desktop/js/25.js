let t = 1;
let max;
let N, K;
const numbersList = [31, 37, 41, 43, 47, 53, 59, 61, 67,
	71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173
];
const palette = ["#FFF"];
let c;
let count = 0;
let alpha = 0;
let alphaDelta = 1;

function setup() {
	createCanvas(375, 812);
	max = width > height ? width : height;

	N = floor(random(1, 100));
	K = random(numbersList);
	c = random(palette);

	noStroke();
}

function draw() {
	background(0);

	for (let i = 0; i < max * 0.75; i++) {
		if (i % 2 == 0) {
			fill(c);
		} else {
			fill(0);
		}

		circle(width / 2 + i * cos(t * N), height / 2 + i * sin(t * N), t);
		t = (t % K + 1);
	}

	t = 1;

	fill(0, alpha);
	rect(0, 0, width, height);

	count++;
	if (count > 60 * 2) {
		alpha += alphaDelta;
		if (alpha > 255) {
			N = floor(random(1, 100));
			K = random(numbersList);
			c = random(palette);
			alphaDelta *= -1;
		} else if (alpha < 0) {
			alpha = 0;
			alphaDelta *= -1;
			count = 0;
		}
	}
}