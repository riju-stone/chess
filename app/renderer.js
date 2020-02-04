'use strict';

const { remote, BrowserWindow } = require('electron');
const path = require('path');
const {getCurrentWindow, globalShortcut} = require('electron').remote;

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
var reload = ()=>{getCurrentWindow().reload()};

reset.addEventListener('click', reload);
