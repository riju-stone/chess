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

function createBoard() {
    let color = randomColor();
    let color2 = randomLightColor();

    let black = document.querySelectorAll('.Dark')
    let white = document.querySelectorAll('.Light')

    for(var i = 0; i < black.length; i++){
      black[i].style.background = color
      white[i].style.background = color2
    }
  };

createBoard()