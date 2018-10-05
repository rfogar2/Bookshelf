import React, { Component } from "react"
import Book from "./Book.js"

const electron = window.require("electron");
const dialog = electron.remote.dialog

class Bookshelf extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newBookTitle: ""
    }

    this.addBook = this.addBook.bind(this)
  }

  addBook() {
    const dialogOptions = {
      type: "info",
      buttons: ["OK", "Cancel"],
      message: `Add ${this.state.newBookTitle} to ${this.props.shelfTitle}?`
    }

    dialog.showMessageBox(dialogOptions, i => console.log(i))
    this.setState({newBookTitle: ""})
  }

  render() {
    return (
      <div>
        <div className="Bookshelf">
          {this.props.books.map((book) => {
            return <Book title={book}/>
          })}
        </div>
        <div className="ShelfTitle">
          {this.props.shelfTitle}
          <input
            value={this.state.newBookTitle}
            onChange={evt => this.setState({newBookTitle: evt.target.value})}
          />
          <button onClick={this.addBook}>Add book</button>
        </div>
      </div>
    )
  }
}

export default Bookshelf
