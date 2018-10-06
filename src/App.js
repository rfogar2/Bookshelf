import React, { Component } from 'react'
import Bookshelf from './Bookshelf.js'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Bookshelf shelfTitle="Read" books={[]}/>
        <Bookshelf shelfTitle="Unread" books={[]}/>
      </div>
    )
  }
}

export default App
