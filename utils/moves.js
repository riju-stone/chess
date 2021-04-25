'use strict';
const Chess = require('../utils/chess.js');

const pawn_offset = {
  'w':[-16, -8, -9, -7],
  'b':[16, 8, 9, 7]
};

const piece_offsets = {
  'rook':[1, -1, 8, -8],
  'knight':[6, 10, 15, 17, -6, -10, -15, -17],
  'bishop':[7, 9, -7, -9],
  'queen':[1, -1, 8, -8, 7, 9, -7, -9],
  'king':[1, -1, 7, -7, 8, -8, 9, -9]
};

for(var i = 0; i < Chess.team.length; i++){
  Chess.cells[i].addEventListener('click', ((j) => {
      return function(){
        //if(allowedMoves(this, j) === true){
            Chess.movePiece(this, j);
        //}
      }
    })(i))
}

function get(x, y){
  return Chess.piece[(x-1) * 8 + (y-1)]
}

function getByIndex(index){
  return Chess.piece[index]
}

function parseIndex(index){
  let row = Math.floor(index / 8) + 1
  let column = index - ((row - 1) * 8) +1

  return {row: row, column: column}
}

function getIndex(x, y) {
	return (x-1) * 8 + (y-1)
}
