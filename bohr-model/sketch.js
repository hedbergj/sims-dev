var xspacing = 2;    // Distance between each horizontal location
var w;                // Width of entire wave
var amplitude = 75.0; // Height of wave
var period = 200.0;   // How many pixels before the wave repeats
var dx;
var theta=0;
var thetaSpacing = .1;
var dtheta               // Value for incrementing x
var yvalues;
var xvalues;
var rvalues;      // Using an array to store height values for the wave
var nSlider;
var phase;
var nLabel;
var radius;
var n=1;
var omega = 1;

function setup() {
angleMode(RADIANS)
  frameRate(20);
  canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');
  w = width+12;

  //dtheta = (TWO_PI / period) * thetaSpacing;
  //rvalues = new Array(floor(w/thetaSpacing));
  rvalues = new Array(floor(TWO_PI/thetaSpacing)+4);
  //rvalues = new Array(8);
  nSlider = createSlider(1, 20, 1);
  nSlider.elt.step =.5;
  nSlider.position(300,50);
  nSlider.class("sim-slider gray");

  nLabel = createP();
  nLabel.position(300,0);
  nLabel.parent('sketch-holder');
  radius = 100;
  dtheta = thetaSpacing;
}

function draw() {
  background(255);

  //t = millis()/1000;
  t = frameCount/10;
  n = nSlider.value();
  //dtheta = .1;

  calcWave(0);
  renderWave(color(250,0,0),1);
  push();
  stroke(250,100,100)
  noFill();
  ellipse(width/2,height/2,radius*2,radius*2)
  pop()


  nLabel.html('n: '+ n);

}

function calcWave(phase_) {
theta = 0
  //var theta = theta;

  for (var i = 0; i < rvalues.length; i++) {
    //rvalues[i] = radius+(10*(Math.sin((n)*theta+omega*t)+Math.sin((n)*theta-omega*t)));//sin(x+phase_)*amplitude;
    rvalues[i] = radius+10*Math.sin(n*theta)*Math.cos(omega*t)
    theta+=dtheta;
  }
}

function renderWave(color_,weight_) {
  theta=0;
  push()
  noFill();
  stroke(color_);
  strokeWeight(weight_)
  translate(width/2,height/2)
  beginShape();
  for (var x = 0; x < rvalues.length; x++) {
    curveVertex(rvalues[x]*Math.cos(theta), rvalues[x]*Math.sin(theta));
    theta+=dtheta;
  }
  endShape();
  pop()

}
