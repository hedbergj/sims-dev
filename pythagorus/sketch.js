function setup() {
canvas = createCanvas(600,600);

triHeight = 20;
}

function draw() {
  var x1 = map(mouseX, 0, width, 5, 100);
    var y1 = map(mouseY, 0, height, 5, 100);
  triWidth = 1+x1;
  triHeight = 1+y1;
background(255);
hyp = Math.sqrt(Math.pow(triWidth,2)+Math.pow(triHeight,2));
push();
translate(100,200);
push();
fill('gray');
triangle(0,0,triWidth,0,0,-triHeight);
pop();
push();
fill('red');
rect(-triHeight,-triHeight,triHeight,triHeight);
pop();
push();
fill('green');
rect(0,0,triWidth,triWidth);
pop();




translate(triHeight,-triHeight-triWidth)
rotate(Math.atan2(triHeight,triWidth))
fill('yellow');
rect(0,0,hyp,hyp);
pop();

}
