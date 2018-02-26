var mic, fft;
var ybottompadding = 40;
var xleftpadding = 40;
var xlabel;
var ylabel;
var running=true;
var onoff;
var spectrum;

function setup() {
   canvas = createCanvas(windowWidth-100,400);
     onoff = createButton("start");
     onoff.mouseClicked(turnonoff);
     onoff.position(650,30);
     onoff.class("sim-button")

   xlabel = createP("Amplitude");
   xlabel.style("transform: rotate(-90deg);");
   ylabel = createP("Frequency");
   xlabel.position(-10,height/3);
   ylabel.position(.4*width, height-40);

   mic = new p5.AudioIn();
   mic.start();
   mic.amp(.1);
   fft = new p5.FFT(.5,1024);
   fft.setInput(mic);
   push();
   line(0,height-ybottompadding,width,height-ybottompadding);
   line(30,0,30,40);
   pop();
   frameRate(25);
   //noLoop();
}

function draw() {

   background(255);
   line(10,height-ybottompadding,width,height-ybottompadding);
   line(xleftpadding,0,xleftpadding,height-10);
   spectrum = fft.analyze();
   fill(20,180,20);
   translate(xleftpadding,0);
   beginShape();
   vertex(0, height-40)
   for (i = 1; i<spectrum.length; i++) {
    vertex(i*2, map(spectrum[i], 0, 255, height-ybottompadding, 0) );
   }
   endShape();
}

function turnonoff() {
  // and of course it's nice to be able to stop it if things get crazy
    if (!running){
      running = true;
      loop();
      onoff.html("stop");
      return
    }

    if (running){
      running = false;
      noLoop()
      onoff.html("start");
      return
    }

}
