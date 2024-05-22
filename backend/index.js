/*

- REST client is a code or app used to communicate with REST servers.
- Server contains resources that the client wants to access or change.
- Resource is any information that the API can return.

HTTP Method

- GET: used to retrieve resources.
- POST: Used to add resources.
- PUT: used to update resources.
- DELETE: used to delete resources.



< ----- > < ----- > < ----- > I want to try to improve the query requests < ----- > < ----- > < ----- >

It might be a good idea to have more routes. Example

book/:bookId/author/
- This gets all of the authors under a specific book

book/:bookId/genre
- Gets all of the genres under a specific book

author/:authorId/books
- Gets all books under a specific author

*/

import express, { request } from 'express';
import {
  get_Author,
  get_Authors,
  get_Books,
  get_Book,
  get_Publisher,
  get_Publishers,
  get_Genre,
  get_Genres,
} from '../db/database.js';

import authorRoute from './route/author.js';
import bookRoute from './route/book.js';
import publisherRoute from './route/publisher.js'
import genreRoute from './route/genre.js'

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server Listening on PORT: ', PORT);
});

// Endpoint - defined route

app.use('/authors', authorRoute);
app.use('/books', bookRoute);
app.use('/publisher', publisherRoute);
app.use('/genre', genreRoute);

// Get list of books from author

app.get('/authors-books/:authorId?', async (req, res, next) => {
  const authorId = req.params.authorId;
  if (!authorId) {
    res.send('Nope');
  } else {
    res.send('Theres something inside req.params.authorid');
    // const response = await get_AuthorBooks(authorId);
    // res.send(response.rows);
  }
  next();
});

// Publisher route
// app.get('/publishers/:pubId?', async (req, res) => {
//   // if there is no pubId, show all publishers
//   const pubId = req.params.pubId;
//   if (!pubId) {
//     const response = await get_Publishers();
//     res.send(response.rows);
//   } else {
//     const response = await get_Publisher(pubId);
//     res.send(response.rows);
//   }
// });

// Genre Route
// app.get('/genre/:genreId?', async (req, res) => {
//   const genreId = req.params.genreId;
//   if (!genreId) {
//     const genre = await get_Genres();
//     res.send(genre.rows);
//   } else {
//     const response = await get_Genre(genreId);
//     res.send(response.rows);
//   }
// });

///////////////////////////////

// Get Publishers books
