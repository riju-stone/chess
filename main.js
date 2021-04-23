const electron = require('electron');
const { app, BrowserWindow, screen, webPreferences } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = async () => {
  const mainScreen = screen.getPrimaryDisplay();
  const win = new BrowserWindow({
    width: mainScreen.size.width - 550,
    height: mainScreen.size.height - 150,
    minWidth: 1380,
    minHeight: 950,
    frame: false,
    icon: path.join(__dirname, '/assets/chess.png'),
    resizable: true,
    webPreferences:{
      nodeIntegration: true,
      webSecurity: true,
      allowEval: false,
      contextIsolation: false,
      enableRemoteModule: true
      //devTools: false
    }
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
