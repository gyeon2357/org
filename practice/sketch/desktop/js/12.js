var balls = []
class Ball{
	constructor(p){
		this.p=p
		this.v=createVector(0,0)
	}
	update(){
		this.p.add(this.v)
	}
	draw(){
		rect(this.p.x,this.p.y,30,30)
    noStroke()
	}
}

function setup() {
	createCanvas(375, 812);
	background(100);
}

function draw() {
	// ellipse(mouseX, mouseY, 20, 20);
	
	balls.forEach(ball=>{
		balls.forEach(ball2=>{
			let d = ball.p.dist(ball2.p)+1
			// if (d<30){
				let delta = ball.p.copy().sub(ball2.p)
				let acc = delta.setMag(1/d)
				ball.v.add(acc)
				ball2.v.sub( acc )
			// }
		})
		ball.update()
		ball.draw()
	})
}

function mouseMoved(){
	balls.push(new Ball(createVector(mouseX,mouseY)))
}
