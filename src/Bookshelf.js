import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {

    render() {
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelf}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                { 
                    this.props.books.map(book => {
                        return <li><Book book={book} changeCategory={this.props.changeCategory}/></li>
                    })
                }
              </ol>
            </div>
          </div>       
        )
    }
}

export default Bookshelf