var planet;
var Orbiters = [];
var Trails = [];
var mass;
var h;
var c;
var count;
var instructions;
var diagram;
function preload() {
  diagram = loadImage("earth-cannon.png");
}

function setup(){
  createCanvas(640, 640);
  frameRate(30);
  planet = ellipse(width/2,height/2,40,40);
imageMode(CENTER);
  mass = 400;
  h = 165;
  c = 0;
  count = 0;
  instructions = createDiv('')
  instructions.position(40,20)
  instructions.html('<p>Press c to clear all orbiters</p>' );

}



function draw(){
  count++;
  background(240);
  image(diagram,width/2,height/2)


  ds = distance(createVector(mouseX, mouseY),createVector(width/2, height/2 - 60));
  push();
  if (abs(mouseY - ((height/2)-h)) < 3){
    stroke(250, 10, 10,250-(count/3));
  }
  else{
  stroke(20, 20, 20,100-count);
}
  strokeWeight(2);
  line(width/2, height/2 - h, mouseX, mouseY);
  pop();
  fill(150);
  noStroke();
  //image(planet, width/2-60, height/2-60);
  for (i = Orbiters.length-1; i >= 0; i--){
    a = Orbiters[i];
    a.drawOrbiter();
    dis = distance(a.position, createVector(width/2, height/2));
    if ( dis < 140 || dis > 2000){
      Orbiters.splice(i,1);
    }
  }
  for (var i = Trails.length-1; i >= 0; i--) {
    var p = Trails[i];
    p.run();
    if (p.isDead()) {
      //remove the particle
      Trails.splice(i, 1);
    }
  }
}

function distance(pos, pos2){
  return sqrt(((pos.x-pos2.x)*(pos.x-pos2.x))+((pos.y-pos2.y)*(pos.y-pos2.y)));
}

 grav = function(pos){
   direction = createVector(width/2 - pos.x, height/2 - pos.y);
   direction.normalize();
   d = distance(pos, createVector(width/2, height/2));
   direction.mult(mass/(d*d));
   return direction;
 }


  var Orbiter = function(px, py, vx, vy){
  this.position = createVector(px, py);
  this.velocity = createVector(vx/100, vy/100);
  }

Orbiter.prototype.drawOrbiter = function(){
    this.gravity = grav(this.position);
    this.velgrav = this.velocity;
    this.velgrav.add(this.gravity);
    this.position.add(this.velgrav);
    fill(30,200,30)
    ellipse(this.position.x, this.position.y, 10, 10);

      c++
      if(c % 5 == 0){
      Trails.push(new Particle(createVector(this.position.x, this.position.y)));
      }
  }


function mousePressed(){

  Orbiters.push(new Orbiter(width/2, height/2 - h, mouseX - width/2, mouseY - (height/2 - h)));

}

function mouseMoved() {
  count = 0;
}

function keyTyped(){
 if (key === 'c'){
    for ( i = Orbiters.length-1; i >= 0; i--){
      Orbiters.splice(i,1);
    }
    for ( i = Trails.length-1; i >= 0; i--){
      Trails.splice(i,1);
    }
  }
}
