
var sideSlider;
var distance = 0;

function setup() {
  canvas=createCanvas(400 , 600);
  canvas.parent('sketch-holder');

  sideSlider = createSlider(3, 10, 3, 1);
  sideSlider.position(20,50);
  sideSlider.parent('sketch-holder');
  sideSlider.class("sim-slider red");

  radius = 120;
  speed = 100;

}

function draw() {
  background(255);
  sideCount = sideSlider.value();
  sideLength = 2*radius*Math.sin(2*PI/sideCount);
  whichSide = 1;


  push();
  translate(width*0.5, height*0.5);
  rotate(3*PI/2);
  polygon(0, 0, radius, sideCount);
  pop();



  if(distance < sideLength){
    distance = speed*frameCount/100;
  }

  else if (distance > sideLength){
    whichSide += 1;
    distance = 1;
  }

  //console.log(distance);

  push();
  translate(width*0.5, height*0.5);
  translate(0,-radius)
  rotate(whichSide*PI/sideCount)
  //rotate(PI/3)
  translate(distance,0)
  ellipse(0,0,10,10)
  pop();
}


function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
