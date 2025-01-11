function setup() {
	createCanvas(812, 375);
	background(150);
  // noSmooth();
	smooth();
	strokeWeight(.1);
}

function mousePressed(){
    curSeed = floor(random()*50);
    // noiseSeed(curSeed);
    console.log(curSeed);
}

function draw() {
	// ellipse(mouseX, mouseY, 20, 20)
	// x1	Number: the x-coordinate of the first point
	// y1	Number: the y-coordinate of the first point
	// x2	Number: the x-coordinate of the second point
	// y2	Number: the y-coordinate of the second point

	// stroke(100);
	// for(var i = 0;i< windowHeight+200; i++){ 
	// 	 // line(i+10, 10, i+20, 10);
	// 	 line(0, 0, windowWidth, 20*i);
	// 	 line(0, windowHeight, windowWidth, 20*i);
	// } 
	// stroke(50);
	// for(var i = 0;i< windowHeight+200; i++){ 
	// 	 // line(i+10, 10, i+20, 10);
	// 	 line(20, 0, windowWidth, 20*i);
	// 	 line(40, windowHeight, windowWidth, 20*i);
	// }

	
	grid();
	
	curves();
}

function simpleGrid() {
	// stroke(0);
	const increment = 10;
	var pixels = increment;
	for(var i = 0;i< windowHeight; i++){
			line(1, pixels, windowWidth, pixels);
		  pixels = pixels + increment;
	}
	pixels = increment;
	for(var i = 0;i< windowWidth; i++){
			line(pixels, 1, pixels, windowHeight);
		  pixels = pixels + increment;
	}
}

function curves() {
	noFill();
	stroke(random(0, 255));
	const increment = 10;
	let pixels = increment;
	beginShape();
	for(var i = 1;i< 1000; i++){
		// strokeWeight( random(0, 100) * 0.001 );
		// strokeWeight( random(0.1, 10) );
		curveVertex(random(windowWidth/i, windowWidth), random(windowHeight/i, windowHeight));
		// curveVertex(random(1, pixels), random(pixels, windowHeight));
		pixels = pixels + increment;
	}
	endShape();
}

function grid() {
	// stroke(0);
	const increment = 10;
	var pixels = increment;
	for(var i = 0;i< windowHeight; i++){ //x
		  stroke(random(150, 255));
			line(1, random(1, pixels), windowWidth, random(pixels, windowWidth));
		  pixels = pixels + increment;
	}
	pixels = increment;
	for(var i = 0;i< windowWidth; i++){ //y
		 	stroke(random(0, 255));
			line(random(1, pixels), 1, random(pixels, windowHeight), windowHeight);
		  pixels = pixels + increment;
	}
	
}