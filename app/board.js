'use strict'

// Board UI

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
}

$(() => {
  function createBoard() {
      let color = randomColor();
      let color2 = randomLightColor();

      let black = document.querySelectorAll('.column.black')
      let white = document.querySelectorAll('.column.white')

      for(var i = 0; i < black.length; i++){
        black[i].style.background = color
        white[i].style.background = color2
      }
    };

  createBoard()

//Chess Logic
  
  const table = $('.table')
  const swapButton = $('.change')

  const board = {
    0:'a8', 1:'b8', 2:'c8', 3:'d8', 4:'e8', 5:'f8', 6:'g8', 7:'h8',
    8:'a7', 9:'b7', 10:'c7', 11:'d7', 12:'e7', 13:'f7', 14:'g7', 15:'h7',
    16:'a6', 17:'b6', 18:'c6', 19:'d6', 20:'e6', 21:'f6', 22:'g6', 23:'h6',
    24:'a5', 25:'b5', 26:'c5', 27:'d5', 28:'e5', 29:'f5', 30:'g5', 31:'h5',
    32:'a4', 33:'b4', 34:'c4', 35:'d4', 36:'e4', 37:'f4', 38:'g4', 39:'h4',
    40:'a3', 41:'b3', 42:'c3', 43:'d3', 44:'e3', 45:'f3', 46:'g3', 47:'h3',
    48:'a2', 49:'b2', 50:'c2', 51:'d2', 52:'e2', 53:'f2', 54:'g2', 55:'h2',
    56:'a1', 57:'b1', 58:'c1', 59:'d1', 60:'e1', 61:'f1', 62:'g1', 63:'h1'
  }

  var whitePieces = $('.white.piece')
  var blackPieces = $('.black.piece')
  
  //Swap Team when swap button is pressed
  var currSide = "black"

  swapButton.on("click", () => {
    let swapText = $('#change_info')

    whitePieces.removeClass("white")
    whitePieces.addClass("black")

    blackPieces.removeClass("black")
    blackPieces.addClass("white")

    if(swapText.text() === "BLACK"){
      swapText.text("WHITE")
      currSide = "white"
    }
    else{
      swapText.text("BLACK")
      currSide = "black"
    }  
  })
})