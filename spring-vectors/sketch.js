


function setup() {

  canvas = createCanvas(500, 400);
  canvas.parent('sketch-holder');
  frameRate(30);
  //Spring(pos_, k_, m_, relaxedLength_, oscAmp_)
  spring = new Spring(createVector(10,height/2),30,5,250,.5,0);
  spring.rotation =0;

  dispv = new Arrow(start = new createVector(0,0),end = new createVector(0,0));
  dispv.showComponents = false;
  dispv.grab = false;
  dispv.drag = false;
  dispv.origin = new p5.Vector(0,0);

  velv = new Arrow(start = new createVector(0,0),end = new createVector(0,0));
  velv.showComponents = false;
  velv.grab = false;
  velv.drag = false;

  accelv = new Arrow(start = new p5.Vector(0,0),end = new p5.Vector(0,0));
  accelv.showComponents = false;
  accelv.grab = false;
  accelv.drag = false;
}

function draw() {
background(255);



spring.update();
spring.display();
push();
stroke(180);
line(260,0,260,height)
pop();

push();
translate(spring.xcent, spring.ycent);
rotate(spring.rotation);
translate(0,-50);
dispv.origin = spring.equilibrium;
dispv.target = spring.displacement;
dispv.color = color(20,20,230);
dispv.update();
dispv.display();
pop();


push();
translate(spring.xcent, spring.ycent);
rotate(spring.rotation);
translate(0,-10);
velv.origin = spring.displacement;
velv.target = spring.velocity.mult(70).add(spring.displacement);
velv.color = color(36, 156, 58);
velv.display();
pop();

push();
translate(spring.xcent, spring.ycent);
rotate(spring.rotation);
translate(0,+10);
accelv.origin = spring.displacement;
accelv.target = spring.acceleration.mult(20).add(spring.displacement);
accelv.color = color(230,20,230);
accelv.display();
pop();
}
