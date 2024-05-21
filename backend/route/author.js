import express from 'express';
const router = express.Router();

import {
  get_Author,
  get_Authors,
  get_AuthorBooks,
  post_Author,
} from '../../db/database.js';

router.get('/:authorId?', async (req, res) => {
  const authorId = req.params.authorId;
  if (!authorId) {
    const authors = await get_Authors();
    res.send(authors.rows);
  } else {
    const response = await get_Author(authorId);
    res.send(response.rows);
  }
});

// I want a list of books from a author

router.get('/:authorId/books', async (req, res) => {
  const authorId = req.params.authorId;
  if (!authorId) {
    const authors = await get_Authors();
    res.send(authors.rows);
  } else {
    const response = await get_AuthorBooks(authorId);
    res.send(response.rows);
  }
});

// Search like author names, not exact matches

// author Post

router.post('/', async (req, res) => {
  try {
    const author_form = req.body;
    const author_first_name = author_form.author_first_name;
    const author_last_name = author_form.author_last_name;
    const author_title = author_form.author_title;
    if (!author_form) {
      res.send('Empty Author Body');
      console.log(author_form);
    } else if (!author_first_name || !author_last_name || !author_title) {
      res.send('Error in Author: Empty Entry');
    } else {
      res.send(author_form);
      const response = await post_Author(
        author_first_name,
        author_last_name,
        author_title,
      );
      res.json(response);
    }
  } catch (e) {
    console.log('Error: Post Author Route: ', e);
  }
});

/*
create table author (
    author_id serial primary key,
    author_first_name varchar(300) NOT NULL,
    author_last_name varchar(300) NOT NULL,
    author_title varchar(30) not null
);
*/

// author Delete

//

export default router;
