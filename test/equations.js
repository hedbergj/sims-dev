
  var myDiv;
  var num = 6;
function setup() {
  myDiv = createDiv('$\\sqrt{'+num+'}$ $a$ &alpha; this is some text');
  newDiv = createDiv();
}

function draw() {
  num = 8;
  newDiv.html('$\\sqrt{3}$');

}
