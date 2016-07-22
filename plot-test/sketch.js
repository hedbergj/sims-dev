var xarray = [];
var yarray = [];
function setup() {

  canvas = createCanvas(500,500);

  generatePoints()


 //plot1 is the plot created in the previous example


}

function draw() {
  point_array = Graph.makeData(xarray, yarray);

  plot1 = new Plot(point_array, 255, 0, 0, 2);

  graph1 = new Graph(500,500,0,20,0,100,10);

  graph1.addPlot(plot1);

  generatePoints()

  graph1.drawBg();

  graph1.plotAll();


}

function generatePoints() {

  for (i=0;i<20;i++) {
    xarray[i] = i;
    yarray[i] = map(mouseX,0,width,1,2) * i
   }
}
