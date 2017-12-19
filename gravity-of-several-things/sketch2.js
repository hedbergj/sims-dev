
xvel = [];
yvel = [];
xacc = [];
yacc = [];
mass = [5,5];
G = 1;
var dist, diffx, diffy, force, xcalc, ycalc, inside, index;

function setup() {
  createCanvas(600,600)
  totalObjects = 2;
  
  xcoord = [100,200]
  ycoord = [height/2,height/2];
  for (a = 0; a < totalObjects; a++) {
     xcoord[a] = xcoord[a];
     ycoord[a] = ycoord[a];
     xvel[a] = 0;
     yvel[a] = 0
     mass[a] = mass[a];
  }
}

function draw() {
  background(0);
  fill(255);
  calculateForce();
  updatePosition();
  collision();
  zoomCheck();
  drawObjects();
}

  //update acceleration and velocity
function calculateForce() {
    for ( a = 0; a < totalObjects; a++) {
       xacc[a] = 0;
       yacc[a] = 0;
       for ( b = 0; b < totalObjects; b++) {
          if (a != b && mass[a] != 0) {
            diffx = xcoord[b] - xcoord[a];
            diffy = ycoord[b] - ycoord[a];
            dist = sqrt(sq(diffx)+sq(diffy));
            force = (G * mass[a] * mass[b]) / sq(dist);
            xcalc = force * diffx / dist;
            xacc[a] = xacc[a] + (xcalc / mass[a]);
            ycalc = force * diffy / dist;
            yacc[a] = yacc[a] + (ycalc / mass[a]);
          }
       }
       xvel[a] = xvel[a] + xacc[a];
       yvel[a] = yvel[a] + yacc[a];
    }
  }

function updatePosition() {
//update position
  for (a = 0; a < totalObjects; a++) {
     xcoord[a] = xcoord[a] + xvel[a];
     ycoord[a] = ycoord[a] + yvel[a];
  }
}

//inelastic collisions equation m1v1+m2v2=(m1+m2)v3
function collision() {
  for ( a = 0; a < totalObjects; a++) {
    for ( b = 0; b < totalObjects; b++) {
    	if (a != b && mass[a] != 0 && mass[b] != 0) {
        	diffx = xcoord[b] - xcoord[a];
        	diffy = ycoord[b] - ycoord[a];
        	dist = sqrt(sq(diffx) + sq(diffy));
        	if (dist <= sqrt(mass[a]) + sqrt(mass[b])) {
               xvel[a] = ((mass[a] * xvel[a]) + (mass[b] * xvel[b])) / (mass[a] + mass[b]);
               yvel[a] = ((mass[a] * yvel[a]) + (mass[b] * xvel[b])) / (mass[a] + mass[b]);
               mass[a] = mass[a] + mass[b];
     		   xcoord[a] = ((mass[a] * xcoord[a]) + (mass[b] * xcoord[b])) / (mass[a] + mass[b]);
               ycoord[a] = ((mass[a] * ycoord[a]) + (mass[b] * ycoord[b])) / (mass[a] + mass[b]);
               mass[b] = 0;
            }
    	}
    }
  }
}

function zoomCheck() {
 //check for re-centering
  inside = -1;
  index = 0;
  //find largest mass
  for ( a = 0; a < totalObjects; a++) {
      if (mass[a] >= mass[index]) {
          index = a;
      }
  }
  //check if it has left the window
  if (index >= 0) {
    if (xcoord[index] >= 0 && xcoord[index] <= width && ycoord[index] >= 0 && ycoord[index] <= height) {
    	inside = 1;
    }
  }
  if (inside == -1) {
   	  //recenter
      diffx = (width / 2) - xcoord[index];
      diffy = (height / 2) - ycoord[index];
      for ( a = 0; a < totalObjects; a++) {
       	 xcoord[a] = xcoord[a] + diffx;
         ycoord[a] = ycoord[a] + diffy;
      }
      for (a = 0; a < totalObjects; a++) {
       	 if (a != index) {
          	diffx = xcoord[index] - xcoord[a];
            diffy = ycoord[index] - ycoord[a];
            xcoord[a] = xcoord[a] + (diffx / 2);
            ycoord[a] = ycoord[a] + (diffy / 2);
            xvel[a] = (xvel[a] / 2);
      		yvel[a] = (yvel[a] / 2);
      		mass[a] = mass[a] / 2;
         }
      }
      xvel[index] = (xvel[index] / 2);
      yvel[index] = (yvel[index] / 2);
      mass[index] = mass[index] / 2;
  }
}

function drawObjects() {
  for (a = 0; a < totalObjects; a++) {
    if (mass[a] != 0) {
    	ellipse(xcoord[a], ycoord[a], 2 * sqrt(mass[a]), 2 * sqrt(mass[a]));
    }
  }
}
