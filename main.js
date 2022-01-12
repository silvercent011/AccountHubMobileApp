const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    minWidth: 500,
    width: 1000,
    height: 800,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, '/icons/png/64x64.png')
  });

  win.removeMenu()
  win.loadFile(`./dist/index.html`); 
  // win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


ipcMain.on('fechar', () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
})