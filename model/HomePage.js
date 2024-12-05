const mongoose = require('mongoose')

const Schema = mongoose.Schema

const HomePageSchema = new Schema({
    singleImage: {
        type: String
    }
})

const Homepage = mongoose.model('Homepage', HomePageSchema)
module.exports = Homepage