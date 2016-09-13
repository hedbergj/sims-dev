
function setup() {
  createCanvas(800, 500);
  background(250);
  //choose random vectors for the balls initial motion
  pos = createVector(50,200)
  vel = createVector(.1,0);
  accel = 0;
  //make the ball! It is an instance of the mover object
  ball = new Mover(pos,vel,accel,10,'red');
  ball.outline = color('rgba(255, 0, 0, 1)');
  ball.limit = 2000;
  //frameRate(20);
  //noLoop();
}


function draw() {

  //background(250);
  //update the position
  //ball.color = color('rgba(30, 200, 255, 1)');
  ball.color = ball.position.y * 255/height;
  //ball.applyForce(createVector(0,1));
  ball.giveItAnAcceleration(createVector(0,.1));
  ball.update();
  //make the ball bounce
  ball.bounceEdges();
  //display changes
  ball.display();
  //console.log(ball.velocity.mag());

  }

  function keyPressed() {
  if (keyCode === LEFT_ARROW) {

  } else if (keyCode === RIGHT_ARROW) {
    redraw();
  }
}
