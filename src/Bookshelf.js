import React, { Component } from "react"
import Book from "./Book.js"

const electron = window.require("electron")
const ipcRenderer = electron.ipcRenderer

class Bookshelf extends Component {
  constructor(props) {
    super(props)

    this.addBook = this.addBook.bind(this)
  }

  addBook() {
    ipcRenderer.send("open-modal-for-shelf", this.props.shelfTitle)
  }

  render() {
    return (
      <div>
        <div className="Bookshelf">
          {this.props.books.map((bookTitle) => {
            return <Book key={bookTitle} title={bookTitle}/>
          })}
        </div>
        <div className="ShelfTitle">
          {this.props.shelfTitle}
          <button onClick={this.addBook}>Add book</button>
        </div>
      </div>
    )
  }
}

export default Bookshelf
