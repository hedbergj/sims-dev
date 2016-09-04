
function setup(){
canvas= createCanvas(500,500);

  pg = createGraphics(width, height);
  pg.myGrid = new Grid(40);

  //pg.ellipse(20,20,20,20)
}

function draw(){
  background(200);
  //myGrid.update();
  //myGrid.display();
//  pg.myGrid.display();


  ellipse(50,50,50,50)
  //  image(pg, 0, 0,width,height);

}

// var Grid = function(spacing){
//   nOfRows = height/spacing;
//   nOfCols = width/spacing;
//   stroke(0);
//
//   this.update = function(){
//
//   }
//   this.display = function(){
//     beginShape(LINES);
//     for(i=0;i<nOfRows;i++){
//       vertex(0,i*spacing);
//       vertex(width,i*spacing);
//     }
//     for(i=0;i<nOfCols;i++){
//       vertex(i*spacing,0);
//       vertex(i*spacing,height);
//     }
//     endShape();
//   }
// }


function Grid(r,mag){
   this.update = function(){
     for(this.i = 0; this.i< r; this.i++){
      for(this.j = 0; this.j <r; this.j++){
      this.x = this.i * mag;
      this.y = this.j * mag;
      stroke(0);
      fill(255);
      rect(this.x,this.y,mag,mag);
      }
     }
   }
 }
