let aswatch;
let mousePos;
let hue;
function setup() {

  canvas = createCanvas(.9*windowWidth,.9*windowHeight)
  canvas.parent('sketch-holder');
  colorMode(HSB)
mousePos = createVector(mouseX,mouseY)
aswatchRed = new Draggable(width/2,.3*height,0,0);
aswatchBlue = new Draggable(.33*width,height/2,210,240);
aswatchYellow = new Draggable(.66*width,height/2,62,120);

}

function draw() {

  background(255);
  noStroke()
  //translate(width/2,height/2)
  // fill(color(0,100,100,.5))
  // circle(width/2,height/2,200)
  // fill(color(200,100,100,.5))
  // circle(mouseX,mouseY,200)
//  mousePos = createVector(mouseX,mouseY)
  aswatchRed.update();
  aswatchRed.over();
  aswatchRed.show();
  aswatchBlue.update();
  aswatchBlue.over();
  aswatchBlue.show();
  aswatchYellow.update();
  aswatchYellow.over();
  aswatchYellow.show();
}

class Draggable {
  constructor(xPos,yPos,hue,tabRot) {

    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.tabRotRad = tabRot*PI/180;

    this.position = createVector(xPos,yPos);
    this.r = 300;
    this.offset = createVector(0,0)
    this.hue = hue;
    this.tabposition = createVector(this.position.x+this.r/2*sin(this.tabRotRad),this.position.y-this.r/2*cos(this.tabRotRad))
    console.log(this.tabRotRad)
  }

  over() {
    // Is mouse over object

    //console.log(this.position.dist(mousePos));
    if (this.tabposition.dist(mousePos) < this.r/5) {
      this.rollover = true;
      //console.log('over')
    } else {
      this.rollover = false;
    }

  }

  update() {
    //console.log('update')

    mousePos.x = mouseX
    mousePos.y = mouseY
    // Adjust location if being dragged
    if (this.dragging) {
      // this.position
      console.log('should be dragging')
      this.position.x = mousePos.x + this.offset.x;
      this.position.y =  mousePos.y + this.offset.y;
      this.tabposition.x = this.position.x+this.r/2*sin(this.tabRotRad)
      this.tabposition.y = this.position.y-this.r/2*cos(this.tabRotRad)
    }

  }

  show() {

    noStroke();
    // Different fill based on state
    if (this.dragging) {
      fill(color(this.hue,80,100,1));
    } else if (this.rollover) {
      fill(color(this.hue,100,100,.5));
    } else {
      fill(color(this.hue,100,100,.5));
    }
    circle(this.position.x, this.position.y, this.r);

      push()
      translate(this.position.x,this.position.y)
      rotate(this.tabRotRad)
      translate(0,-this.r/2)
      arc(0, 0,50, 50, PI-.1,0+.1,PIE );
      pop()
  }

  pressed() {
    // Did I click on the rectangle?
    if (this.tabposition.dist(mousePos) < this.r/5) {
      this.dragging = true;
      console.log('you pressed it')

      //this.offset = this.posi
      this.offset.x = this.position.x-mouseX
      this.offset.y = this.position.y-mouseY
      console.log(this.offset)
      // If so, keep track of relative location of click to corner of rectangle
      //this.offsetX = this.position.x - mouseX;
      //this.offsetY = this.position.y - mouseY;
    }
    console.log(this.dragging)
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}

function mousePressed() {
  aswatchRed.pressed();
  aswatchBlue.pressed();
  aswatchYellow.pressed();

  console.log(mousePos)
}

function mouseReleased() {
  // Quit dragging
  aswatchRed.released();
  aswatchBlue.released();
  aswatchYellow.released();

}
