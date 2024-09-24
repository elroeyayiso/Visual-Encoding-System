let center;
let centerRadius = 75;  // Increased size
let numOuterBalls = 12;
let outerBalls = [];
let outerRadius = 35;  // Increased size
let colors = [
  '#C86464', '#969632', '#329664',
  '#6464C8', '#963296', '#C89664',
  '#64C864', '#326496', '#9632C8',
  '#C86496', '#64C8C8', '#96C832'
];
let labels = [
  "Community Support", "Indvidual Needs", "Economical Needs",
  "Economic Status,", "Community Health", "Status",
  "Stigma", " Healthcare Education", "Professional Help",
  "Faith-Based Health Initiatives", "Healthcare  Access", "Cultural Sensitivity "
];
let dragging = [];
let draggedIndex = -1;

function setup() {
  createCanvas(1000,700);
  center = createVector(width / 2, height / 2);

  // Initialize positions for the outer balls
  let angleStep = TWO_PI / numOuterBalls;
  let distanceFromCenter = 300; // Adjust this distance if needed
  for (let i = 0; i < numOuterBalls; i++) {
    let angle = i * angleStep;
    let x = center.x + cos(angle) * distanceFromCenter;
    let y = center.y + sin(angle) * distanceFromCenter;
    outerBalls[i] = createVector(x, y);
    dragging[i] = false;
  }
}

function draw() {
  background('#98a2b2');

  // Draw the central knot with a 3D effect
  drawBall(center.x, center.y, centerRadius, color(100, 150, 200));

  // Draw the threads and outer balls
  for (let i = 0; i < outerBalls.length; i++) {
    drawThread(center, outerBalls[i], color(colors[i]));
    drawBall(outerBalls[i].x, outerBalls[i].y, outerRadius, color(colors[i]));
  }

  // Add text labels
  fill(0);
  textSize(12);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < outerBalls.length; i++) {
    text(labels[i], outerBalls[i].x, outerBalls[i].y + outerRadius + 10);
  }

  // Dragging behavior
  if (draggedIndex != -1) {
    outerBalls[draggedIndex].x = mouseX;
    outerBalls[draggedIndex].y = mouseY;
  }
}

function drawBall(x, y, r, c) {
  noStroke();
  for (let i = 0; i < r; i++) {
    let inter = map(i, 0, r, 0, 1);
    fill(lerpColor(c, color(0), inter));
    ellipse(x, y, r * 2 - i * 2, r * 2 - i * 2);
  }
}

function drawThread(start, end, c) {
  stroke(c);
  strokeWeight(4);
  line(start.x, start.y, end.x, end.y);
}

function mousePressed() {
  for (let i = 0; i < outerBalls.length; i++) {
    if (dist(mouseX, mouseY, outerBalls[i].x, outerBalls[i].y) < outerRadius) {
      dragging[i] = true;
      draggedIndex = i;
      break;
    }
  }
}

function mouseReleased() {
  draggedIndex = -1;
  for (let i = 0; i < outerBalls.length; i++) {
    dragging[i] = false;
  }
}