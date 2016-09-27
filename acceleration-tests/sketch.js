
function setup() {
  createCanvas(800, 200);
  background(250);
  //choose random vectors for the balls initial motion
  startHeight = height/4;
  pos = createVector(50,startHeight)
  vel = createVector(5,0);
  accel = 0;
  gravity = createVector(0,10);
  //make the ball! It is an instance of the mover object
  badBall = new Mover_ORIG(pos,vel,accel,10,'red');
  badBall.outline = color('rgba(0, 0, 0, 0)');
  //frameRate(20);
  badBall.display();

  textSize(9);
  push();
  fill('black');
  noStroke();
  text(badBall.position.y.toFixed(2)-startHeight, badBall.position.x+20,badBall.position.y);
  pop();

  goodBall = new Mover_TRUE(createVector(200,startHeight),vel,accel,10,'green');
  goodBall.outline = color('rgba(0, 0, 0, 0)');
  goodBall.limit = 2000;
  goodBall.display();

  textSize(9);
  push();
  fill('black');
  noStroke();
  text(goodBall.position.y.toFixed(2)-startHeight, goodBall.position.x+20,goodBall.position.y);
  pop();

  //noLoop();
  frameRate(1);
}


function draw() {
  //background(255)
  stroke(20)
  line(0,startHeight,width,startHeight);


  //badBall.color = badBall.position.y * 255/height;
  //badBall.giveItAnAcceleration(createVector(0,1));
  badBall.applyForce(gravity);
  badBall.update();
  badBall.display();
  badBall.bounceEdges();

  push();
  fill('black');
  noStroke();
  text(badBall.position.y.toFixed(2)-startHeight, badBall.position.x+20,badBall.position.y);
  pop();

  //goodBall.color = goodBall.position.y * 255/height;
  //goodBall.giveItAnAcceleration(createVector(0,1));
  goodBall.applyForce(gravity);
  goodBall.update();
  goodBall.display();
  goodBall.bounceEdges();

  push();
  fill('black');
  noStroke();
  text((goodBall.position.y-startHeight).toFixed(2), goodBall.position.x+20,goodBall.position.y);
  pop();


  }

  function keyPressed() {
  if (keyCode === LEFT_ARROW) {

  } else if (keyCode === RIGHT_ARROW) {
    redraw();
  }
  }


  var Mover_ORIG = function(position, velocity, acceleration, mass, color){
    this.position = new createVector(position.x, position.y);
    this.velocity = new createVector(velocity.x, velocity.y);
    this.acceleration = new createVector(acceleration.x, acceleration.y);
    this.mass = mass;
    this.color = color;
    //size is proportional to mass
    this.size = this.mass;
    this.outline = 255;



  this.update = function(){

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.limit);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

  };

  this.display = function(){

    fill(this.color);
    stroke(this.outline);
    ellipse(this.position.x,this.position.y,this.size,this.size);

  };

  this.giveItAnAcceleration = function(accel){
    this.acceleration = (accel);
  }

  this.applyForce = function(force){
    var f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  };

  this.bounceEdges = function(){
    if(this.position.x < 0){
      this.velocity.x *= -1;
      this.position.x = 0;

    }
    if(this.position.x > width){
      this.velocity.x *= -1;
      this.position.x = width;
    }

    if(this.position.y < 0){
      this.velocity.y *= -1;
      this.position.y = 0;

    }
    if(this.position.y > height){
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }};


var Mover_TRUE = function(position, velocity, acceleration, mass, color){
  this.position = new createVector(position.x, position.y);
  this.velocity = new createVector(velocity.x, velocity.y);
  this.acceleration = new createVector(acceleration.x, acceleration.y);
  this.previousVel = new createVector(0,0);
  this.avgVel = new createVector(0,0);
  this.limit = 10000;
  this.mass = mass;
  this.color = color;
  //size is proportional to mass
  this.size = this.mass;
  this.outline = 255;

  this.tail = false;
  this.tailFill  = 'white';
  this.tailStroke = 'black';
  this.tailA = [];
  //sets up angular variables for rotations
  this.angle = 0;
  this.aVelocity = 0;
  this.aAcceleration = 0;



this.update = function(){
  if(this.tail === true){
    this.tailA.push(this.position.copy());
  }
  this.previousVel = this.velocity.copy();
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.limit);
  this.avgYVel = (this.previousVel.y+this.velocity.y)/2;
  this.avgXVel = (this.previousVel.x+this.velocity.x)/2;
  this.position.x += this.avgXVel;
  this.position.y += this.avgYVel;
  // this.avgVel.y = (this.previousVel.y+this.velocity.y)/2;
  // this.avgVel.x = (this.previousVel.x+this.velocity.x)/2;
  // this.position.add(this.avgVel);


  var hCut = 70;
  if(this.tailA.length > hCut){
    this.tailA = this.tailA.slice(-1 * hCut);
  }

  //handles angular momentum
  this.aVelocity += this.aAcceleration;
  this.angle += this.aVelocity;
};

this.display = function(){

  fill(this.color);
  stroke(this.outline);
  ellipse(this.position.x,this.position.y,this.size,this.size);

  if(this.tail === true){
    push();
   fill(this.tailFill);
   stroke(this.tailStroke);
    for(var i = 0; i < this.tailA.length; i++){
      ellipse(this.tailA[i].x,this.tailA[i].y,3,3);
    }
    pop();
  }
};

this.giveItAnAcceleration = function(accel){
  this.acceleration = (accel);
}

this.applyForce = function(force){
  var f = force.copy();
  f.div(this.mass);
  this.acceleration = f;
};
//Behaviors
this.wrapEdges = function() {

  if (this.position.x > width) {
    this.position.x = 0;
  }
  else if (this.position.x < 0) {
    this.position.x = width;
  }

  if (this.position.y > height) {
    this.position.y = 0;
  }
  else if (this.position.y < 0) {
    this.position.y = height;
  }
};
this.bounceEdges = function(){
  if(this.position.x < 0){
    this.velocity.x *= -1;
    this.position.x = 0;

  }
  if(this.position.x > width){
    this.velocity.x *= -1;
    this.position.x = width;
  }

  if(this.position.y < 0){
    this.velocity.y *= -1;
    this.position.y = 0;

  }
  if(this.position.y > height){
    overiny = this.position.y-height;
    // console.log('overiny: '+overiny);
    // console.log('vel: '+this.velocity.y);
    // console.log('accel: '+this.acceleration.y);
    vatheight = Math.sqrt(Math.pow(this.velocity.y,2)-2*this.acceleration.y*overiny);
    this.position.y = height;
    this.velocity.y = -1*vatheight;
  }
};

this.towardMouse = function(a){
  var mouse = new Vector(mouseX,mouseY);
  var dir = Vector.sub(mouse,this.position);
  dir.normalize();
  dir.mult(a);
  this.acceleration = dir;
};

}
