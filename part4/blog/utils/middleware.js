const logger = require('./logger')

function unknownEndpoint(req, res) {
    res.status(404).send({
        error: 'unknown endpoint'
    })
}

function errorHandler(err, req, res, next) {
    if(err.name === 'ValidationError') {
        return res.status(400).send(err.message)
    }
    logger.error(err.message)

    next(err)
}

const middleware = { unknownEndpoint, errorHandler }

module.exports = middleware