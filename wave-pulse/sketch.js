var xspacing = 5;    // Distance between each horizontal location
var w;                // Width of entire wave
var amplitude = 75.0; // Height of wave
var wavelength = 20;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
//var k = 1;
var k = 2*Math.PI/wavelength;
var omega = 0;
var yvaluesSum = [];

function setup() {

  frameRate(30);
  canvas = createCanvas(710, 400);
  canvas.parent('sketch-holder');
  w = width+12;

  dx = (TWO_PI / wavelength) * xspacing;
  yvalues1 = new Array(floor(w/xspacing));
  yvalues2 = new Array(floor(w/xspacing));
  yvalues1plus2 = new Array(floor(w/xspacing));


}

function draw() {
  background(255);

  t = millis()/1000;


  calcPulse(yvalues1,0,10,75);

  calcPulse(yvalues2,-100,-10,-75);

  sum = calcSum(yvalues1,yvalues2);
  renderWave(sum,color(0,0,0),2);
  renderWave(yvalues2,color(0,0,250),1);

  renderWave(yvalues1,color(250,0,0),1);




  push();
  strokeWeight(1);
  stroke(0);
  //line(0,height/2,width,height/2);
  pop();
}

function calcPulse(yvalues_,offset_,omega_,amplitude_) {

  x = 0;
  for (var i = 0; i < yvalues_.length; i++) {
    yvalues_[i] = amplitude_*Math.pow(Math.E, -Math.pow((k * (x+offset_) - omega_ * t),2));
    x+=dx;
  }

}


function calcSum(yvalues1_,yvalues2_) {

  x = 0;

  for (var i = 0; i < yvalues1_.length; i++) {
    yvaluesSum[i] = yvalues1_[i]+yvalues2_[i];
    x+=dx;
  }
  return yvaluesSum;
}

function renderWave(yvalues_,color_,weight_) {


  noFill();
  stroke(color_);
  strokeWeight(weight_)
  beginShape();
  for (var x = 0; x < yvalues_.length; x++) {
    curveVertex(x*xspacing, height/2+yvalues_[x]);
  }
  endShape();
}
