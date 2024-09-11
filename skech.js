var numMountains = 20;
var mountainPeaks = [];
var mountainSpeeds = [];
var sunX, sunY;

function setup() {
  createCanvas(800, 800);
  background(20);
  sunX = width / 2;
  sunY = height / 4;
  
  for (var i = 0; i < numMountains; i++) {
    var x = random(width / 2);
    var y = random(height / 2, height - 100);
    var speed = random(0.5, 1.0); // Adjust speed for more realistic movement

    if (x < width / 4) {
      mountainPeaks.push([x, y]);
      mountainSpeeds.push(speed); // Move right
    } else {
      mountainPeaks.push([width - x, y]);
      mountainSpeeds.push(-speed); // Move left
    }
  }
}

function draw() {
  drawGradientSky();
  drawMountains();
  drawSun(sunX, sunY, 80);
  drawStars();
  moveMountains();
  checkCollisions();
}

function drawGradientSky() {
  for (var i = 0; i < height; i++) {
    var inter = map(i, 0, height, 0, 1);
    stroke(lerpColor(color(255, 200, 100), color(20, 30, 60), inter));
    line(0, i, width, i);
  }
}

function drawMountains() {
  noStroke();
  var mountainColor = color(90, 90, 90); // Single color for mountains
  
  for (var i = 0; i < numMountains; i++) {
    var baseHeight = height;
    var peakX = mountainPeaks[i][0];
    var peakY = mountainPeaks[i][1];
    var baseWidth = random(200, 400); // Wider mountains
    var peakVariance = random(0.2, 0.5); // Variability in peak heights

    // Create a more irregular mountain shape
    fill(mountainColor);
    beginShape();
    vertex(peakX, peakY);
    bezierVertex(
      peakX - baseWidth / 4 + random(-30, 30), // Adding some irregularity
      peakY + (baseHeight - peakY) * peakVariance + random(-20, 20),
      peakX - baseWidth / 2 + random(-30, 30),
      baseHeight,
      peakX - baseWidth / 2,
      baseHeight
    );
    vertex(peakX + baseWidth / 2, baseHeight);
    bezierVertex(
      peakX + baseWidth / 2 + random(-30, 30),
      baseHeight,
      peakX + baseWidth / 4 + random(-30, 30),
      peakY + (baseHeight - peakY) * peakVariance + random(-20, 20),
      peakX,
      peakY
    );
    endShape(CLOSE);
  }
}

function drawSun(x, y, r) {
  noStroke();
  for (var i = r; i > 0; i -= 0.5) {
    var inter = map(i, 0, r, 0, 1);
    fill(lerpColor(color(255, 180, 50), color(255, 255, 255), inter));
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

function moveMountains() {
  for (var i = 0; i < numMountains; i++) {
    mountainPeaks[i][0] += mountainSpeeds[i];
    if (mountainPeaks[i][0] < 0 || mountainPeaks[i][0] > width) {
      mountainPeaks[i][0] = constrain(mountainPeaks[i][0], 0, width);
      mountainSpeeds[i] *= -1; // Reverse direction if reaching boundary
    }
  }
}

function checkCollisions() {
  for (var i = 0; i < numMountains; i++) {
    for (var j = i + 1; j < numMountains; j++) {
      var d = dist(mountainPeaks[i][0], mountainPeaks[i][1], mountainPeaks[j][0], mountainPeaks[j][1]);
      if (d < 100) { // Assuming a collision distance of 100
        // Optionally handle collision here
        console.log('Collision detected between mountains at', i, 'and', j);
      }
    }
  }
}
