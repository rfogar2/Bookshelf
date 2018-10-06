const electron = window.require("electron")
const ipcRenderer = electron.ipcRenderer

const shelfTitleInput = document.getElementById("shelf_title_input")
const addShelfButton = document.getElementById("add_shelf_button")

addShelfButton.addEventListener("click", () => {
  const shelfTitle = shelfTitleInput.value

  ipcRenderer.send("add-shelf", shelfTitle)
})
