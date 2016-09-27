
function setup() {
  createCanvas(800, 200);
  background(250);
  //choose random vectors for the balls initial motion
  pos = createVector(50,height/4)
  vel = createVector(5,0);
  accel = 0;
  //make the ball! It is an instance of the mover object
  ball = new KineticMass(pos,vel,accel,10,'red');
  ball.outline = color('rgba(255, 0, 0, 1)');
  ball.limit = 2000;
  //frameRate(20);
  ball.display();
  // console.log('ypos' + ball.position.y);
  // console.log('xpos' + ball.velocity.y);
  //noLoop();
  textSize(8);
}


function draw() {
  line(0,height/4,width,height/4);
  //background(250);
  //update the position
  //ball.color = color('rgba(30, 200, 255, 1)');
  ball.color = ball.position.y * 255/height;
  //ball.applyForce(createVector(0,21.5));
  ball.giveItAnAcceleration(createVector(0,1));



  ball.update();
  //make the ball bounce
  //display changes
  ball.display();
  // console.log('before bounce y pos: ' + ball.position.y);
  // console.log('before bounce y speed: ' + ball.velocity.y);
  ball.bounceEdges();

  push();
  fill('black');
  noStroke();
  text(ball.velocity.y.toFixed(2), ball.position.x+20,ball.position.y);
  pop();
  // console.log('after bounce y pos: ' + ball.position.y);
  // console.log('after bounce y speed: ' + ball.velocity.y);


  }

  function keyPressed() {
  if (keyCode === LEFT_ARROW) {

  } else if (keyCode === RIGHT_ARROW) {
    redraw();
  }
  }
