// Setup canvas
let canvas;
let ctx;

function setup() {
  canvas = createCanvas(800, 800);
  ctx = canvas.elt.getContext('2d'); // Access the canvas element and its context
  
  // Colors
  let green = "#008000";
  let purple = "#800080";
  let red = "#FF0000";
  let blue = "#0000FF";
  let black = "#000000";
  
  // Rectangles and check marks
  drawRectangleWithCheck(50, 50, 200, 150, green);
  drawRectangleWithCheck(50, 50, 200, 150, red);
  drawRectangleWithCheck(300, 50, 200, 150, black);
  drawRectangleWithCheck(550, 50, 200, 300, purple, purple, purple);
  drawRectangleWithCheck(50, 250, 200, 150, black);
  drawRectangleWithCheck(300, 250, 200, 150, purple, red);
  drawRectangleWithCheck(550, 400, 200, 150, purple);
  drawRectangleWithCheck(50, 450, 200, 150, blue, purple);
  drawRectangleWithCheck(300, 450, 200, 150, black);
}

function drawRectangleWithCheck(x, y, w, h, ...checkColors) {
  ctx.strokeStyle = "#000000"; // black stroke
  ctx.fillStyle = "rgba(255, 255, 255, 0)"; // transparent fill
  drawSoftRectangle(x, y, w, h);
  
  for (let c of checkColors) {
    drawCheckMark(x, y, w, h, c);
  }
}

function drawSoftRectangle(x, y, w, h) {
  let jitter = 5;  // Amount of jitter for soft edges
  let segments = 4;  // Number of segments per edge
  
  ctx.beginPath();
  for (let i = 0; i <= segments; i++) {
    let xOffset = w * i / segments + random(-jitter, jitter);
    let yOffset = random(-jitter, jitter);
    ctx.lineTo(x + xOffset, y + yOffset);
  }
  for (let i = 0; i <= segments; i++) {
    let xOffset = w + random(-jitter, jitter);
    let yOffset = h * i / segments + random(-jitter, jitter);
    ctx.lineTo(x + xOffset, y + yOffset);
  }
  for (let i = 0; i <= segments; i++) {
    let xOffset = w * (segments - i) / segments + random(-jitter, jitter);
    let yOffset = h + random(-jitter, jitter);
    ctx.lineTo(x + xOffset, y + yOffset);
  }
  for (let i = 0; i <= segments; i++) {
    let xOffset = random(-jitter, jitter);
    let yOffset = h * (segments - i) / segments + random(-jitter, jitter);
    ctx.lineTo(x + xOffset, y + yOffset);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawCheckMark(x, y, w, h, c) {
  ctx.strokeStyle = c;
  ctx.lineWidth = 2;
  let x1 = x + w * 0.3 + random(-3, 3);  // Added randomness to check mark points
  let y1 = y + h * 0.6 + random(-3, 3);
  let x2 = x + w * 0.4 + random(-3, 3);
  let y2 = y + h * 0.75 + random(-3, 3);
  let x3 = x + w * 0.65 + random(-3, 3);
  let y3 = y + h * 0.4 + random(-3, 3);
  
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.stroke();
}

// Helper function for random number within range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Helper function to create canvas
function createCanvas(width, height) {
  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  return canvas;
}

// Initialize
setup();
