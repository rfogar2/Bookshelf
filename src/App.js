import React, { Component } from 'react'
import Bookshelf from './Bookshelf.js'
import './App.css'

const bookshelves = {
  readBooks: ["Hello World", "Hello World 2"],
  unreadBooks: [],
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Bookshelf shelfTitle="Read" books={bookshelves.readBooks}/>
        <Bookshelf shelfTitle="Unread" books={bookshelves.unreadBooks}/>
      </div>
    )
  }
}

export default App
