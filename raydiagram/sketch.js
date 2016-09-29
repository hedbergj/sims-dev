var lensx;
var y;
var objecty;
var distanceUntilEnd;
var opp;
var refractionAngle;
var img;
var focalLength=300;
var optAxis;
function preload() {
  img = loadImage("img/lens1.svg");
}
function setup() {
   createCanvas(1000, 500);
   fSlider = createSlider(10, width*10, width/2);
   fSlider.parent('sketch-holder');
   fSlider.position(20, 20);
   fSlider.style('width', '150px');
   fSlider.class("sim-slider");
   x=0;
   y=50;
   lensPos = {x: 100, y:100};
   lensx = width/2;
   objecty = height/4;
   optAxis = height/2;
   }

function draw() {

  background(0);
  image(img, lensPos.x-13, lensPos.y);
  focallength=fSlider.value();
  opticalAxis();
  for (h = optAxis+100; h > objecty; h -= 20){
  ray(h);
  }
}

function ray(rayHeight) {
  strokeWeight(1.5);
  //line(x1,y1,x2,y2);
    line(0, rayHeight, lensPos.x, rayHeight);
    distanceUntilEnd = dist(lensPos.x,rayHeight,width,rayHeight);
    dely = distanceUntilEnd/(focallength/(optAxis-rayHeight));
    line(lensPos.x, rayHeight, width, rayHeight+dely);
}

function opticalAxis(){
  stroke(255);
  strokeWeight(1);
  line(0,height/2,width,height/2);
}
