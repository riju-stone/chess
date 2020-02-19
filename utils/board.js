'use strict';

function randomColor(){
  var letters = '3456789';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

function randomLightColor(){
  var letters = 'ABCD';
  var color = '#';
  for (var i = 0; i < 3; i++ ) {
      color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

var createBoard = function() {
    var chessBoard = document.getElementById("chessBoard");
    var color = randomColor();
    var color2 = randomLightColor();
    for (var i = 0; i < 8; i++) {
        var row = chessBoard.appendChild(document.createElement("tr"));
        for (var j = 0; j < 8; j++) {
            var cell = document.createElement('td')
            if((i+j)%2 === 0){
              cell.style.backgroundColor = color2;
            }
            else {
              cell.style.backgroundColor = color;
            }
            row.appendChild(cell);
        }
    }
}

module.exports = {
  createBoard
};
