function setup() {
  createCanvas(800, 800);
  background(255);
  noLoop();
}

function draw() {
  let xStart = 50;
  let yStart = 50;
  let flowerSize = 50;
  let spacing = 100;

  // Set drawing attributes
  stroke(0);
  strokeWeight(1);
  noFill();

  // Loop to draw flowers in a grid
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 6; j++) {
      let x = xStart + j * spacing;
      let y = yStart + i * spacing;
      drawFlower(x, y, flowerSize);
    }
  }

  // Add colored centers
  addColoredCenters();

  // Add connecting lines
  addConnectingLines();
}

// Function to draw a flower with irregular circular petals
function drawFlower(x, y, size) {
  let petalRadius = size / 3;
  let petals = 5;

  for (let i = 0; i < petals; i++) {
    let angle = TWO_PI / petals * i;
    let xPetal = x + cos(angle) * size / 2 + random(-5, 5);
    let yPetal = y + sin(angle) * size / 2 + random(-5, 5);
    drawIrregularCircle(xPetal, yPetal, petalRadius);
  }
  
  // Draw the outline of the center of the flower
  drawIrregularCircle(x + random(-2, 2), y + random(-2, 2), size / 6);
}

// Function to draw an irregular circle
function drawIrregularCircle(x, y, radius) {
  let points = 12;
  let angleStep = TWO_PI / points;
  beginShape();
  for (let i = 0; i < points; i++) {
    let angle = i * angleStep;
    let r = radius + random(-3, 3);
    let xOffset = cos(angle) * r;
    let yOffset = sin(angle) * r;
    vertex(x + xOffset, y + yOffset);
  }
  endShape(CLOSE);
}

// Function to add colored centers
function addColoredCenters() {
  fill(255, 0, 0, 150);
  drawIrregularCircle(150, 50, 15);
  drawIrregularCircle(250, 50, 15);
  drawIrregularCircle(350, 50, 15);
  drawIrregularCircle(450, 50, 15);
  
  fill(0, 0, 255, 150);
  drawIrregularCircle(150, 150, 15);
  drawIrregularCircle(250, 150, 15);
  drawIrregularCircle(350, 150, 15);
  drawIrregularCircle(450, 150, 15);

  fill(255, 0, 255, 150);
  drawIrregularCircle(150, 250, 15);
  drawIrregularCircle(250, 250, 15);
  drawIrregularCircle(350, 250, 15);
  drawIrregularCircle(450, 250, 15);
  
  noFill();
}

// Function to add connecting lines
function addConnectingLines() {
  stroke(255, 0, 0, 150);
  line(150 + random(-3, 3), 50 + random(-3, 3), 250 + random(-3, 3), 50 + random(-3, 3));
  line(250 + random(-3, 3), 50 + random(-3, 3), 350 + random(-3, 3), 50 + random(-3, 3));
  line(350 + random(-3, 3), 50 + random(-3, 3), 450 + random(-3, 3), 50 + random(-3, 3));

  line(150 + random(-3, 3), 150 + random(-3, 3), 250 + random(-3, 3), 150 + random(-3, 3));
  line(250 + random(-3, 3), 150 + random(-3, 3), 350 + random(-3, 3), 150 + random(-3, 3));
  line(350 + random(-3, 3), 150 + random(-3, 3), 450 + random(-3, 3), 150 + random(-3, 3));

  line(150 + random(-3, 3), 250 + random(-3, 3), 250 + random(-3, 3), 250 + random(-3, 3));
  line(250 + random(-3, 3), 250 + random(-3, 3), 350 + random(-3, 3), 250 + random(-3, 3));
  line(350 + random(-3, 3), 250 + random(-3, 3), 450 + random(-3, 3), 250 + random(-3, 3));
}
