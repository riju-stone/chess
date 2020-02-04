'use strict';

var cells = document.getElementsByTagName('td');
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
const pieceValues = {
  'ki': 9999,
  'q' : 9,
  'b' : 3,
  'k' : 3,
  'r' : 5,
  'p' : 1
};

//initial positions
var cells = document.getElementsByTagName('td');
var team = new Array(64);
var piece = new Array(64);

function initPos(){
  for(var i = 0; i < cells.length; i++){
    if(i >= 8 && i <= 15){
      cells[i].innerHTML = '<img src = "../assets/pieces/pawn.png" height="40px" width="40px">';
      team[i] = 'b';
      piece[i] = 'p';
    }
    else if(i >= 48 && i <= 55){
      cells[i].innerHTML = '<img src = "../assets/pieces/pawn-white.png" height="40px" width="40px">';
      team[i] = 'w';
      piece[i] = 'p';
    }
    else if(i === 0 || i === 7){
      cells[i].innerHTML = '<img src = "../assets/pieces/rook.png" height="40px" width="40px">';
      team[i] = 'b';
      piece[i] = 'r';
    }
    else if(i === 56 || i === 63){
      cells[i].innerHTML = '<img src = "../assets/pieces/rook-white.png" height="40px" width="40px">';
      team[i] = 'w';
      piece[i] = 'r';
    }
    else if(i === 1 || i === 6){
      cells[i].innerHTML = '<img src = "../assets/pieces/knight.png" height="40px" width="40px">';
      team[i] = 'b';
      piece[i] = 'k';
    }
    else if(i === 57 || i === 62){
      cells[i].innerHTML = '<img src = "../assets/pieces/knight-white.png" height="40px" width="40px">';
      team[i] = 'w';
      piece[i] = 'k';
    }
    else if(i === 2 || i === 5){
      cells[i].innerHTML = '<img src = "../assets/pieces/bishop.png" height="40px" width="40px">';
      team[i] = 'b';
      piece[i] = 'b';
    }
    else if(i === 58 || i === 61){
      cells[i].innerHTML = '<img src = "../assets/pieces/bishop-white.png" height="40px" width="40px">';
      team[i] = 'w';
      piece[i] = 'b';
    }
    else if(i === 4){
      cells[i].innerHTML = '<img src = "../assets/pieces/queen.png" height="40px" width="40px">';
      team[i] = 'b';
      piece[i] = 'q';
    }
    else if(i === 60){
      cells[i].innerHTML = '<img src = "../assets/pieces/queen-white.png" height="40px" width="40px">';
      team[i] = 'w';
      piece[i] = 'q';
    }
    else if(i === 3){
      cells[i].innerHTML = '<img src = "../assets/pieces/king.png" height="40px" width="40px">';
      team[i] = 'b';
      piece[i] = 'ki';
    }
    else if(i === 59){
      cells[i].innerHTML = '<img src = "../assets/pieces/king-white.png" height="40px" width="40px">';
      team[i] = 'w';
      piece[i] = 'ki';
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

function movePiece(that, x){
  if(state === false){                //if state is false then no cell is selected
    if(that.innerHTML != ''){         //this checking is used to prevent selecting empty cells
      state = true;
      currentPiece = that.innerHTML;
      currentCell = that;
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
  else{                                //when a cell is already selected, state becomes true
    if(currentTeam !== ''){
      if(team[x] !== currentTeam){    //this checking prevents eliminating pieces in the same team
        var res = elimination(team[x], currentTeam);
        if(that !== currentCell){     //this checking ensures that the cell contents are not erased when clicked on the same cell twice
          that.innerHTML = currentPiece;
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
  if(res == 'b'){
    console.log("White piece was eliminated");
    console.log(piece[x]+" eliminates "+init);
    whiteEliminations += getPoints(init);
    showPoints();
  }
  else if(res == 'w'){
    console.log("Black piece was eliminated");
    console.log(piece[x]+" eliminates "+init);
    blackEliminations += getPoints(init);
    showPoints();
  }
}

//eliminations
function elimination(finalTeam, prevTeam){
  if(finalTeam === 'w' && prevTeam === 'b'){
    return 'b';
  }
  else if(finalTeam === 'b' && prevTeam === 'w'){
    return 'w';
  }
}

function getPoints(defendingPiece){return pieceValues[defendingPiece];}

function showPoints(){
  console.log("White Points: "+blackEliminations+" Black Points: "+whiteEliminations);
}


/*
The minimax ai algorithm
The "AI" part starts here

var minimaxRoot =function(depth, game, isMaximisingPlayer) {

    var newGameMoves = game.ugly_moves();
    var bestMove = -9999;
    var bestMoveFound;

    for(var i = 0; i < newGameMoves.length; i++) {
        var newGameMove = newGameMoves[i]
        game.ugly_move(newGameMove);
        var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
    }
    return bestMoveFound;
};

var minimax = function (depth, game, alpha, beta, isMaximisingPlayer) {
    positionCount++;
    if (depth === 0) {
        return -evaluateBoard(game.board());
    }

    var newGameMoves = game.ugly_moves();

    if (isMaximisingPlayer) {
        var bestMove = -9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.ugly_move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    } else {
        var bestMove = 9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.ugly_move(newGameMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
};

var evaluateBoard = function (board) {
    var totalEvaluation = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
        }
    }
    return totalEvaluation;
};

var reverseArray = function(array) {
    return array.slice().reverse();
};

var pawnEvalWhite =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
    [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];

var bishopEvalWhite = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingEvalWhite = [

    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

var kingEvalBlack = reverseArray(kingEvalWhite);

var getPieceValue = function (piece, x, y) {
    if (piece === null) {
        return 0;
    }
    var getAbsoluteValue = function (piece, isWhite, x ,y) {
        if (piece.type === 'p') {
            return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
        } else if (piece.type === 'r') {
            return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
        } else if (piece.type === 'n') {
            return 30 + knightEval[y][x];
        } else if (piece.type === 'b') {
            return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
        } else if (piece.type === 'q') {
            return 90 + evalQueen[y][x];
        } else if (piece.type === 'k') {
            return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
        }
        throw "Unknown piece type: " + piece.type;
    };

    var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
};

var onDragStart = function (source, piece, position, orientation) {
    if (game.in_checkmate() === true || game.in_draw() === true ||
        piece.search(/^b/) !== -1) {
        return false;
    }
};

var makeBestMove = function () {
    var bestMove = getBestMove(game);
    game.ugly_move(bestMove);
    board.position(game.fen());
    renderMoveHistory(game.history());
    if (game.game_over()) {
        alert('Game over');
    }
};


var positionCount;
var getBestMove = function (game) {
    if (game.game_over()) {
        alert('Game over');
    }
    var depth = 4;
    var bestMove = minimaxRoot(depth, game, true);
    return bestMove;
};

var onDrop = function (source, target) {

    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    removeGreySquares();
    if (move === null) {
        return 'snapback';
    }

    renderMoveHistory(game.history());
    window.setTimeout(makeBestMove, 250);
};

var onSnapEnd = function () {
    board.position(game.fen());
};

var onMouseoverSquare = function(square, piece) {
    var moves = game.moves({
        square: square,
        verbose: true
    });

    if (moves.length === 0) return;
};

*/
