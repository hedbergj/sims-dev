
var sketch = function(p) {

function preload() {
  carImage = loadImage("car.png");

}

p.setup = function() {
  running = true;
  var canvas = p.createCanvas(1000,1000);
  p.frameRate(20);
  onoff = p.createButton("Pause");
  onoff.position(p.width-100,50);
  onoff.class("sim-button blue slim");
  onoff.mousePressed(turnonoff);


  accelSlider = p.createSlider(-100, 100, 0);
  accelSlider.parent('sketch-holder');
  accelSlider.position(250, 40);
  accelSlider.style('width', '150px');
  accelSlider.class("sim-slider gray");


  velocity = p.createVector(0,0);
  acceleration = p.createVector(0,0);
  basePosition = p.createVector(0,250);

  p.bg = new movingBackground('cityStreet',basePosition,velocity,acceleration);

  center = createVector(width/2,height/2)
  velVec = new Arrow(center,p5.Vector.add(center,bg.velocity))
  velVec.color="green";
  velVec.grab = false;
  velVec.draggable = false;
  velVec.showComponents = false;

  accelVec = new Arrow(center,p5.Vector.add(center,bg.acceleration))
  accelVec.color="purple";
  accelVec.grab = false;
  accelVec.draggable = false;
  accelVec.showComponents = false;

imageMode(CENTER);

genbutton = createButton("STOP");
genbutton.mouseClicked(stopTheCar);
genbutton.position(450,30);
genbutton.class("sim-button blue");


    var plot2 = new GPlot(p);
		plot2.setPos(50, 50);
		plot2.setMar(0, 0, margins[2], margins[3]);
		plot2.setDim(panelDim);
		plot2.setAxesOffset(0);
		plot2.setTicksLength(-4);
		plot2.getXAxis().setDrawTickLabels(false);
		plot2.getYAxis().setDrawTickLabels(false);




}

p.draw = function() {
  //console.log(ball.velocity.y)
  background(255);

  bg.acceleration = createVector(-accelSlider.value()/1000,0);

   bg.update();
   bg.display();
   //console.log(bg.displacement);
   text('Change Acceleration: ',20,30,150,20);

  rectMode(CORNER);
  push();
  noStroke();
  fill('black');
  translate(0,70);
  push();

  text('Velocity: ' + round(-bg.velocity.x*10)/10,center.x,center.y-30,150,20);
  pop();

  velVec.target = p5.Vector.add(center,p5.Vector.mult(bg.velocity,-4));
  velVec.update();
  velVec.display();
  pop();
  push();
  translate(0,130);
  push();
  noStroke();
  fill('black');
  text('Acceleration: ' + accelSlider.value()/10,center.x,center.y-30,100,20);
  pop();
  accelVec.target = p5.Vector.add(center,p5.Vector.mult(bg.acceleration,-600));
  accelVec.update();
  accelVec.display();
  pop();

  image(carImage, center.x, center.y, 200, 200);



  positionGraph.drawBg(color(255),color(0));
  positionGraph.plotAll();
  //now during the draw function call these three functions
  positionGraph.plots[0].tpRecord((-bg.displacement.x),positionGraph);
  if(abs(bg.displacement.x) > positionGraph.y_max ){
    positionGraph.y_max *= 2;
    positionGraph.update();
  }

  velGraph.drawBg(color(255),color(0));
	velGraph.plotAll();
  //now during the draw function call these three functions
	velGraph.plots[0].tpRecord(-bg.velocity.x,velGraph);

  accelGraph.drawBg(color(255),color(0));
	accelGraph.plotAll();
  //now during the draw function call these three functions
	accelGraph.plots[0].tpRecord(-bg.acceleration.x,accelGraph);



}


function stopTheCar() {
  accelSlider.value(0);
  bg.velocity.x = 0;
  bg.velocity.y = 0;
}

function turnonoff() {
  // and of course it's nice to be able to stop it if things get crazy
  if (!running) {
    running = true;
    turnedOffByButton = false;
    loop();
    onoff.html("stop");
    return
  }

  if (running) {
    running = false;
    turnedOffByButton = true;
    noLoop()
    onoff.html("start");
    return
  }
}
}
