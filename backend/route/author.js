import express from 'express';
const router = express.Router();

import { get_Author, get_Authors } from '../../db/database.js';

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

export default router;
