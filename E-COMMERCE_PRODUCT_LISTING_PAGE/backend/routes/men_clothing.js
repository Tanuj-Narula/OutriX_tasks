import express from 'express';
import { Router } from 'express';
import  {men_clothing}  from '../models/menModel.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const items = await men_clothing.find();
        res.status(200).send(items);
    }catch (error) {
        res.status(500).send({ message: 'Error fetching items', error });
    }
});

export default router;