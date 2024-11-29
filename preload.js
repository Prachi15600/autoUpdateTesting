// const { contextBridge, ipcRenderer } = require('electron')

// contextBridge.exposeInMainWorld('versions', {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   ping: async () => {
//     try {
//       return await ipcRenderer.invoke('ping'); // Returns a promise resolved with 'pong'
//     } catch (error) {
//       console.error('Error invoking ping:', error); // Logs any error that occurs
//       return null;
//     }
//   }
//   //ping: () => ipcRenderer.invoke('ping')
//   // we can also expose variables, not just functions
// });

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: async () => {
    try {
      return await ipcRenderer.invoke('ping');
    } catch (error) {
      console.error('Error invoking ping:', error);
      return null;
    }
  },
});
