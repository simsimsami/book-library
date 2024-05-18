import express from 'express';
const router = express.Router();

import { get_Books, get_Book } from '../../db/database.js';

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

export default router;
