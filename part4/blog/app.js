const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const url = config.MONGODB_URI

mongoose.connect(url)
    .then(() => {
        logger.info('Connected to database')
    })
    .catch((err) => {
        logger.error('Error connecting to MongoDB', err.message)
    })


app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app