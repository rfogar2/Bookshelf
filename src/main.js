const electron = require("electron")

const { app, BrowserWindow, ipcMain, Menu } = electron

const path = require("path")
const url = require("url")

const Store = require("electron-store")
const bookshelvesStore = new Store()

// Keep a global reference of the window object, if you don"t, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600})

    const startUrl = process.env.ELECTRON_START_URL || url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true
    })
    mainWindow.loadURL(startUrl)

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    mainWindow.on("closed", function () {
        mainWindow = null
    })
}

let addBookModal
let addShelfModal
let bookshelfToAddTo

const template = [
  {
    label: "Electron",
    submenu: [
      { role: "quit" }
    ]
  },
  {
    label: "Edit",
    submenu: [
      {
        label: "Add bookshelf",
        click () {
          addShelfModal = new BrowserWindow({width: 400, height: 200, parent: mainWindow, modal: true})
          addShelfModal.loadURL(`file://${__dirname}/add-shelf.html`)
        },
        accelerator: "Command+b"
      }
    ]
  }
]

ipcMain.on("open-modal-for-shelf", (e, bookshelf) => {
  bookshelfToAddTo = bookshelf

  addBookModal = new BrowserWindow({width: 400, height: 200, parent: mainWindow, modal: true})
  addBookModal.loadURL(`file://${__dirname}/add-book.html`)
})

ipcMain.on("add-book", (e, book) => {
  console.log(`Adding ${book} to ${bookshelfToAddTo}`)

  const shelf = bookshelvesStore.get(bookshelfToAddTo)
  shelf.push(book)
  bookshelvesStore.set(bookshelfToAddTo, shelf)

  addBookModal.close()
  addBookModal = null

  mainWindow.webContents.send("force-refresh")
})

ipcMain.on("add-shelf", (e, shelf) => {
  console.log(`Adding shelf ${shelf}`)

  bookshelvesStore.set(shelf, [])

  addShelfModal.close()
  addShelfModal = null

  mainWindow.webContents.send("force-refresh")
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow()

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", function () {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})
