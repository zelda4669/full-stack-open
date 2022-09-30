const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

const url = config.MONGODB_URI

mongoose.connect(url)
    .then(() => {
        logger.info('Connected to database')
    })
    .catch((err) => {
        logger.error('Error connecting to MongoDB', err.message)
    })

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)