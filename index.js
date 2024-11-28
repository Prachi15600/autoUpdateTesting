// require('update-electron-app')();
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true, // Ensure context isolation is enabled for security
        nodeIntegration: false // Disable nodeIntegration for security
      }
  });

  win.loadFile('index.html');
};

// Quit the app when all windows are closed (only on Windows)
app.on('window-all-closed', () => {
  if (process.platform === 'win32') {  // Check if the platform is Windows
    app.quit();  // Quit the app if on Windows
  }
});

// Create the window when the app is ready
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow();

  // On macOS, reopen a window if none are open when the app is activated
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
