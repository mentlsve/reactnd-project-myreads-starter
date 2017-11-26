import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

function Bookshelf(props) {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{props.shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              props.books.map(book => {
                return <li key={book.id}><Book book={book} changeCategory={props.changeCategory} /></li>
              })
            }
          </ol>
        </div>
      </div>
    )
}

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired,
  changeCategory: PropTypes.func.isRequired
}

export default Bookshelf
