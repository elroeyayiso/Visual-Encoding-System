function setup() {
  createCanvas(1000, 800);
  background(60, 120, 180); // Blue background
  
  // Main circle in the center
  drawConcentricCircles(width / 2, height / 2, 150, 3, 6);
  
  // Duplicate 1 - Smaller circle in the top-left
  drawConcentricCircles(width / 7, height / 4, 80, 2, 4);
  
  // Duplicate 2 - Smaller circle in the top-right
  drawConcentricCircles(3 * width / 3.5, height / 4, 80, 2, 4);
  
  // Duplicate 3 - Smaller circle in the bottom-left
  drawConcentricCircles(width / 6, 3 * height / 4, 80, 2, 4);
}

function drawConcentricCircles(centerX, centerY, initialRadius, numLayers, numPeople) {
  for (let i = 0; i < numLayers; i++) {
    let radius = initialRadius + (i * (initialRadius / numLayers));
    drawCircleOfPeople(centerX, centerY, radius, numPeople + (i * 2)); // Slightly increase the number of people in each layer
  }
}

function drawCircleOfPeople(centerX, centerY, radius, numPeople) {
  let angleStep = TWO_PI / numPeople;

  for (let i = 0; i < numPeople; i++) {
    let angle = i * angleStep;
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;

    drawPerson(x, y, 30, angle); // Smaller size for people

    // Draw the arms connecting to the next person
    let nextAngle = (i + 1) * angleStep;
    let nextX = centerX + cos(nextAngle) * radius;
    let nextY = centerY + sin(nextAngle) * radius;

    drawArm(x, y, nextX, nextY);
  }
}

function drawPerson(x, y, size, angle) {
  push();
  translate(x, y);
  rotate(angle + HALF_PI);

  // Draw head
  fill(random(200, 255), random(150, 200), random(100, 150)); // Randomized skin tone
  ellipse(0, -size * 0.7, size * 0.6, size * 0.6);

  // Draw hair
  drawHair(0, -size * 0.7, size);

  // Draw body with patterns
  fill(random(100, 255), random(100, 255), random(100, 255)); // Random clothing color
  rect(-size * 0.4, -size * 0.3, size * 0.8, size);

  // Draw arms with patterns
  stroke(random(200, 255), random(150, 200), random(100, 150)); // Random skin tone for arms
  strokeWeight(size * 0.1);
  line(-size * 0.4, -size * 0.1, -size * 1.2, size * 0.5);
  line(size * 0.4, -size * 0.1, size * 1.2, size * 0.5);

  // Draw legs
  stroke(0); // Black for legs
  strokeWeight(size * 0.1);
  line(-size * 0.2, size * 0.7, -size * 0.2, size * 1.6);
  line(size * 0.2, size * 0.7, size * 0.2, size * 1.6);

  pop();
}

function drawHair(x, y, size) {
  fill(50, 25, 0); // Brown hair
  let style = int(random(3)); // Three different hair styles
  
  if (style == 0) {
    ellipse(x, y - size * 0.3, size * 0.5, size * 0.3); // Simple hair
  } else if (style == 1) {
    rect(x - size * 0.3, y - size * 0.5, size * 0.6, size * 0.3); // Short hair
  } else {
    triangle(x - size * 0.3, y - size * 0.5, x + size * 0.3, y - size * 0.5, x, y - size * 0.8); // Spiky hair
  }
}

function drawArm(x1, y1, x2, y2) {
  stroke(139, 69, 19); // Brown skin color
  strokeWeight(6);
  line(x1, y1, x2, y2);
}
