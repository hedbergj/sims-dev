

var img;
function preload() {
  carImage = loadImage("car.png");

}

function setup() {
  running = true;
  canvas = createCanvas(1000,1000);
  frameRate(20);
  onoff = createButton("Pause");
  onoff.position(width-100,50);
  onoff.class("sim-button blue slim");
  onoff.mousePressed(turnonoff);


  accelSlider = createSlider(-100, 100, 0);
  accelSlider.parent('sketch-holder');
  accelSlider.position(250, 40);
  accelSlider.style('width', '150px');
  accelSlider.class("sim-slider gray");


  velocity = createVector(0,0);
  acceleration = createVector(0,0);
  basePosition = createVector(0,250);

  bg = new movingBackground('cityStreet',basePosition,velocity,acceleration);

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







  positionGraph = new Graph(250,250,0,5,-100,100,8);
	positionGraph.showBorder = false;
	positionGraph.set_offset(20,00);

  positionPlot = new Plot([],0,0,200,1);
  positionPlot.pointSize = 1;

  velGraph = new Graph(250,250,0,5,-10,10,8);
	velGraph.showBorder = false;
	velGraph.set_offset(20,250);

  velPlot = new Plot([],0,200,0,1);
  velPlot.pointSize = 1;

  accelGraph = new Graph(250,250,0,5,-.5,.5,8);
	accelGraph.showBorder = false;
	accelGraph.set_offset(20,500);

  accelPlot = new Plot([],200,0,200,1);
  accelPlot.pointSize = 1;


  positionGraph.addPlot(positionPlot);
  velGraph.addPlot(velPlot);
  accelGraph.addPlot(accelPlot);



  positionGraph.xlabel = "";
  positionGraph.ylabel = "y";
  positionGraph.title = "y vs. time"
  velGraph.xlabel = "";
  velGraph.ylabel = "y-velocity";
  velGraph.title = "v vs. time"
  accelGraph.xlabel = "time (s)";
  accelGraph.ylabel = "y-acceleration";
  accelGraph.title = "a vs. time"
}

function draw() {
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
