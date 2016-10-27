// This is a quick thing to make a maxwell's demon game.

// this sets up the little balls.
var Molecules = [];






function setup() {
  createCanvas(640, 360);
  frameRate(30);
  reset();

  hole = new Hole(width/2,height/2);
  wall = new Wall();
}

function draw() {
  background(256);


  //wall.display();

  door = new SlidingDoor();
  door.display();

  textSize(32);
  fill(250, 0, 0);
  text("hot", width/4, 60);
  fill(0,0,250);
  text("cold",3*width/4,60);

  for (var i = 0; i < Molecules.length; i++) {


    Molecules[i].update();
    Molecules[i].display();
    Molecules[i].bounceEdges();
	  Molecules[i].calcVels(i);

  }

  stroke(150);
  noFill();
  rect(0,0,640,360);


}


function mousePressed() {
  //reset();
}

// Restart all the Molecule objects randomly
function reset() {
  for (var i = 0; i < 10; i++) {
    Molecules[i] = new Molecule(1, random(0,width), random(i,height),3);
  }
  for (var i = 10; i < 20; i++) {
    Molecules[i] = new Molecule(1, random(0,width), random(i,height),1);
  }
}


function Wall(){
	this.position = createVector(width/2,height/2)
}


Wall.prototype.display = function() {
  noStroke();
  fill(40);
  rect(width/2-3,0,6,mouseY-15);
  rect(width/2-3,mouseY + 15,6,height);
};

function SlidingDoor() {

  this.display = function() {
    push();
    noStroke();
    fill(40);
    rect(width/2-3,0,6,mouseY-15);
    rect(width/2-3,mouseY + 15,6,height);
    pop();
  }

}

function Hole(x,y){
	this.position = createVector(width/2,height/2)
}

Hole.prototype.display = function() {
  stroke(0);
  strokeWeight(0);
  fill(90);
  this.position.y = mouseY-15;
  rect(width/2-5, this.position.y ,10,30);
};


function Molecule(m,x,y,speedMultiplier) {
  this.xvel = .1*speedMultiplier*random(3,10);
  this.yvel = .1*speedMultiplier*random(-10,10);
  this.mass = m;
  this.size = m*13;
  this.position = createVector(x,y);
  this.velocity = createVector(this.xvel,this.yvel);
  this.acceleration = createVector(0,0);
}



Molecule.prototype.update = function() {

  this.position.add(this.velocity);

};

Molecule.prototype.calcVels = function(i){
	this.speed = this.velocity.mag();//Math.sqrt(this.xvel*this.xvel)+(this.yvel*this.yvel);
	noStroke();
	fill(40);
	textSize(20);
	if (this.position.x < width/2) {
		leftAverage = this.speed;
	}
}

Molecule.prototype.display = function() {
  stroke(0);
  strokeWeight(2);
  this.speed = this.velocity.mag();//Math.sqrt(this.xvel*this.xvel)+(this.yvel*this.yvel);
  if (this.speed > 2){fill(250,0,0);}
  if (this.speed < 2){fill(0,0,250);}
  ellipse(this.position.x,this.position.y,this.size,this.size);
};

Molecule.prototype.bounceEdges = function(){
  if(this.position.x < 0+this.size/2){
    this.velocity.x *= -1;
    this.position.x = 0+this.size/2;

  }
  if(this.position.x > width-this.size/2){
    this.position.x = width-this.size/2;
    this.velocity.x *= -1;
  }

  if(this.position.y < 0+this.size/2){
    this.position.y = this.size/2;
    this.velocity.y *= -1;


  }
  if(this.position.y > height-this.size/2){
    this.position.y = height-this.size/2;
    this.velocity.y *= -1;
  }
  if ((this.position.x > width/2-this.size/2 && this.position.x < width/2+this.size/2)
     && (this.position.y < mouseY+this.size/2 - 15 || this.position.y > mouseY+this.size/2+15)){
      
  	this.velocity.x *= -1;
  }



};
