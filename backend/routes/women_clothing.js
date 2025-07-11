import express from 'express';
import { Router } from 'express';
import {women_clothing}  from '../models/womenModel.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const items = await women_clothing.find();
        res.status(200).send(items);
    }catch (error) {
        res.status(500).send({ message: 'Error fetching items', error });
    }
});

export default router;