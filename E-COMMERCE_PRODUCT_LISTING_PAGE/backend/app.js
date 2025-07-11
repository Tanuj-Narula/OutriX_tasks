import express from 'express';
import mongoose from 'mongoose';
import menClothing from './routes/men_clothing.js';
import womenClothing from './routes/women_clothing.js';
import kidsClothing from './routes/kids_clothing.js';
import footwear from './routes/footwear.js';
import beauty from './routes/beauty.js';
import cors from 'cors';
import { footwearModel } from './models/footwearModel.js';
import { footwearData } from '../footwear.js';

const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/men_clothing' , menClothing)
app.use('/api/women_clothing' , womenClothing)
app.use('/api/kids_clothing' , kidsClothing)
app.use('/api/footwear' , footwear)
app.use('/api/beauty' , beauty)


mongoose.connect('mongodb://localhost/E-commerce')
.then(()=> console.log('Connected to MongoDB') )
.catch((err)=> console.log("couldn't connect to mongodb", err));


app.get("/"  ,(req,res) =>{
    res.send("API For Products");
});

const port = process.env.PORT || 3000;

app.listen(port , ()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})

// const upload_items = (data)=>{
//     footwearModel.insertMany(data)
//     .then(() => console.log("Items uploaded successfully"))
//     .catch((err) => console.log("Error uploading items", err));
// }

// upload_items(footwearData)