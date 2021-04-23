'use strict';

const remote = require('electron').remote;

document.getElementById('min').addEventListener('click', minWindow);
document.getElementById('cls').addEventListener('click', closeWindow);


function minWindow(){
  var win = remote.getCurrentWindow();
  win.minimize();
}

function closeWindow(){
  var win = remote.getCurrentWindow();
  win.close();
}

var reset = document.getElementById('reset');
var reload = ()=>{remote.getCurrentWindow().reload()};

reset.addEventListener('click', reload);
