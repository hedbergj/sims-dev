// This is a quick thing to make a maxwell's demon game.

// this sets up the little balls.
//var Molecules = [];
var Molecules;
var Walls;
var MARGIN = 40;
function setup() {
  createCanvas(640, 360);
  frameRate(30);
//  reset();



  Molecules = new Group();
  Walls = new Group();


  for(var i=0; i<20; i++)
  {
  var mol = createSprite(random(0,width),random(0,height));
  //mol.addAnimation("normal", "assets/asterisk_circle0006.png",  "assets/asterisk_circle0008.png");
  mol.draw = function() { fill(0); ellipse(0,0,10,10);}
  mol.setCollider("circle", 0,0,5);
  mol.setSpeed(random(2,3), random(0, 360));
  mol.scale = 1;
  mol.mass= mol.scale;
  Molecules.add(mol);
  }

  var topWall = createSprite(0,0)
  topWall.draw = function() {fill(100); rect(width/2,mouseY-150,10,300);}
  topWall.setCollider("rectangle", 0,0, 10,300);
  //topWall.immovable = true;
  var bottomWall = createSprite(0,0)
  bottomWall.draw = function() {fill(100); rect(width/2,mouseY+200,10,300);}
  bottomWall.setCollider("rectangle", 0,0, 10,300)
  bottomWall.immovable = true;
  Walls.add(bottomWall);
  Walls.add(topWall);
}

function draw() {
  background(256);


  //wall.display();


  textSize(32);
  fill(250, 0, 0);
  text("hot", width/4, 60);
  fill(0,0,250);
  text("cold",3*width/4,60);


  stroke(150);
  noFill();
  rect(0,0,640,360);

  Molecules.bounce(Molecules);
  Molecules.bounce(Walls);

  for(var i=0; i<allSprites.length; i++) {
    var s = allSprites[i];
    if(s.position.x<0) {
      s.position.x = 1;
      s.velocity.x = abs(s.velocity.x);
    }

    if(s.position.x>width) {
      s.position.x = width-1;
      s.velocity.x = -abs(s.velocity.x);
      }

    if(s.position.y<0) {
      s.position.y = 1;
      s.velocity.y = abs(s.velocity.y);
    }

    if(s.position.y>height) {
      s.position.y = height-1;
      s.velocity.y = -abs(s.velocity.y);
      }
    }
drawSprites();

}
