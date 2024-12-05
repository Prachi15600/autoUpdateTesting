// require('update-electron-app')();
// const { app, BrowserWindow, ipcMain } = require('electron/main');
// //const updateElectronApp = require('update-electron-app');
// //updateElectronApp();
// const path = require('node:path');

// // const { app, BrowserWindow, ipcMain } = require("electron"); //ipcMain for communication -->update
// // const { autoUpdater } = require("electron-updater");
// // const path = require("path");

// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//         preload: path.join(__dirname, 'preload.js'),
//         //contextIsolation: true, // Ensure context isolation is enabled for security
//         //nodeIntegration: false // Disable nodeIntegration for security
//       }
//   });

//   win.loadFile('index.html');
// };

// // Quit the app when all windows are closed (only on Windows)
// app.on('window-all-closed', () => {
//   if (process.platform === 'win32') {  // Check if the platform is Windows
//     app.quit();  // Quit the app if on Windows
//   }
// });

// // Create the window when the app is ready
// app.whenReady().then(() => {
//   ipcMain.handle('ping', () => 'pong')
//   createWindow();

//   // On macOS, reopen a window if none are open when the app is activated
//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow();
//     }
//   });
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////

import { app, BrowserWindow, ipcMain } from 'electron/main';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'update-electron-app'; // Importing as it runs directly

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the directory path

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Use the defined __dirname
    },
  });

  win.loadFile('index.html'); // Load the main HTML file
};

// autoUpdater.checkForUpdatesAndNotify();

// Quit the app when all windows are closed (only on Windows)
app.on('window-all-closed', () => {
  if (process.platform === 'win32') app.quit(); // Quit the app only on Windows
});

// Create the main application window when the app is ready
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong'); // Handle 'ping' event with 'pong'
  createWindow(); // Create the main window

  // On macOS, reopen the app if it was closed and no windows are open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

