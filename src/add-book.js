const electron = window.require("electron")
const ipcRenderer = electron.ipcRenderer

const bookTitleInput = document.getElementById("book_title_input")
const addBookButton = document.getElementById("add_book_button")

addBookButton.addEventListener("click", () => {
  const bookTitle = bookTitleInput.value

  ipcRenderer.send("add-book", bookTitle)
})
