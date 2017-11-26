import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import { Route, Link } from 'react-router-dom'
import './App.css'

function Library(props) {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <Bookshelf shelf="Currently reading" changeCategory={props.changeShelf} books={props.books.filter(i => i.shelf === 'currentlyReading')} />
                    <Bookshelf shelf="Want to read" changeCategory={props.changeShelf} books={props.books.filter(i => i.shelf === 'wantToRead')} />
                    <Bookshelf shelf="Already read" changeCategory={props.changeShelf} books={props.books.filter(i => i.shelf === 'read')} />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

export default Library