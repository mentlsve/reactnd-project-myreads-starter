import React from 'react'
import Bookshelf from './Bookshelf'
import Book from './Book'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Library from './Library'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    console.log("ComponentDidMount")
    BooksAPI.getAll().then(books => this.setState({books: books}))
  }

  changeShelf = (book, shelf) => {
    const books = this.state.books
    books.find(e => e.title === book.title).shelf = shelf;
    BooksAPI.update(book, shelf)
    console.log("setting new shelf for " + book.id + " to " + shelf)
    this.setState((prevState) => ({
      books: books
    }))
  }

  addToLibrary = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf)
    console.log("setting new shelf for " + book.id + " to " + shelf)
    this.setState((prevState) => ({
      books: [...this.state.books, book]
    }))
  }
  render() {
    return (
      <div className="app">
       <Route path="/search" render={(props)=>(
          <Search {...props} addToShelf={this.addToLibrary} />
        )} />
        <Route exact path="/" render={(props) => (
          <Library {...props} changeShelf={this.changeShelf} books={this.state.books} />
        )} />
      </div>
    )
  }
}

export default BooksApp
