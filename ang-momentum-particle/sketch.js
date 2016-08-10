var ballx = 200;
var bally = 0;
var ballz = 0;

function setup(){
  createCanvas(710, 400, WEBGL);
}

function draw(){
  background(200);
  pointLight(250, 250, 250, 100, 100, 0);
  ambientLight(100);
  //orbitControl();

  rotateY(-.2);
  camera(600,-200,2000);
  perspective(20 / 180 * PI, width/height, 0.1, 100);
  //generate coordinate axes
  axis();

    push();
    ambientMaterial('yellow');
    ballz = 1000-frameCount;
    translate(ballx,bally,ballz);
    sphere(20);
    pop();

    push();
    ambientMaterial('red');
    rotateZ(-PI/2);
    rotateX(Math.atan2(ballz,ballx));
    translate(0,-sqrt(Math.pow(ballx,2)+Math.pow(ballz,2))/2+10,0)
    cylinder(10,sqrt(Math.pow(ballx,2)+Math.pow(ballz,2))/2+10);
    translate(0,-sqrt(Math.pow(ballx,2)+Math.pow(ballz,2))/2+10,0);
    cone(30,30);
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
