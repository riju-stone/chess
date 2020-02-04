const electron = require('electron');
const { app, BrowserWindow, webPreferences } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = async () => {
  const win = new BrowserWindow({
    height: 1000,
    width: 900,
    resizable: true,
    frame: false,
    icon: path.join(__dirname, '/assets/chess.png'),
    webPreferences:{
      nodeIntegration: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      allowEval: false
    }
  });

  win.on('ready-to-show', async () =>{
    mainWindow.show();
  });

  win.on('closed', () => {
    mainWindow = null;
  });

  await win.loadFile(path.join(__dirname,'app','path.html'));
  return win;
};

if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on('activate', async () => {
	if (!mainWindow) {
		mainWindow = await createWindow();
	}
});

(async () => {
	await app.whenReady();
	mainWindow = await createWindow();
})();
