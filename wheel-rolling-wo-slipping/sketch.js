var Trails=[];
function setup(){
    createCanvas(windowWidth,400);
    w = new wheel(100,height/2,100);
    w.rotate = true;

    w.cdecorate = false;
    w.vdecorate = false;
    w.rotation = true;
    w.translation = false;
    w.rimColor = color('rgba(0,0,0,1)');
    w.spokeColor = color('rgba(0,0,0,1)');
    w.wheelColor = color('rgba(0,0,0,.1)');

    radio = createRadio();
    radio.parent('sketch-holder');
    radio.position(0,20);
    radio.option('# = 1', 1);
    radio.option('# = 2', 2);
    radio.option('# = 3', 3);
    radio.changed(refresh);
    radio.value(1);
    radio.class('sim-radio ');

    for (i=0;i<radio.value();i++){
    w.arrowDecorations[i] = {type: 'velocity', location_radial: 1/(1+i), rimPos: 0 ,trails: true};
    }
    w.addDecorations(w.arrowDecorations);


    // w.arrowDecorations[2] = {type: 'velocity', location_radial: 1, rimPos: HALF_PI };
    // w.arrowDecorations[3] = {type: 'velocity', location_radial: .5, rimPos: HALF_PI };
    // w.arrowDecorations[4] = {type: 'velocity', location_radial: 1, rimPos: PI };
    // w.arrowDecorations[5] = {type: 'velocity', location_radial: .5, rimPos: PI };
    // w.arrowDecorations[6] = {type: 'velocity', location_radial: 1, rimPos: 3*HALF_PI };
    // w.arrowDecorations[7] = {type: 'velocity', location_radial: .5, rimPos: 3*HALF_PI };


    on = true;


    //create controls for sketch
    translate_speed = createSlider(-5,5,0,.2);
    translate_speed.position(20,100)
    translate_speed.parent('sketch-holder')
    translate_speed.class("sim-slider");

    btn_pause = createButton('Pause');
    btn_pause.position(20,70);
    btn_pause.mouseClicked(ptoggle);
    btn_pause.parent('sketch-holder');
    btn_pause.class("sim-button slim");




}
function draw(){
    background(255);
    //drawAxes();
    push()
    fill(200);
    noStroke();
    rect(0,w.r+height/2,width,height);
    pop();
    //draw text for controls
    //text('Translation Speed',width/2,40);


    w.draw();
    //get speed from slider

    if(w.x-w.r > width) w.x = -w.r;
    w.x += translate_speed.value();
    w.trans_speed = translate_speed.value();
    w.ang_speed = w.trans_speed / w.r;
    if(frameCount % 5 == 0){
      for(i=0;i<w.arrowDecorations.length;i++){
        Trails.push(new Particle(createVector(w.x-w.arrowDecorations[i].location_radial*w.r*Math.sin(w.ang), w.y+w.arrowDecorations[i].location_radial*w.r*Math.cos(w.ang))));
      }
    }

    for (var i = Trails.length-1; i >= 0; i--) {
      var p = Trails[i];
      p.run();
      if (p.isDead()) {
        //remove the particle
        Trails.splice(i, 1);
      }
    }
}
function ptoggle(){
    if(on == true){
        on = false;
        noLoop();
        btn_pause.html('Play');
    }
    else{
        on = true;
        loop();
        btn_pause.html('Pause');
    }
}

var Particle = function(position) {
  this.acceleration = createVector(0, 0.0);
  //this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.velocity = createVector(0,0);
  this.position = position.copy();
  this.lifespan = 1000.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 1;
};

// Method to display
Particle.prototype.display = function() {
  push();
  noStroke()
  fill(80, this.lifespan);
  ellipse(this.position.x, this.position.y, 2,2);
  pop();
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0.0) {
      return true;
  } else {
    return false;
  }
};

function refresh(){
  clear();
  w.arrowDecorations = [];
  for (i=0; i<radio.value(); i++){
  w.arrowDecorations[i] = {type: 'velocity', location_radial: 1/(1+i), rimPos: 0 ,trails: true};
  }
  w.addDecorations(w.arrowDecorations);

}
