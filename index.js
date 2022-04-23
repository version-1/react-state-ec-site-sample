const { app, ipcMain, BrowserWindow } = require('electron')
const path = require('path')
const childProcess = require("child_process")


app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// スクリプトをする実行するときのリスナー
ipcMain.on('execute-script', function (event, arg) {
  console.log('exec: ', arg, event)
  // 入力されたスクリプトを実行
  childProcess.exec("python " + arg, (error, stdout, stderr) => {
    if (error) {
      console.error(error)
    }
    // 結果をレンダラープロセスに返却
    event.returnValue = { stdout, stderr }
  })
})

function createWindow () {
  // 初期ウィンドウの表示
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
    },
    preload: "preload.js"
  })

  win.loadFile('public/index.html')
}
