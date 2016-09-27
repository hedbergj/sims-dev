

function setup() {
  createCanvas(800, 500);
  background(250);
  //choose random vectors for the balls initial motion
  pos = createVector(0,0);
  vel = createVector(0,0);
  accel = createVector(0,0);
  //make the ball! It is an instance of the Mass object
  ball = new KineticMass(pos,vel,accel,10,'red');
  gravity = createVector(0,0)
  rotSlider = createSlider(-45, 45, 0);
  rotSlider.parent('sketch-holder');
  rotSlider.position(20, 60);
  rotSlider.style('width', '150px');
  mus = .1;
  muk = .05;
  g = 2;
  netForce= createVector(0,0)
}


function draw() {

  background(250);
  //update the position
  thetaRadians = rotSlider.value()*PI/180;
  translate(width/2,height/2)
  rotate(thetaRadians);
  stroke(0);
  line(-width,0,width,0)
  fstaticMax = mus*ball.mass*Math.cos(thetaRadians);
  calcNetForce();
  checkIn();
  ball.applyForce(netForce);
  ball.update();
  //console.log(thetaRadians);
  //make the ball bounce
  //ball.wrapEdges();
  //display changes
  ball.display();
  }
function calcNetForce(){
  if(Math.abs(g*thetaRadians) > fstaticMax){
    netForce = createVector(g*thetaRadians,0);
  }
  else {
    netForce = createVector(0,0);
  }

}
function checkIn(){
  if (ball.position.x>width/2){
    ball.position.x= -width
  }
}
