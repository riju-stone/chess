'use strict';

var currentPiece;           //Stores the piece of the cell you click on...
var currentCell;            //Stores the cell info you first click on...
var currentTeam;            //Stores the team of the cell you first click on (white, black or null)...
var currentPieceClass;      //Stores the piece present in the cell (if any) when you click on it...(king, queen, knight etc)
var prev;                   //Stores the index of the initial location of the pieces
var state = false;          //state becomes true when you select a cell and becomes false when you click on another cell...
var blackEliminations = 0;
var whiteEliminations = 0;
var init = '';
var team = new Array(64);
var piece = new Array(64);
var initColor;
var initialPos = '';
var finalPos = '';
const pieceValues = {
  'king': 9999,
  'queen' : 9,
  'bishop' : 3,
  'knight' : 3,
  'rook' : 5,
  'pawn' : 1
};

var cells = document.getElementsByTagName('td');
var team = new Array(64);
var piece = new Array(64);
const analysis = document.getElementById('position');

const board = {
  0:'a8', 1:'b8', 2:'c8', 3:'d8', 4:'e8', 5:'f8', 6:'g8', 7:'h8',
  8:'a7', 9:'b7', 10:'c7', 11:'d7', 12:'e7', 13:'f7', 14:'g7', 15:'h7',
  16:'a6', 17:'b6', 18:'c6', 19:'d6', 20:'e6', 21:'f6', 22:'g6', 23:'h6',
  24:'a5', 25:'b5', 26:'c5', 27:'d5', 28:'e5', 29:'f5', 30:'g5', 31:'h5',
  32:'a4', 33:'b4', 34:'c4', 35:'d4', 36:'e4', 37:'f4', 38:'g4', 39:'h4',
  40:'a3', 41:'b3', 42:'c3', 43:'d3', 44:'e3', 45:'f3', 46:'g3', 47:'h3',
  48:'a2', 49:'b2', 50:'c2', 51:'d2', 52:'e2', 53:'f2', 54:'g2', 55:'h2',
  56:'a1', 57:'b1', 58:'c1', 59:'d1', 60:'e1', 61:'f1', 62:'g1', 63:'h1'
};

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

createBoard();

//initial positions
var initPos = function(){
  for(var i = 0; i < cells.length; i++){
    if(i >= 8 && i <= 15){
      cells[i].innerHTML = '<img src = "../assets/pieces/pawn.png" height="40px" width="40px">';
      team[i] = 'b';
      piece[i] = 'pawn';
    }
    else if(i >= 48 && i <= 55){
      cells[i].innerHTML = '<img src = "../assets/pieces/pawn-white.png" height="40px" width="40px">';
      team[i] = 'w';
      piece[i] = 'pawn';
    }
    else if(i === 0 || i === 7){
      cells[i].innerHTML = '<img src = "../assets/pieces/rook.png" height="40px" width="40px">';
      team[i] = 'b';
      piece[i] = 'rook';
    }
    else if(i === 56 || i === 63){
      cells[i].innerHTML = '<img src = "../assets/pieces/rook-white.png" height="40px" width="40px">';
      team[i] = 'w';
      piece[i] = 'rook';
    }
    else if(i === 1 || i === 6){
      cells[i].innerHTML = '<img src = "../assets/pieces/knight.png" height="40px" width="40px">';
      team[i] = 'b';
      piece[i] = 'knight';
    }
    else if(i === 57 || i === 62){
      cells[i].innerHTML = '<img src = "../assets/pieces/knight-white.png" height="40px" width="40px">';
      team[i] = 'w';
      piece[i] = 'knight';
    }
    else if(i === 2 || i === 5){
      cells[i].innerHTML = '<img src = "../assets/pieces/bishop.png" height="40px" width="40px">';
      team[i] = 'b';
      piece[i] = 'bishop';
    }
    else if(i === 58 || i === 61){
      cells[i].innerHTML = '<img src = "../assets/pieces/bishop-white.png" height="40px" width="40px">';
      team[i] = 'w';
      piece[i] = 'bishop';
    }
    else if(i === 4){
      cells[i].innerHTML = '<img src = "../assets/pieces/queen.png" height="40px" width="40px">';
      team[i] = 'b';
      piece[i] = 'queen';
    }
    else if(i === 60){
      cells[i].innerHTML = '<img src = "../assets/pieces/queen-white.png" height="40px" width="40px">';
      team[i] = 'w';
      piece[i] = 'queen';
    }
    else if(i === 3){
      cells[i].innerHTML = '<img src = "../assets/pieces/king.png" height="40px" width="40px">';
      team[i] = 'b';
      piece[i] = 'king';
    }
    else if(i === 59){
      cells[i].innerHTML = '<img src = "../assets/pieces/king-white.png" height="40px" width="40px">';
      team[i] = 'w';
      piece[i] = 'king';
    }
    else{
      cells[i].innerHTML = '';
      team[i] = '';
      piece[i] = '';
    }
  }
}

initPos();

//movements
for(var i = 0; i < team.length; i++){
  cells[i].addEventListener('click', ((j) => {
      return function() {
        movePiece(this, j);
      }
    })(i))
}

var movePiece = function(that, x){
  if(state === false){                //if state is false then no cell is selected
    if(that.innerHTML != ''){         //this checking is used to prevent selecting empty cells
      state = true;
      currentPiece = that.innerHTML;
      currentCell = that;
      initialPos = positions(x);
      currentTeam = team[x];
      currentPieceClass = piece[x];
      prev = x;
      team[x] = '';
      piece[x] = '';
    }
    else{                              //if an empty cell is selected, state remains false
      state = false;
    }
  }
  else{                            //when a cell is already selected, state becomes true
    if(currentTeam !== ''){
      if(team[x] !== currentTeam){    //this checking prevents eliminating pieces in the same team
        var res = elimination(team[x], currentTeam);
        if(that !== currentCell){     //this checking ensures that the cell contents are not erased when clicked on the same cell twice
          that.innerHTML = currentPiece;
          finalPos = positions(x);
          currentCell.innerHTML = '';
          team[x] = currentTeam;
          init = piece[x];
          piece[x] = currentPieceClass;
        }
        else{
          team[prev] = currentTeam;
          piece[prev] = currentPieceClass;
        }
      }
      else{
        team[prev] = currentTeam;
        piece[prev] = currentPieceClass;
      }
    }
    state = false;             //after a destination cell has been selected state becomes false again
  }
  console.log(initialPos+"-"+finalPos);
  if(initialPos !== '' && finalPos !== ''){
    evaluate(initialPos+"-"+finalPos);
  }
  if(res == 'b'){
    evaluate(piece[x]+" eliminates "+init);
    whiteEliminations += getPoints(init);
    showPoints();
  }
  else if(res == 'w'){
    evaluate(piece[x]+" eliminates "+init);
    blackEliminations += getPoints(init);
    showPoints();
  }
}

//positions
var positions = function(pos){
  return board[pos];
}

function evaluate(res){
  var output = document.createElement('p');
  output.innerHTML = res;
  analysis.append(output);
}

//eliminations
var elimination = function(finalTeam, prevTeam){
  if(finalTeam === 'w' && prevTeam === 'b'){
    return 'b';
  }
  else if(finalTeam === 'b' && prevTeam === 'w'){
    return 'w';
  }
}

function getPoints(defendingPiece){return pieceValues[defendingPiece];}

function showPoints(){
  console.log("White: "+blackEliminations+" Black: "+whiteEliminations);
  evaluate("White: "+blackEliminations+" Black: "+whiteEliminations);
}
