import React, { Component } from 'react'
import Bookshelf from './Bookshelf.js'
import './App.css'

const electron = window.require("electron")
const ipcRenderer = electron.ipcRenderer
const Store = window.require("electron-store")
const bookshelvesStore = new Store()

class App extends Component {
  constructor(props) {
    super(props)

    this.renderBookshelves = this.renderBookshelves.bind(this)
  }

  componentDidMount() {
    ipcRenderer.on("force-refresh", () => {
      this.forceUpdate()
    })
  }

  render() {
    return (
      <div className="App">
        {this.renderBookshelves()}
      </div>
    )
  }

  renderBookshelves() {
    const bookshelfTitles = Object.keys(bookshelvesStore.store)

    if (bookshelfTitles.length > 0) {
      return (
        <div>
          {bookshelfTitles.map(shelfTitle => {
            return (
              <Bookshelf
                key={shelfTitle}
                shelfTitle={shelfTitle}
                books={bookshelvesStore.get(shelfTitle) || []}
              />
            )
          })}
        </div>
      )
    } else {
      return <p>Start by creating a bookshelf with the menu</p>
    }
  }
}

export default App
