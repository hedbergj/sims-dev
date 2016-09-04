
function setup(){
canvas= createCanvas(500,500);


  myGrid = new Grid(20,20);

}

function draw(){
  background(200);
  myGrid.update();




}


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
