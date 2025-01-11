
var positives;

var negatives;

var chargePosition;

var netField;

var unitVector;

var currentCharge;

var positiveCharge;

var negativeCharge;

var drawPositive;

var q;

var r;

var k;

var m;

var fieldMag;

function setup() {
    initializeFields();
    createCanvas(600, 600);
    drawPositive = true;
    netField = new PVector(0, 0);
    unitVector = new PVector(0, 0);
    positiveCharge = loadImage("positive.png");
    negativeCharge = loadImage("negative.png");
    imageMode(CENTER);
    k = 9 * pow(10, 9);
    q = 1.6 * 10 * pow(10, -19);
    ;
}

function draw() {
    background(0);
    drawVectors();
    drawCharges();
    fill(255);
    textSize(15);
    text("1- Switch Charge", 25, 25);
    text("D- Clear charges", 25, 50);
    textSize(20);
    text("Click to place charge!", 25, 585);
    if (drawPositive) {
        image(positiveCharge, mouseX, mouseY, 25, 25);
    } else {
        image(negativeCharge, mouseX, mouseY, 25, 25);
    }
}

function drawCharges() {
    for (var i = 0; i < positives.createCanvas(); i++) {
        chargePosition = positives.get(i);
        image(positiveCharge, chargePosition.x, chargePosition.y, 25, 25);
    }
    for (var j = 0; j < negatives.createCanvas(); j++) {
        chargePosition = negatives.get(j);
        image(negativeCharge, chargePosition.x, chargePosition.y, 25, 25);
    }
}

function drawVectors() {
    for (var x = 0; x <= 600; x += 25) {
        for (var y = 0; y <= 600; y += 25) {
            drawVector(x, y);
        }
    }
}

function drawVector(x, y) {
    for (var i = 0; i < positives.createCanvas(); i++) {
        currentCharge = positives.get(i);
        m = sqrt(pow((currentCharge.x - x), 2) + pow((currentCharge.y - y), 2));
        fieldMag = 99999 / pow(m, 2);
        if (fieldMag >= 10) {
            fieldMag = 10;
        }
        unitVector.x -= fieldMag * (currentCharge.x - x) / m;
        unitVector.y -= fieldMag * (currentCharge.y - y) / m;
    }
    for (var j = 0; j < negatives.createCanvas(); j++) {
        currentCharge = negatives.get(j);
        m = sqrt(pow((currentCharge.x - x), 2) + pow((currentCharge.y - y), 2));
        fieldMag = 99999 / pow(m, 2);
        if (fieldMag >= 10) {
            fieldMag = 10;
        }
        unitVector.x += fieldMag * (currentCharge.x - x) / m;
        unitVector.y += fieldMag * (currentCharge.y - y) / m;
    }
    stroke(255);
    strokeWeight(1.75);
    line(x, y, x + unitVector.x, y + unitVector.y);
    strokeWeight(0);
    fill(255, 0, 0);
    ellipse(x + unitVector.x, y + unitVector.y, 2, 2);
    unitVector.x = 0;
    unitVector.y = 0;
}

function mousePressed() {
    if (drawPositive) {
        positives.add(new PVector(mouseX, mouseY));
    } else {
        negatives.add(new PVector(mouseX, mouseY));
    }
}

function keyPressed() {
    if (key == '1') {
        drawPositive = !drawPositive;
    }
    if (key == 'd' | key == 'D') {
        positives.clear();
        negatives.clear();
    }
}

function initializeFields() {
    positives = new ArrayList<PVector>();
    negatives = new ArrayList<PVector>();
    chargePosition = null;
    netField = null;
    unitVector = null;
    currentCharge = null;
    positiveCharge = null;
    negativeCharge = null;
    drawPositive = false;
    q = 0;
    r = 0;
    k = 0;
    m = 0;
    fieldMag = 0;
}

function preload() {
// TODO: put method calls that load from files into this method
// I found the following calls that you should move here:
// - on line 20: positiveCharge = loadImage("positive.png")
// - on line 21: negativeCharge = loadImage("negative.png")
// (note that line numbers are from your Processing code)
}

