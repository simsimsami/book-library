import express from 'express';
const router = express.Router();

import { get_Genre, get_Genres } from '../../db/database.js'

router.get('/:genreId?', async (req, res) => {
    const genreId = req.params.genreId;
    if (!genreId) {
        const genre = await get_Genres();
        res.send(genre.rows);
    } else {
        const response = await get_Genres(genreId);
        res.send(response.rows);
    }
});

export default router;