/*mouseClickedの関数をいれて場所を変えようとするとうまくいかない。
エラーが起こっているわけではないので、なにかが描画されていない様子　*/


let drop = [];


function setup() {
	colorMode(HSB, 360, 100, 100, 100);
	createCanvas(windowWidth, windowHeight);
	background(100);
}

function draw() {
	let angle = random(-0.01, 0.03);
	let offset = 700;
	let scalar = random(10, 280);
	let velocity = random(0.001, 0.005);
	let diameter = random(1, 30);
	drop.push(new Drop(angle, offset, scalar, velocity,diameter));
	for(let i =0; i < drop.length ; i++){
	 drop[i].move();
	 drop[i].display();	
	}
	
}

class Drop{
	constructor(angle, offset, scalar, velocity,diameter){
		this.angle = angle;
    this.offset = offset;
    this.scalar = scalar;
    this.velocity = velocity;
		this.diameter = diameter
	}

  move(){
		this.x = this.offset + sin(this.angle)*this.scalar;
	  this.y = this.offset/2 + tan(this.angle)*this.scalar;
		this.angle += this.velocity;
	}
	
	display(){
			fill(200, 100, 100, 20);
		  stroke(0, 0, 100,20);
	    strokeWeight(1);
		  circle(this.x, this.y, this.diameter);
	}

}
