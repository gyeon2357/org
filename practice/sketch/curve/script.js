const canvasEl = document.querySelector('#background-canvas');
const canvasCxt = canvasEl.getContext('2d');

const params = {
    number: 80,
    rotationSpeed: .0005,
    mouseMagnet: 1, // to be responsive
    trajectorySquash: [2, 1],
    trajectoryAngle: -.4,
    mouseThreshold: .05
}

let mouse = {
    x: 0, y: 0
};

// for codepen preview only
let mouseMoved = false;

// set up the <canvas> and screen object to be used for balls data array
let screen;
resizeCanvas();

// set up balls data array
let ballsData;
initBallsArray();

// run the rendering loop
updateCanvas(0);

// set up events
document.onmousemove = function (e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    // for codepen preview only
    // mouseMoved = true;
}
document.ontouchmove = function (e) {
    mouse.x = e.targetTouches[0].pageX;
    mouse.y = e.targetTouches[0].pageY;
    // for codepen preview only
    // mouseMoved = true;
}
window.onresize = function () {
    resizeCanvas();
    initBallsArray();
};
window.onclick = function () {
    initBallsArray();
};


// -----------------------------------------

function initBallsArray() {
    ballsData = [];
    for (let i = 0; i < params.number; i++) {
        ballsData[i] = {
            baseX: screen.c[0],
            baseY: screen.c[1],
            x: screen.c[0],
            y: screen.c[1],
            targetX: screen.c[0],
            targetY: screen.c[1],
            r: screen.ballBaseDiameter
        }
    }
}

function updateCanvas(time) {

    // for codepen preview only
    if (!mouseMoved) {
        mouse.x = (.2 + .3 * (1 + Math.sin(.002 * time))) * window.innerWidth;
        mouse.y = (.2 + .1 * (1 + Math.cos(.002 * time))) * window.innerHeight;
    }

    let dX, dY, sqDist, ballAngle;
    canvasCxt.clearRect(0, 0, canvasEl.width, canvasEl.height);

    ballsData.forEach((b, idx) => {

        // place balls on the circle w/ center in (0, 0)
        ballAngle = idx / params.number * 2 * Math.PI + params.rotationSpeed * time;
        b.baseX = params.trajectorySquash[0] * Math.cos(ballAngle) * screen.trajectoryRadius;
        b.baseY = params.trajectorySquash[1] * Math.sin(ballAngle) * screen.trajectoryRadius;

        // rotate the circle
        b.baseX += (b.baseX * (1 - Math.cos(params.trajectoryAngle)));
        b.baseY += (b.baseX * Math.sin(params.trajectoryAngle));

        // move circle to the middle of screen
        b.baseX += screen.c[0];
        b.baseY += screen.c[1];

        // mouse interaction
        dX = mouse.x - b.targetX;
        dY = mouse.y - b.targetY;
        sqDist = (dX * dX) + (dY * dY);
        b.targetX = b.baseX - params.mouseMagnet * dX / sqDist;
        b.targetY = b.baseY - params.mouseMagnet * dY / sqDist;

        // add delay to the cursor response
        b.x += (b.targetX - b.x) * params.mouseThreshold;
        b.y += (b.targetY - b.y) * params.mouseThreshold;

        // draw the ball
        canvasCxt.beginPath();
        canvasCxt.arc(b.x, b.y, .5 * b.r, 0, 2 * Math.PI);
        canvasCxt.fill();
    });

    window.requestAnimationFrame(updateCanvas);
}

function resizeCanvas() {
    screen = {
        w: window.innerWidth,
        h: window.innerHeight,
        c: [.5 * window.innerWidth, .5 * window.innerHeight],
        trajectoryRadius: Math.min(.1 * window.innerWidth, .2 * window.innerHeight),
        ballBaseDiameter: Math.min(.04 * window.innerWidth, .04 * window.innerHeight)
    };
	 params.mouseMagnet = 100 * window.innerWidth;
    canvasEl.width = screen.w;
    canvasEl.height = screen.h;
}