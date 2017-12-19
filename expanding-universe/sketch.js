var img;
var offsetx = 0;
var offsety = 0;
var easing = 0.05;
var dx,dy;
var img2x,img2y;
var scale = 1.03;
function preload() {
  deepfield = loadImage("hubbleDF1.jpg");
  deepfieldalpha = loadImage("hubbleDF1-alpha.png");

}


function setup() {
  canvas = createCanvas(800,800)
  //canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');

  imageMode(CENTER);
  centerx=width/2;
  centery=height/2;
  offsetx=centerx;
  offsety=centery;
  cursor(MOVE);
  frameRate(30);
}

function draw() {
  background(0)
  translate(centerx,centery);
  image(deepfield, 0, 0);  // Display at full opacity
//var dx = (mouseX-deepfield.width/2) - offset;
// offsetx += dx * easing;
// offsety += dy * easing;
//tint(255, 127);  // Display at half opacity
image(deepfieldalpha, .05*(mouseX-centerx), .05*(mouseY-centery),deepfieldalpha.width*scale,deepfieldalpha.height*scale);

}

function touchEnded() {
  //ellipse(mouseX, mouseY, 5, 5);
  // prevent default
  offsetx=mouseX;
  offsety=mouseY;
  return false;
}
