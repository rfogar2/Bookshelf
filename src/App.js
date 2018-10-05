import React, { Component } from 'react'
import logo from './logo.svg'
import Bookshelf from './Bookshelf.js'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Bookshelf />
        </header>
      </div>
    )
  }
}

export default App
