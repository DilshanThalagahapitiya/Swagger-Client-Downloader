const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path');

function createWindow () {
    const iconPath = path.join(__dirname, 'icon.icns');
    const icon = nativeImage.createFromPath(iconPath);
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});