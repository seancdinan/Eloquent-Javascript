var n = Number(prompt('Pick a number', ''));
var counter = 2;
var board = ' ';
var color = 0;

while (counter <= n*n) {
 if (color === 0 && counter % 8 === 0) {
   board = board + '#\n';
   color = 0;
   counter++;
 } 
 else if (color === 1 && counter % 8 === 0) {
   board = board + '\n';
   color = 1;
   counter++;
 }
  else if (color === 0) {
    board = board + '#';
    color = 1;
    counter++;
  }
  else {
    board = board + ' ';
    color = 0;
    counter++;
  }
}
console.log(board);