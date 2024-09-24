var numMountains = 30; // Number of mountains
var mountainPeaks = [];
var sunX, sunY;

function setup() {
  createCanvas(1000,800);
  background(20);
  sunX = width / 2;
  sunY = height / 4;

  // Generate mountain peaks with different heights
  var spacing = width / numMountains; // Calculate spacing based on the number of mountains
  for (var i = 0; i < numMountains; i++) {
    var x = i * spacing; // Evenly spaced positions
    var y = height - random(100, 300); // Varying peak heights between 100 and 300
    mountainPeaks.push([x, y]);
  }
}

function draw() {
  drawGradientSky();
  drawMountains();
  drawSun(sunX, sunY, 80);
  drawStars();
}

function drawGradientSky() {
  var topColor = color('#1b2b3a'); // Dark bluish tone
  var midColor = color('#2c444c'); // Teal tone
  var bottomColor = color('#466360'); // Muted greenish-blue tone

  for (var i = 0; i < height; i++) {
    var inter = map(i, 0, height, 0, 1);
    var lerpColorValue;
    if (i < height / 2) {
      lerpColorValue = lerpColor(topColor, midColor, map(i, 0, height / 2, 0, 1));
    } else {
      lerpColorValue = lerpColor(midColor, bottomColor, map(i, height / 2, height, 0, 1));
    }
    stroke(lerpColorValue);
    line(0, i, width, i);
  }
}
function drawMountains() {
  noStroke();
  var mountainColor = color('#39413e'); // Dark gray-green for mountains

  for (var i = 0; i < numMountains; i++) {
    var baseHeight = height;
    var peakX = mountainPeaks[i][0];
    var peakY = mountainPeaks[i][1];
    var baseWidth = 300; // Fixed width for the mountain base

    fill(mountainColor);
    beginShape();
    vertex(peakX, peakY); // Start at the peak

    // Left side of the mountain
    bezierVertex(
      peakX - baseWidth * 0.2, // Control point 1 (left curve)
      peakY + baseHeight * 0.4, // Control point 1 (left curve)
      peakX - baseWidth * 0.5, // End point 1 (left base)
      baseHeight, // End point 1 (base height)
      peakX - baseWidth * 0.7, // End point 2 (left base)
      baseHeight // End point 2 (base height)
    );

    // Right side of the mountain
    bezierVertex(
      peakX + baseWidth * 0.7, // Control point 2 (right curve)
      baseHeight, // Control point 2 (right curve)
      peakX + baseWidth * 0.5, // End point 2 (right base)
      baseHeight, // End point 2 (base height)
      peakX + baseWidth * 0.3, // End point 1 (right base)
      peakY + baseHeight * 0.9 // Control point 2 (right curve)
    );

    endShape(CLOSE);
  }
}


function drawSun(x, y, r) {
  noStroke();

  // Outer glowing halo
  for (var i = r * 4; i > r; i -= 0.5) {
    var inter = map(i, r, r * 4, 0, 1);
    fill(lerpColor(color(255, 230, 150, 50), color(243, 195, 102, 0), inter)); // Fading glow from yellow-orange to transparent
    ellipse(x, y, i * 2, i * 2);
  }

  // Inner sun
  for (var i = r; i > 0; i -= 0.5) {
    var inter = map(i, 0, r, 0, 1);
    fill(lerpColor(color(243, 195, 102), color(255, 250, 200), inter)); // Yellow-orange for the sun
    ellipse(x, y, i * 2, i * 2);
  }
}

function drawStars() {
  var numStars = 100;
  for (var i = 0; i < numStars; i++) {
    var x = random(width);
    var y = random(height);
    var size = random(1, 3);
    fill(255, random(150, 255));
    noStroke();
    ellipse(x, y, size, size);
  }
}
