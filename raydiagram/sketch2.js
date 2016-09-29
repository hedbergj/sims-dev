var x;
var y;
function setup() {
   createCanvas(500, 500);
   x=0;
   y=50;
}

function draw() {
  x = x+2;
  if(x < width/2){
  y = y;
  }
  if(x > width/2){
  y = y+4;
  }
  translate(x, y);
  ray(0,0,0,2)
}

function ray(x, y, dir, width) {
  rotate(1);
  ellipse(x,y,width,width)
}
