const User = require('../models/user')
const logger = require('./logger')

function unknownEndpoint(req, res) {
    res.status(404).send({
        error: 'unknown endpoint'
    })
}

function errorHandler(err, req, res, next) {
    if(err.name === 'ValidationError') {
        return res.status(400).send(err.message)
    } else if(err.name === 'JsonWebTokenError') {
        return res.status(401).json({ err: 'invalid token' })
    }

    logger.error(err.message)

    next(err)
}

function tokenExtractor(req) {
    const auth = req.get('authorization')
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7)
    }
    return null
}

async function userExtractor(req, res, next) {
    const token = tokenExtractor(req)
    if(!token.id) {
        return res.status(401).json({ 'invalid token' })
    }

    const user = await User.findById(token.id)
    req.user = user

    next()
}

module.exports = { 
    unknownEndpoint, 
    errorHandler,
    userExtractor,
}