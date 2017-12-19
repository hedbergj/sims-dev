var freq1; // this is the oscillator we will hear
var modulator; // this oscillator will modulate the amplitude of the carrier
var fft; // we'll visualize the waveform
var tone1button;
var tone1ampslider;
var tone2ampslider;
var tone1input;
var tone2input;
var running = false;
var onoff;

function setup() {
  createCanvas(800,400);

  onoff = createButton("start");
  onoff.mouseClicked(turnonoff);
  onoff.position(650,30);
  onoff.class("pure-button")

  tone1 = createButton("tone1");
  tone2 = createButton("tone2");
  tone1.class("pure-button");
  tone2.class("pure-button");
  tone1.position(150,30);
  tone2.position(450,30);

  tone1input = createInput(440);
  tone2input = createInput(441);
  tone1input.position(100,30);
  tone2input.position(400,30);
  tone1input.attribute("type", "numeric");
  tone2input.attribute("type", "numeric");

  tone1.mouseClicked(settone1);
  tone2.mouseClicked(settone2);

  tone1ampslider = createSlider(0,.5,.01);
  tone1ampslider.elt.step = 0.01;
  tone2ampslider = createSlider(0,.5,.01);
  tone2ampslider.elt.step = 0.01;
  tone1ampslider.position(100,80);
  tone2ampslider.position(400,80);

  frameRate(19);

  freq1 = new p5.Oscillator('sine');
  //freq1.disconnect();
  freq1.amp(0); // set amplitude
  freq1.freq(440); // set frequency

  //freq1.start(); // start oscillating

  freq2 = new p5.Oscillator('sine');
  //freq2.disconnect();
  freq2.amp(0); // will map to mouseX
  freq2.freq(441); // will map to mouseY
  //freq2.start();

  // multiply the modulator's output (amplitude ranges from -1 to 1) by 100, then add 200
  //carrier.freq( modulator.mult(400).add(100) );

  // create an fft to analyze the audio
  fft = new p5.FFT(.8,1024);
  noLoop();
}

function draw() {
  background(250);


  freq1.amp(tone1ampslider.value(),.01);
  freq2.amp(tone2ampslider.value(),.01);
  // analyze the waveform
  waveform = fft.waveform();

  // draw the shape of the waveform
  stroke(10);
  noFill();
  //strokeWeight(10);
  beginShape();
  for (var i = 0; i<waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], -1, 1, -height/2, height/2);
    vertex(x, y + height/2);
  }
  endShape();
}
function mouseClicked(){
  //freq1.stop();
  //freq2.stop();
}

function settone1(){
  var f1 = Number(tone1input.value());
  freq1.freq(f1,.1);

}
function settone2(){
  var f2 = Number(tone2input.value());
  freq2.freq(f2,.1);

}

function turnonoff() {
  // and of course it's nice to be able to stop it if things get crazy
    if (!running){
      running = true;
// freq1.connect();
// freq2.connect();
freq1.start(.1);
freq2.start(.1);

      freq1.amp(Number(tone1input.value()),.15);
      freq2.amp(Number(tone2input.value()),.15);
      loop();
      onoff.html("stop");
      return
    }

    if (running){
      running = false;
      freq1.amp(0,.15);
      freq2.amp(0,.15);
      freq1.stop(.3);
      freq2.stop(.3);

//freq1.disconnect();
//freq2.disconnect();
      noLoop()
      onoff.html("start");
      return
    }

}
