'use strict'

const $ = require('jquery')

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

var createBoard = function() {
    let color = randomColor();
    let color2 = randomLightColor();

    let black = $('.column.black')
    let white = $('.column.white')

    for(var i = 0; i < black.length; i++){
      black[i].style.background = color
      white[i].style.background = color2
    }
  };

createBoard()

//Chess Logic
const horizontalAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8']
const table = $('#table')
const pieces = $(".piece")
const analysis = $('#position')

