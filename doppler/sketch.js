var systems;
var img;
var button;
var x = 0;
var dx = .2;
var source;
var speedSlider


function setup() {
  createCanvas(800, windowHeight);
  systems = [];
  //frameRate(20);
  button = createButton('clear');
  button.position(5, 5);
  button.mousePressed(reset);
  button.addClass('sim-button');

  speedSliderLabel = createP("Speed");
  speedSliderLabel.position(50,100);
  speedSlider = createSlider(-10, 10, 0 ,1);
  speedSlider.position(50,120);
  speedSlider.class("sim-slider");

  source = new WaveletSystem(createVector(0,0));
  source.addWavelet();
}

function draw() {
  background(250);

  translate(200,height/2)
  noFill();


  source.run()
  if (frameCount%35==0){
  source.addWavelet();
  }

  x = x + speedSlider.value()*.03;
  push();
  fill(0);
  ellipse(width*.4,0,15,15);
  noStroke();
  text('observer',width*.38,-20)
  pop();

}



// A simple Wavelet class
var Wavelet = function(position) {

   this.position = position.copy();
   this.position.x + dx;
   this.lifespan = 700.0;
  this.radx=0;
  this.rady=0;
};

Wavelet.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Wavelet.prototype.update = function(){

  this.radx += 1;
  this.rady += 1;
  this.lifespan -= 1;
};

// Method to display
Wavelet.prototype.display = function () {
  stroke(30, 255*(this.lifespan/700));
  strokeWeight(2);
  noFill();
  //fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, this.radx, this.rady);
};

// Is the Wavelet still useful?
Wavelet.prototype.isDead = function () {
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var WaveletSystem = function (position) {
  this.origin = position.copy();
  this.Wavelets = [];
};

WaveletSystem.prototype.addWavelet = function () {
  pos = createVector(this.origin.x + x, this.origin.y);
  p = new Wavelet(pos);
  this.Wavelets.push(p);
};
WaveletSystem.prototype.clearthis = function (){
  this.Wavelets = [];
}
WaveletSystem.prototype.run = function () {
  for (var i = this.Wavelets.length - 1; i >= 0; i--) {
    var p = this.Wavelets[i];
    p.run();
    //d =  width*.4 - p.position.x ;
    //console.log(d)
    //if (p.radx == d){
      //background(100);
  //  }
    if (p.isDead()) {
      this.Wavelets.splice(i, 1);
    }
  }
};

// A subclass of Wavelet
function reset(){
  source.clearthis();
  speedSlider.value(0);
  x = 0;

}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
}
