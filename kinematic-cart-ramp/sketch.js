
var forceSlider;
var triangleHeight, triangleBase;

function setup() {
  canvas=createCanvas(400 , 400);
  canvas.parent('sketch-holder');

  angleSlider = createSlider(0, 30, 30, 1);
  angleSlider.position(20,50);
  angleSlider.parent('sketch-holder');
  angleSlider.class("sim-slider red");


  triangleBase = 200;
  triangleHeight = 100;

  pos = createVector(0,0)
  vel = createVector(0,0);
  accel = createVector(0,0);

  ball = new KineticMass(pos,vel,accel,10,'red');
  //ball.outline = color('rgba(255, 0, 0, 1)');
  ball.limit = 2000;
  ball.tail = false;

}

function draw() {
  background(255);
  theta = angleSlider.value()*PI/180;
  triangleHeight = triangleBase*Math.tan(theta);
  drawTriangle()

  push();
  noStroke();
  fill('black');
  text('Ramp Angle: ' + round(angleSlider.value()) +  ' deg',20,30,150,90);
  pop();

  //translate(0,-triangleHeight/2);

  ball.update();
  ball.display();

}

function drawTriangle() {
  push();
  fill(200);
  translate(width/2-triangleBase/2,height/2+80);
  triangle(0,0,triangleBase,0,triangleBase,-triangleHeight);
  pop();
}
