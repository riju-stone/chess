'use strict';

const Board = require('../utils/board.js');
Board.createBoard();

const Chess = require('../utils/chess.js');

const pawn_offset = {
  'w':[-16, -8, -7],
  'b':[16, 8, 7]
};

const piece_offsets = {
  'rook':[1,-1,8,-8],
  'knight':[6,10,15,17,-6,-10,-15,-17],
  'bishop':[7,9,-7,-9],
  'queen':[1,-1,8,-8,7,9,-7,-9],
  'king':[1,-1,7,-7,8,-8,9,-9]
};

for(var i = 0; i < Chess.team.length; i++){
  Chess.cells[i].addEventListener('click', ((j) => {
      return function(){
        allowedMoves(this, j);
        Chess.movePiece(this, j);
      }
    })(i))
}


//this function is called to handle the allowable moves of different pieces...
function allowedMoves(){

}

//this function is called to handle the allowable elimination of different pieces...
function allowed_eliminations(){

}

//this function is called to register a piece which is blocked...
function block(){

}
