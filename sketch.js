let centerX, centerY;
let numRings = 20;   // Number of concentric rings
let numLines = 60;   // Number of radial lines
let randomness = 10; // Amount of randomness

let currentRing = 1;
let currentLine = 0;

function setup() {
  createCanvas(800, 800);
  centerX = width / 2;
  centerY = height / 2;
  background(255);  // White background
  noFill();
  frameRate(10);    // Slower speed of drawing
}

function draw() {
  let angleStep = TWO_PI / numLines;
  let ringStep = min(width, height) / (2 * numRings);

  // Calculate randomness based on mouse position
  randomness = map(mouseX, 0, width, 0, 10);

  // Draw the current segment of the radial line
  if (currentLine < numLines) {
    setColorForLevel(currentRing);  // Set the color for the current ring
    let angle = currentLine * angleStep + random(-PI / numLines, PI / numLines);
    let radius = currentRing * ringStep + random(-randomness, randomness);
    let nextRadius = (currentRing + 1) * ringStep + random(-randomness, randomness);
    let x1 = centerX + cos(angle) * radius;
    let y1 = centerY + sin(angle) * radius;
    let x2 = centerX + cos(angle) * nextRadius;
    let y2 = centerY + sin(angle) * nextRadius;
    line(x1, y1, x2, y2);

    // Move to the next line
    currentLine++;
  } else {
    // Draw the current concentric ring
    if (currentRing <= numRings) {
      setColorForLevel(currentRing);  // Set the color for the current ring
      let radius = currentRing * ringStep + random(-randomness, randomness);
      beginShape();
      for (let i = 0; i < numLines; i++) {
        let angle = i * angleStep + random(-PI / numLines, PI / numLines);
        let x = centerX + cos(angle) * radius;
        let y = centerY + sin(angle) * radius;
        vertex(x, y);
      }
      endShape(CLOSE);

      // Move to the next ring
      currentRing++;
      currentLine = 0;
    }
  }
}

function setColorForLevel(level) {
  if (level == 1) {
    stroke(255, 0, 0);  // Red for the central individual or household
  } else if (level <= 5) {
    stroke(0, 255, 0);  // Green for close family members
  } else if (level <= 10) {
    stroke(0, 0, 255);  // Blue for extended family and close friends
  } else {
    stroke(255, 165, 0);  // Orange for the wider community
  }
}
