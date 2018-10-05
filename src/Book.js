import React, { Component } from "react"

class Book extends Component {
  render() {
    return (
      <div className="Book">
        <p>{this.props.title}</p>
      </div>
    )
  }
}

export default Book
