import express from 'express';
const router = express.Router();

import { get_Books, get_Book, post_Book } from '../../db/database/database.js';

// Book Route
router.get('/:bookId?', async (req, res) => {
  const bookId = req.params.bookId;
  if (!bookId) {
    const books = await get_Books();
    res.json(books.rows);
  } else {
    const response = await get_Book(bookId);
    res.json(response.rows);
    console.log(response.rows);
  }
});

router.post('/', async (req, res) => {
  try {
    const book_form = req.body;
    const book_title = book_form.book_title;
    const book_release = book_form.book_release;
    const publisher_id = book_form.publisher_id;
    const ISBN = req.body.ISBN;

    if (!book_form) {
      res.send('Empty Book body');
      console.log(book_form);
      return;
    } else if (!book_title || !ISBN || !book_release || !publisher_id) {
      res.send('Error in Book: Empty Entry');
      return;
    } else {
      res.send(book_form);
      // const response = await post_Book(
      //   book_title,
      //   book_release,
      //   publisher_id,
      //   ISBN,
      // );
      // response.json(response);
    }
  } catch (e) {
    console.log('Error: Post Books route: ', e);
  }
});

export default router;
