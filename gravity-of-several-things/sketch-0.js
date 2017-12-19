
var movers = [];
var xavgPos = 0;
var yavgPos = 0;

var G = .01;
masses = [10,20]
gravity = 1;
xVelocities = [0,0];
yVelocities = [0,0];


function setup() {
  createCanvas(700, 700);
  locations = [[200,height/2],[300,height/2]]
  //frameRate(1)
//  noLoop()
  for (var i = 0; i < 2; i++) {
    movers[i] = new KineticMass(createVector(locations[i][0],locations[i][1]), createVector(xVelocities[i],yVelocities[i]),createVector(0,0),masses[i],126);
    // movers[i].tail = true;
    // movers[i].tailLength = 50;
    // movers[i].tailSpacing = 20;
  }
  totalMass = masses.reduce(add, 0);
  //movers[0].size = 20;
}

function add(a, b) {
    return a + b;
}

function draw() {
  background(51);

  update();

  for (var i = 0; i < movers.length; i++) {

    //movers[i].update();
    movers[i].display();
    //console.log(movers[0].velocity)
    //console.log(movers[1].velocity)
  }
  // xavgPos = 0;
  // yavgPos = 0;
  for (var i = 0; i < movers.length; i++) {
    xavgPos += movers[i].position.x * movers[i].mass
    yavgPos += movers[i].position.y * movers[i].mass
  }

  xavgPos = xavgPos/totalMass;
  yavgPos = yavgPos/totalMass;
  line(xavgPos-10,yavgPos,xavgPos+10,yavgPos)
  line(xavgPos,yavgPos-10,xavgPos,yavgPos+10)
   yavgPos = 0;
   xavgPos = 0;
  //console.log(xavgPos);
  //ellipse(xavgPos,height/2,20,20);
}


function calculateForces(){
  for (var i = 0; i < movers.length; i++) {
          var p = movers[i];
          p.acceleration.set(0,0,0)
          p.color = 'red';
          for (var j = 0; j < i; j++) {
              var p2 = movers[j];

              var d = p5.Vector.sub(p.position,p2.position);
              //console.log(d.mag());
              //var d = p.position.dist(p2.position);
              var norm = Math.sqrt(100 + d.magSq());
              //console.log(norm)
              var mag = gravity / (norm * norm * norm  );
              //console.log(mag);
              p.acceleration.sub(p5.Vector.mult(d,(mag * p2.mass)));
              //console.log('b'+d.mult(mag * p2.mass))
              //console.log(mag)
              p2.acceleration.add(p5.Vector.mult(d,(mag * p2.mass)));
              //console.log('af'+d.mult(mag * p.mass))
              //console.log(mag)
              p2.color = 'blue';
              //console.log(p2.acceleration);
              }
      }
      //console.log(movers[0].position)
}

function doPhysics(dt) {
    for (var i1 = 0; i1 < movers.length; i1++) {
        var p1 = movers[i1];
        p1.position.add(p5.Vector.mult(p1.velocity,(0.5 * dt)));
        //set(p1.c.add(p1.v.mul(0.5 * dt)));
    }

    calculateForces();

    for (var i2 = 0; i2 < movers.length; i2++) {
        var p2 = movers[i2];
        p2.velocity.add(p5.Vector.mult(p2.acceleration,dt));
        //p2.v.set(p2.v.add(p2.a.mul(dt)));
    }

    for (var i3 = 0; i3 < movers.length; i3++) {
        var p3 = movers[i3];
        p3.position.add(p5.Vector.mult(p3.velocity,(0.5*dt)));
        //p3.c.set(p3.c.add(p3.v.mul(0.5 * dt)));

    }
    //do_collisions();
}


function update(){
  for (var k = 0; k < 4; k++) { // increase the greater than value to increase simulation step rate
      doPhysics(1.0 / 4); // increase the divisor to increase accuracy and decrease simulation speed
  }
}

















KineticMass.prototype.calculateAttraction = function(m){

// Calculate direction of force
//var force = p5.Vector.sub(this.position, m.position);
var distanceXcomp = this.position.x-m.position.x;
var distanceYcomp = this.position.y-m.position.y;
//var forceXcomp =
var distance = sqrt(Math.pow(distanceXcomp,2)+ Math.pow(distanceYcomp,2));

if (distance > 1){
var strength = (G * this.mass * m.mass) / (distance * distance);
}
else strength = 0;

// Get force vector --> magnitude * direction
//force.mult(strength);
dir = Math.atan2(distanceYcomp,distanceXcomp);
force = createVector(strength*Math.cos(dir),strength*Math.sin(dir));

return force;

}
