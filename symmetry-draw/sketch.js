let symmetry = 8;

let angle;
let saveButton, clearButton, mouseButton, keyboardButton;
let symmetryCountSlider;
let strokeColor;
let mirror = true;
let theme = [[70,12,140,'#46788C'],[242, 184, 75,'#F2B84B'],[217, 173, 119,'#D9AD77'],[242, 127, 27,'#F27F1B'],[217, 75, 24,'#D94B18'],[0,0,0,'#000000'],[1,1,1,'#ffffff']]
let alphas = ['ff','dd','cc','44','22']

let mean = 0
let sd = .5
function setup() {
  canvas = createCanvas(windowWidth, windowHeight*.9);
  canvas.parent('sketch-holder')
  angleMode(DEGREES);
  background(255);

  strokeColor = theme[0][3]
  palatte = createDiv()
  palatte.parent('sketch-holder')
  palatte.position(10,15)

  symSelectPicker = createDiv()
  symSelectPicker.id('symSelectPicker')
  //radios.class('radio-toolbar');
  symSelectPicker.parent('sketch-holder')
  //symSelectPicker.position(width*.5,height*.05)
  // Creating the clear screen button


  checkbox = createCheckbox('mirror?', true);
  checkbox.parent('sketch-holder')
  checkbox.changed(switchMirror);
  checkbox.position(theme.length*63+20,15)
  checkbox.class('mirrorCheck')
  const box = checkbox.elt.getElementsByTagName('input')[0];
box.style.width = '50px';
box.style.height = '50px';

  clearButton = createButton('clear');
  clearButton.mousePressed(clearScreen);
  clearButton.class('square')
  clearButton.parent('sketch-holder')

  // greenButton = createButton(1)
  // greenButton.style('background', theme[0][3])
  // greenButton.mousePressed(function() { changeStroke(theme[0][3]);})
  // greenButton.parent(palatte)
  // greenButton.class('swatch')
  //
  // brownButton = createButton(2)
  // brownButton.style('background', theme[1][3])
  // brownButton.mousePressed(function() { changeStroke(theme[1][3]);});
  // brownButton.parent(palatte)
  // brownButton.class('swatch')
  //
  // yellowButton = createButton(3)
  // yellowButton.style('background', theme[2][3])
  // yellowButton.mousePressed(function() { changeStroke(theme[2][3]);});
  // yellowButton.parent(palatte)
  // yellowButton.class('swatch')
  //
  // redButton = createButton(4)
  // redButton.style('background', theme[3][3])
  // redButton.mousePressed(function() { changeStroke(theme[3][3]);});
  // redButton.parent(palatte)
  // redButton.class('swatch')
  //
  // blueButton = createButton(5)
  // blueButton.style('background', theme[4][3])
  // blueButton.mousePressed(function() { changeStroke(theme[4][3]);});
  // blueButton.style('color', 'white')
  // blueButton.parent(palatte)
  // blueButton.class('swatch')
  //
  // blackButton = createButton(6)
  // blackButton.style('background', theme[5][3])
  // blackButton.mousePressed(function() { changeStroke(theme[5][3]);});
  // blackButton.style('color', 'white')
  // blackButton.parent(palatte)
  // blackButton.class('swatch')
  //
  // purpleButton = createButton(7)
  // purpleButton.style('background', theme[6][3])
  // purpleButton.mousePressed(function() { changeStroke(theme[6][3]);});
  // purpleButton.style('color', 'white')
  // purpleButton.parent(palatte)
  // purpleButton.class('swatch')


  saveButton = createButton('save');
  saveButton.mousePressed(saveFile);
  saveButton.class('square')
  saveButton.parent('sketch-holder')





  for (i = 0; i<7; i++){
    makeButton(i,1,'white',i)
  }
    makeSymSelectButton('sym0',1,'sym0')
    makeSymSelectButton('sym4',4,'sym4')
    makeSymSelectButton('sym8',8,'sym8')
    makeSymSelectButton('sym16',16,'sym16')
    makeSymSelectButton('sym32',32,'sym32')
}

function refresh(){
    redraw();
}
// Clear Screen function
function clearScreen() {
  background(255);
}
function makeSymSelectButton(name,symCount,id){
  name = createButton(name)
  name.class('symSelectButton')
  name.id(id)
  name.parent(symSelectPicker)
  name.mousePressed(function() { symmetry=symCount;});

}

function makeButton(name,themeNo,color,count){
  name = createButton(count)
  name.style('background', theme[count][3])
  name.touchEnded(function() { changeStroke(theme[count][3]);});
  name.mousePressed(function() { changeStroke(theme[count][3]);});
  name.parent(palatte)
  name.class('swatch')

}

function changeStroke(arg) {
  strokeColor = arg

}

function saveFile() {
  save('design.jpg');
}


function switchMirror(){
  if (mirror) {
  mirror = false;
} else {
  mirror = true;
}

}
function draw() {
  // push()
  //
  // stroke(150)
  // line(0,80,width,80)
  // rect(0,0,(theme.length)*62,80)
  // pop()
  //symmetry = parseInt(radio.value());
  angle = 360 / symmetry;
  translate(width / 2, height / 2);
  noStroke()
  //transRandom = random(0,4);

  colorWithAlpha = strokeColor+random(alphas)
  fill(colorWithAlpha)
  //stroke(strokeColor,.5)
  if (mouseX > 0 && mouseX < width && mouseY > 100 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    if (mouseIsPressed) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        let sw = 2;
        strokeWeight(sw);
        circle(mx+randomGaussian(mean, sd),my+randomGaussian(mean, sd),random(1,3))
        //circle(mx+randomGaussian(mean, sd),my+randomGaussian(mean, sd),random(1,3))

        //line(mx, my, pmx, pmy);
        if (mirror){
          push();
          scale(-1, 1);
          circle(mx+randomGaussian(mean, sd),my+randomGaussian(mean, sd),random(1,3))
          //circle(mx+randomGaussian(mean, sd),my+randomGaussian(mean, sd),random(1,3))

          //line(mx, my, pmx, pmy);
          pop();


        }
        else {
          circle(mx+randomGaussian(mean, sd),my+rrandomGaussian(mean, sd),random(1,3))

        }
      }
    }
  }
}

function sliderChange(){
  symmetry = symmetryCountSlider.value()
}
function touchMoved() {
  return false
}
