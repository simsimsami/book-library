/*

- REST client is a code or app used to communicate with REST servers.
- Server contains resources that the client wants to access or change.
- Resource is any information that the API can return.

HTTP Method

- GET: used to retrieve resources.
- POST: Used to add resources.
- PUT: used to update resources.
- DELETE: used to delete resources.

*/

import express from 'express';
import {
  get_Author,
  get_Authors,
  get_Books,
  get_Book,
  get_Publisher,
  get_Publishers,
  get_Genre,
  get_Genres,
  get_AuthorBooks,
} from '../db/database.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server Listening on PORT: ', PORT);
});

// Endpoint - defined route

app.get('/status', (request, response) => {
  const status = {
    Status: 'Running',
  };
  response.send(status);
});

// Author Route
app.get('/authors/:authorId?', async (req, res) => {
  const authorId = req.params.authorId;
  if (!authorId) {
    const author = await get_Authors();
    res.send(author.rows);
  } else {
    const response = await get_Author(authorId);
    res.send(response.rows);
  }
});

// Book Route
app.get('/books/:bookId?', async (req, res) => {
  const bookId = req.params.bookId;
  if (!bookId) {
    const books = await get_Books();
    res.json(books.rows);
  } else {
    const response = await get_Book(bookId);
    res.send(response.rows);
  }
});

// Publisher route
app.get('/publishers/:pubId?', async (req, res) => {
  // if there is no pubId, show all publishers
  const pubId = req.params.pubId;
  if (!pubId) {
    const response = await get_Publishers();
    res.send(response.rows);
  } else {
    const response = await get_Publisher(pubId);
    res.send(response.rows);
  }
});

// Genre Route
app.get('/genre/:genreId?', async (req, res) => {
  const genreId = req.params.genreId;
  if (!genreId) {
    const genre = await get_Genres();
    res.send(genre.rows);
  } else {
    const response = await get_Genre(genreId);
    res.send(response.rows);
  }
});

///////////////////////////////

// Inner table routes

// Get Authors books
app.get('/author/books/:authorId', async (req, res) => {
  const authorId = req.params.authorId;
  const response = await get_AuthorBooks(authorId);
  res.send(response.rows);
});

// Get Publishers books
