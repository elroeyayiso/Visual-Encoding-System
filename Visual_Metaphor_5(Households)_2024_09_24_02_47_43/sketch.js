let raindrops = []; // Array to store raindrops
let clouds = []; // Array to store cloud positions

// Popup text object
let popupText = {
  message: "",
  x: 0,
  y: 0,
  visible: false,
  timer: 0,
  maxTime: 60, // Time in frames the text remains visible

  show: function(message, x, y) {
    this.message = message;
    this.x = x;
    this.y = y;
    this.visible = true;
    this.timer = this.maxTime;
  },

  update: function() {
    if (this.visible) {
      this.timer--;
      if (this.timer <= 0) {
        this.visible = false;
      }
    }
  },

  draw: function() {
    if (this.visible) {
      fill(255);
      textSize(16);
      textAlign(CENTER);
      text(this.message, this.x, this.y, 200); // Set a maximum width of 200 pixels for wrapping
    }
  }
};

function setup() {
  createCanvas(1200, 800); // Increased canvas size for better spacing
  
  // Initialize raindrops
  for (let i = 0; i < 200; i++) {
    raindrops.push(new Raindrop(random(width), random(height)));
  }
  
  // Initialize cloud positions
  for (let i = 0; i < 3; i++) {
    clouds.push({
      x: random(width),
      y: random(50, 150),
      size: random(50, 120),
      speed: random(0.1, 0.5)
    });
  }
}

function draw() {
  background(220);
  
  // Draw grass
  drawGrass();
  
  // Draw first house (left side) pink
  drawHouse(50, 600, 255, 150, 150, "My family friends live here, and I consider them part of my household."); // x, y, r, g, b, message
  
  // Draw second house (right side) green
  drawHouse(900, 600, 150, 255, 150, "I live far away from my family,where I’ve built a new community that feels like home."); // x, y, r, g, b, message
  
  // Draw third house (top) purple
  drawHouse(70, 350, 150, 150, 255, "My parents and my two siblings live here"); // x, y, r, g, b, message
  
  // Draw fourth house (bottom) yellow
  drawHouse(600, 600, 255, 255, 150, "This is my uncle's house "); // x, y, r, g, b, message
  
  // Draw church (center)
  drawChurch(400, 550, "The church is my community and it plays a vital role in our lives."); // x, y, message
  
  // Update and draw clouds
  for (let i = 0; i < clouds.length; i++) {
    clouds[i].x += clouds[i].speed; // Move the cloud horizontally
    
    // If the cloud goes off-screen, reset its position
    if (clouds[i].x > width + clouds[i].size) {
      clouds[i].x = -clouds[i].size;
    }
    
    // Draw the cloud
    drawCloud(clouds[i].x, clouds[i].y, clouds[i].size);
  }
  
  // Update and draw raindrops
  for (let i = 0; i < raindrops.length; i++) {
    raindrops[i].fall();
    raindrops[i].show();
  }
  
  // Update and draw popup text
  popupText.update();
  popupText.draw();
}

function drawGrass() {
  fill(50, 200, 50); // Green color for grass
  noStroke();
  rect(0, height - 100, width, 100); // Grass rectangle at the bottom of the canvas
  
  // Draw lines to simulate grass texture
  stroke(50, 150, 50); // Darker green for grass lines
  strokeWeight(2);
  for (let y = height - 100; y < height; y += 10) {
    line(0, y, width, y); // Draw horizontal lines across the grass area
  }
}

function drawHouse(x, y, r, g, b, message) {
  // Draw the house structure
  fill(r, g, b);
  rect(x, y, 100, 100); // Main house rectangle
  
  // Draw the roof
  fill(r - 50, g - 50, b - 50);
  triangle(x, y, x + 100, y, x + 50, y - 50); // Roof triangle
  
  // Draw the door
  fill(100, 50, 0);
  rect(x + 30, y + 60, 40, 40); // Door rectangle
  
  // Draw the windows
  fill(200); // Gray color for the windows
  rect(x + 10, y + 20, 30, 30); // Window 1
  rect(x + 60, y + 20, 30, 30); // Window 2
  
  // Draw the chimney
  fill(r - 30, g - 30, b - 30);
  rect(x + 60, y - 50, 20, 30); // Chimney base
  rect(x + 50, y - 70, 40, 20); // Chimney top
  
  // Check if mouse is over the house
  if (mouseX >= x && mouseX <= x + 100 && mouseY >= y && mouseY <= y + 100) {
    popupText.show(message, x + 50, y + 120); // Show popup text below the house
  }
}

function drawChurch(x, y, message) {
  // Draw the church structure
  fill(255);
  rect(x - 100, y - 100, 200, 200); // Main church rectangle
  
  // Draw the roof
  fill(180, 0, 0);
  triangle(x - 100, y - 100, x + 100, y - 100, x, y - 200); // Roof triangle
  
  // Draw the cross on top
  stroke(0);
  strokeWeight(4);
  line(x, y - 200, x, y - 150); // Vertical line
  line(x - 20, y - 170, x + 20, y - 170); // Horizontal line
  
  // Draw the door
  fill(120, 70, 20);
  rect(x - 30, y + 50, 60, 100); // Door rectangle
  
  // Draw the windows
  fill(200);
  rect(x - 80, y - 30, 40, 40); // Window 1
  rect(x + 40, y - 30, 40, 40); // Window 2
  
  // Check if mouse is over the church
  if (mouseX >= x - 100 && mouseX <= x + 100 && mouseY >= y - 100 && mouseY <= y + 100) {
    popupText.show(message, x, y + 120); // Show popup text below the church
  }
}

function drawCloud(x, y, size) {
  noStroke();
  fill(240); // Cloud color (light gray)
  
  // Draw four ellipses to form a cloud shape
  ellipse(x, y, size, size);
  ellipse(x - size * 0.4, y + size * 0.3, size * 0.8, size * 0.8);
  ellipse(x + size * 0.3, y - size * 0.2, size * 0.7, size * 0.7);
  ellipse(x + size * 0.4, y + size * 0.2, size * 0.6, size * 0.6);
}

function Raindrop(x, y) {
  this.x = x;
  this.y = y;
  
  this.fall = function() {
    this.y += random(2, 6); // Adjust the speed of raindrops falling
    if (this.y > height) {
      this.y = random(-200, -100); // Reset raindrop above the canvas
    }
  }
  
  this.show = function() {
    strokeWeight(1);
    stroke(0, 100, 255); // Blue color for raindrops
    line(this.x, this.y, this.x, this.y + 5); // Raindrop shape
  }
}

function mouseClicked() {
  // Check if mouse click is on any house
  checkHouseClick(50, 600, "This is the left house"); // Example for left house
  checkHouseClick(650, 300, "This is the right house"); // Example for right house
  checkHouseClick(70, 350, "This is the top house"); // Example for top house
  checkHouseClick(650, 600, "This is the bottom house"); // Example for bottom house

  // Check if mouse click is on the church
  checkChurchClick(400, 550, "The church is my community and it plays a vital role in our lives."); // Example for church
}

function checkHouseClick(x, y, message) {
  if (mouseX >= x && mouseX <= x + 100 && mouseY >= y && mouseY <= y + 100) {
    popupText.show(message, x + 50, y + 120); // Show popup text below the house
  }
}

function checkChurchClick(x, y, message) {
  if (mouseX >= x - 100 && mouseX <= x + 100 && mouseY >= y - 100 && mouseY <= y + 100) {
    popupText.show(message, x, y + 120); // Show popup text below the church
  }
}
