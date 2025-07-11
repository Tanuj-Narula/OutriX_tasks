import mongoose from 'mongoose'

const  kids_clothing = new mongoose.model('kids_clothing', new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    material: { type: String, required: true },
    gender: { type: String, required: true }
}))

export { kids_clothing };