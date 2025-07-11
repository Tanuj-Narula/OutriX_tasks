import mongoose from 'mongoose'

const  beautyModel = new mongoose.model('beauty_prod', new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    gender: { type: String, required: true },
}))

export { beautyModel };