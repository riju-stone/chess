const remote = require('electron').remote;

var checkbox = document.querySelector('input[name=theme]');
var win = remote.getCurrentWindow();

function minWindow(){
  win.minimize();
}

function closeWindow(){
  win.close();
  localStorage.removeItem('theme')
}

function resetWindow(){
   win.reload()
}

function toDarkTheme() {
  trans()
  document.documentElement.setAttribute('data-theme', 'dark')
  localStorage.setItem('theme', 'dark')
}

function toLightTheme(){
  trans()
  document.documentElement.setAttribute('data-theme', 'light')
  localStorage.setItem('theme', 'light')
}

function isSwitchChecked() {
  if(this.checked)
    toDarkTheme()
  else
    toLightTheme()
}

let trans = () => {
  document.documentElement.classList.add('transition');
  window.setTimeout(() => {
      document.documentElement.classList.remove('transition')
  }, 1000)
}

(function loadTheme() {
  let theme = localStorage.getItem('theme')
  if(theme === 'dark'){
    checkbox.checked = true
    toDarkTheme()
  }
  else  
    toLightTheme()
}
)()

document.getElementById('min').addEventListener('click', minWindow)
document.getElementById('cls').addEventListener('click', closeWindow)
document.getElementById('reset').addEventListener('click', resetWindow)
checkbox.addEventListener('change', isSwitchChecked)