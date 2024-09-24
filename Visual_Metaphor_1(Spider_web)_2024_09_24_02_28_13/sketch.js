let numSpokes = 24;
let numRings = 5;
let radius = 1500; // Increased radius for a bigger web
let imperfection = 2;

let currentRing = 0;
let animationStep = 0;
let totalSteps = 100; // Control the speed of ring drawing

function setup() {
  createCanvas(1000, 800); // Larger canvas to accommodate the bigger web
  background(255);
  stroke(0);
  strokeWeight(1.5);
  noFill();
  frameRate(30); // Control the speed of the overall drawing process
  
  // Draw the spokes first
  let centerX = width / 2;
  let centerY = height / 2;
  for (let s = 0; s < numSpokes; s++) {
    let angle = TWO_PI / numSpokes * s;
    let x = centerX + cos(angle) * (radius + (s % 2 === 0 ? imperfection : -imperfection));
    let y = centerY + sin(angle) * (radius + (s % 2 === 0 ? imperfection : -imperfection));
    line(centerX, centerY, x, y);
    
    
  }
}

function draw() {
  let centerX = width / 2;
  let centerY = height / 2;

  // Gradually draw the rings
  if (currentRing <= numRings) {
    beginShape();
    let currentStepAngle = TWO_PI / numSpokes;
    for (let s = 0; s <= numSpokes; s++) {
      let angle = currentStepAngle * s;
      let ringRadius = (radius / numRings) * currentRing;

      // Gradual appearance of rings
      let adjustedRadius = ringRadius * (animationStep / totalSteps);

      let x = centerX + cos(angle) * (adjustedRadius + (s % 3 === 0 ? imperfection : -imperfection / 2));
      let y = centerY + sin(angle) * (adjustedRadius + (s % 3 === 0 ? imperfection : -imperfection / 2));
      curveVertex(x, y);
    }
    endShape(CLOSE);

    // Increment the animation step and move to next ring when done
    animationStep += 2;
    if (animationStep >= totalSteps) {
      animationStep = 0;
      currentRing += 1;
    }
  }

  // Stop the draw loop once everything is drawn
  if (currentRing > numRings) {
    noLoop();
  }
}
