# MyReads Project

This is my submission for the project *MyReads: A Book Lending App* from Udacity's React Developer Nanodegree.

It is based on the [starter template](https://github.com/udacity/reactnd-project-myreads-starter) for the final assessment project for Udacity's React Fundamentals course.

## Starting the application

* install all project dependencies with `npm install`
* start the development server with `npm start`

Note that the app connects to an existing backend through [`BooksAPI.js`](src/BooksAPI.js). This API is documented [here](https://github.com/udacity/reactnd-project-myreads-starter).

## Application Structure

The application uses five React Components:
```
src
├── App.js
├── Book.js
├── Bookshelf.js
├── Library.js
├── Search.js
```

### BooksApp (defined in App.js)

This is the parent component which keeps track of the *books currently in the library*. This component decides whether the Search or the Library component is rendered.

The reason that the *books currently in the library* are tracked by this component is that the Search component also needs access to add new books.

### Library (defined in Library.js)

The Library renders the three different shelves (*Currently reading*, *Want to read*, *Read*) by delegating three times to the Bookshelf component.

### Search (defined in Search.js)

The Search component renders the search bar and the search results. When the user adds a book from the search results it is added to the respective shelf through a function defined in the BooksApp component.