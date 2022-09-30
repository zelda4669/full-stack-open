const logger = require('./logger')

function unknownEndpoint(req, res) {
    res.status(404).send({
        error: 'unknown endpoint'
    })
}

function errorHandler(err, req, res, next) {
    logger.error(err.message)

    next(err)
}

const middleware = { unknownEndpoint, errorHandler }

module.exports = middleware