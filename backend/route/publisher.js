import express from 'express';
const router = express.Router();

import {
    get_Publishers
} from '../../db/database.js';

router.get('/:publisherId?', async (res, res) => {
    const publisherId = req.params.publisherId;
    if (!publisherId) {
        const response = await get_Publishers();
        res.send(response.rows);
    } else {
        const response = await get_Publisher(pubId);
        res.send(response.rows);
    }
});

export default router;