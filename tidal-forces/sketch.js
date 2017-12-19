var aVector=[]
var G = 1;
var MassMoon = 1;
var mass = 1;
var REarth = 100;
var r;
var howMany = 8;
var theta = [];
var rSlider;
var massMoonSlider;

function setup() {
  canvas=createCanvas(windowWidth, 500);
  canvas.parent('sketch-holder');
  centerx = width/4;
  centery = height/2;

    rSlider = createSlider(70, 250, 80, 1);
    rSlider.position(20,20);
    rSlider.parent('sketch-holder');
    rSlider.class("sim-slider red");

    massMoonSlider = createSlider(10, 100, 30, 1);
    massMoonSlider.position(20,70);
    massMoonSlider.parent('sketch-holder');
    massMoonSlider.class("sim-slider blue");
  startPoint = createVector(0, 0);
  for (var i = 0; i < howMany; i++) {
  aVector[i] = new Arrow(startPoint, startPoint);
  aVector[i].grab = false;
  aVector[i].draggable = false;
  aVector[i].color = color(0,0,0);
  aVector[i].width = 6

}

}

function draw() {
  background(255);
  push();
  noStroke();
  fill('black');
  text('Moon Position',20,10,150,90);
  text('Moon Mass',20,60,150,90);
  pop();
  MassMoon = massMoonSlider.value();
  r = rSlider.value();
  fill('blue')
  ellipse(centerx,centery,REarth*2+(MassMoon/100)*(7000000/Math.pow(r,3)),REarth*2-(MassMoon/100)*(7000000/Math.pow(r,3)))
  fill(200)
  ellipse(centerx,centery,REarth*2,REarth*2-(MassMoon/100)*(7000000/Math.pow(r,3)))

  ellipse(centerx+r*3,centery,REarth*2*(MassMoon/100)*.27,REarth*2*(MassMoon/100)*.27)


  translate(centerx,centery)
  for (var i = 0; i< howMany; i++) {
  theta[i] = PI*.25*i;
  startPoint = createVector(REarth*cos(theta[i]),REarth*sin(theta[i]))
  aVector[i].origin = startPoint;
  delf = createVector(2*cos(theta[i])/(Math.pow(r,3)),-sin(theta[i])/(Math.pow(r,3)))
  delf.mult(200000*MassMoon)
  aVector[i].target = p5.Vector.add(startPoint,delf)

  aVector[i].update();
  aVector[i].display();
}


}
