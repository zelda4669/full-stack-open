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

function tokenExtractor(req, res, next) {
    const auth = req.get('authorization')
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
        req.token = auth.substring(7)
    }
    
    next()
}

module.exports = { 
    unknownEndpoint, 
    errorHandler,
    tokenExtractor,
}