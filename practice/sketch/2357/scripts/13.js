let lineNumber,
  lineCount = 0,
  fractional = [],
  sparkLines = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255),
    textFont("Courier"),
    textSize(14),
    (lineNumber = 0),
    labelAndValue("", mouseX),
    labelAndValue("", mouseY),
    labelAndValue("", mouseIsPressed),
    (lineNumber += 1),
    beginGroup(),
    labelAndValue("", frameCount),
    labelAndValue("", frameCount / 10),
    endGroup(),
    (lineNumber += 1),
    labelAndValue("", frameCount % 10),
    labelAndValue("", frameCount % 100),
    (lineNumber += 1),
    beginGroup(),
    labelAndValue("", millis()),
    labelAndValue("", millis() / 10),
    endGroup(),
    (lineNumber += 1),
    labelAndValue("", sin(frameCount)),
    labelAndValue("", sin(frameCount / 10));
}
function labelAndValue(e, n) {
  var l = map(lineNumber, 0, lineCount, 200, height);
  let a = sparkLines[lineNumber];
  a ||
    ((a = sparkLines[lineNumber] = new SparkLine()),
    (fractional[lineNumber] = !1)),
    (fractional[lineNumber] = fractional[lineNumber] || Boolean(n % 1)),
    a.appendValue(n),
    textAlign(LEFT),
    text(e, 18, l),
    textAlign(LEFT),
    text(fractional[lineNumber] ? n.toFixed(1) : n, 24, l),
    a.draw(120, l),
    (lineNumber += 1),
    (lineCount = max(lineNumber, lineCount));
}
let groupStartIndex;
function beginGroup() {
  groupStartIndex = lineNumber;
}
function endGroup() {
  let e = sparkLines.slice(groupStartIndex, lineNumber);
  var n = min(...e.map(e => e.min)),
    l = max(...e.map(e => e.max));
  e.forEach(e => {
    (e.min = n), (e.max = l);
  });
}

class SparkLine {
  constructor() {
    this.min = Infinity;
    this.max = -Infinity;
    this.values = [];
  }

  appendValue(value) {
    this.min = min(this.min, value);
    if (value > this.max) {
      this.max = max(5 * this.max, value);
    }
    this.values.push(value);
    if (this.values.length > 500) {
      this.values.shift();
    }
  }

  draw(x, y) {
    while (this.values.length > width - x) {
      this.values.shift();
    }
    for (let i = 0; i < this.values.length; i++) {
      let h = map(Number(this.values[i]), 0, this.max, 0, 100);
      rect(
        x + i,
        y + map(0, Number(this.min), Number(this.max), 0, 5),
        1,
        -h
      );
    }
  }
}
