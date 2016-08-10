var ballx = 200;
var bally = 0;
var ballz = 0;

function setup(){
  createCanvas(710, 400, WEBGL);
}

function draw(){
  background(200);
  pointLight(250, 250, 250, 100, 100, 0);

  orbitControl();

  rotateY(-.2);
  camera(600,-200,2000);
  perspective(20 / 180 * PI, width/height, 0.1, 100);
  //generate coordinate axes
  axis();

    push();
    ambientMaterial(200);
    ballz = 1000-frameCount;
    translate(ballx,bally,ballz);
    sphere(20);
    pop();

    push();
    cylinder(10,20);
    pop();
}

function axis(){
  push();
  rotateX(0);
  rotateY(0);
  rotateZ(0);
  ambientMaterial('red');
  cylinder(5, 500);
  pop();

  push();
  rotateX(HALF_PI);
  //rotateY(90);
  //rotateZ(0);
  ambientMaterial('green');
  cylinder(5, 1000);
  pop();

  push();
  rotateX(0);
  rotateY(0);
  rotateZ(HALF_PI);
  ambientMaterial('blue');
  cylinder(5, 500);
  pop();

}
