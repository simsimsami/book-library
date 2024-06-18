import express from 'express';
const router = express.Router();

import { get_Publishers, get_Publisher } from '../../db/database/database.js';

router.get('/:publisherId?', async (req, res) => {
  const publisherId = req.params.publisherId;
  if (!publisherId) {
    const response = await get_Publishers();
    res.send(response.rows);
  } else {
    // This gets a list of books under the publisher
    const response = await get_Publisher(publisherId);
    res.send(response.rows);
  }
});

export default router;
