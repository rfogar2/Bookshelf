import React, { Component } from "react"
import Book from "./Book.js"

class Bookshelf extends Component {
  render() {
    return (
      <div className="Bookshelf">
        <Book title="Hello World"/>
      </div>
    )
  }
}

export default Bookshelf
