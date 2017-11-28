import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { ToastContainer, toast } from 'react-toastify'
import PropTypes from 'prop-types'

class Search extends Component {

  state = {
    searchQuery: "",
    searchResults: []
  }

  handleSearchInputChange = (event) => {
    if(event.target.value.length > 0) {
      BooksAPI.search(event.target.value, 5).then(books => this.setState({ searchResults: books }))
      this.setState({ searchQuery: event.target.value })
    }
  }

  handleBookAction = (book, shelf) => {
    this.props.addToShelf(book, shelf)
    toast.info(`Added "${book.title}" to your library`);
    this.setState({
      searchResults: this.state.searchResults.filter(e => e.id !== book.id)
    })
  }

  render() {
    return (
      <div className="search-books">
        <ToastContainer />
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" placeholder="Search by title or author" value={this.state.searchQuery}
              onChange={this.handleSearchInputChange} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.length > 0 &&
              this.state.searchResults.map(book => {
                return <li key={book.id}><Book book={book} changeCategory={this.handleBookAction} /></li>
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  addToShelf: PropTypes.func.isRequired
}

export default Search