
function setup() {

  canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');



  velocity = createVector(0,0);
  acceleration = createVector(0,0);
  basePosition = createVector(width/2,height/2);

  ball = new Mover(basePosition,velocity,acceleration,10,'white');
  ball.tail = true;
  ball.outline = 'black';
  ball.tailFill = ball.color;
  ball.tailStroke = 'rgba(0,0,0,0)';


  center = createVector(width/2,height/2)
  velVec = new Arrow(basePosition,p5.Vector.add(center,ball.velocity))
  velVec.color="green";
  velVec.grab = false;
  velVec.draggable = false;
  velVec.showComponents = false;
  velVec.width = 10;

  accelVec = new Arrow(basePosition,p5.Vector.add(center,ball.acceleration))
  accelVec.color="purple";
  accelVec.grab = false;
  accelVec.draggable = false;
  accelVec.showComponents = false;
  accelVec.width = 10;


}

function draw() {
  background(200);
  ball.wrapEdges();
  ball.giveItAnAcceleration(createVector(sin(frameCount/100)*cos(frameCount/80)*.005,-cos(frameCount/200)*.005));

  rectMode(CORNER);
  push();
  velVec.origin = ball.position;
  velVec.target = p5.Vector.add(ball.position,p5.Vector.mult(ball.velocity,40));
  velVec.update();
  velVec.display();
  pop();
  push();
  accelVec.origin = ball.position;
  accelVec.target = p5.Vector.add(ball.position,p5.Vector.mult(ball.acceleration,10000));
  accelVec.update();
  accelVec.display();
  pop();

  ball.update();
  ball.display();
}
