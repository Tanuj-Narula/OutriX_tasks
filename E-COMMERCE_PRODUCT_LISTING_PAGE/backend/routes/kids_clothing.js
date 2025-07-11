import { Router } from "express";
import { kids_clothing } from "../models/kidsModel.js";

const router = Router();

router.get("/", async (req,res)=>{
    try {
        const items = await kids_clothing.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching items", error });
    }
})

export default router;