import React from 'react'
import Bookshelf from './Bookshelf'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    searchQuery: "",
    searchResults: [],
    books: [],   
    showSearchPage: false
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

  addToShelf = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf)
    console.log("setting new shelf for " + book.id + " to " + shelf)
    this.setState((prevState) => ({
      books: [...this.state.books, book]
    }))
  }

  handleSearchInputChange = (event) => {
    BooksAPI.search(event.target.value, 5).then(books => this.setState({searchResults: books}))
    this.setState({searchQuery: event.target.value})
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={this.state.searchQuery}
                  onChange={this.handleSearchInputChange}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                this.state.searchResults.map(book => {
                  return <li key={book.id}><Book book={book} changeCategory={this.addToShelf}/></li>
                })
              }
              </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf shelf="Currently reading" changeCategory={this.changeShelf} books={this.state.books.filter(i => i.shelf === 'currentlyReading')}/>
                <Bookshelf shelf="Want to read" changeCategory={this.changeShelf} books={this.state.books.filter(i => i.shelf === 'wantToRead')}/>
                <Bookshelf shelf="Already read" changeCategory={this.changeShelf} books={this.state.books.filter(i => i.shelf === 'read')}/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
