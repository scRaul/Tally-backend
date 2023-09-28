const { logEvents } = require('./logger');

async function errorHandler(error, req, res, next) {
    const message = `${error.name}: ${error.message} [${req.method}] '${req.url}' (${req.headers.origin})`
    const file_name = 'errors.log';

    logEvents(message, file_name);

    console.error(error.stack);

    const status = res.statusCode || 500;

    res.status(status);
    res.json(message);
}

module.exports = errorHandler;
