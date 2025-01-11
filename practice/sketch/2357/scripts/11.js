//code created from https://www.youtube.com/watch?v=vmhRlDyPHMQ

function setup() { 
	createCanvas(windowWidth, windowHeight, WEBGL);
	background(255);
	angleMode(DEGREES);
}

function draw() {
	//background(30);
	noFill();
	translate(0,-100,0)
	rotateX(30)
	rotateZ(frameCount);
	stroke(255);

	for (var i=0;i<20;i++) {

		var r = map(sin(frameCount/2),-1,1,10,15);
		var g = map(i,0,20,120,255);
		var b = map(cos(frameCount),-1,1,200,255);

		stroke(r,g,b)

		beginShape();
		for (var j=0;j<360;j+=30) {
			var rad = i*sin(frameCount/10)*30;
			var x = rad * cos(j);
			var y = rad * sin(j);
			var z = sin(frameCount + i*10)*50;
			vertex(x,y,z)
		}
		endShape(CLOSE);

		var g = map(sin(frameCount/2),-1,1,100,200);
		var b = map(i,0,20,100,200);
		var r = map(cos(frameCount),-1,1,200,100);

		stroke(r,g,b)

		beginShape();
		for (var j=0;j<360;j+=30) {
			var rad = i*sin(frameCount/10)*30;
			var x = rad * cos(j);
			var y = rad * sin(j);
			var z = sin(frameCount + i*10)*50;
			var z2 = z*-1;
			vertex(x,y,z2)
		}
		endShape(CLOSE);
	}
}

