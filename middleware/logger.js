const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

async function logEvents(message, fileName) {
    const date_time = format(new Date(), 'yyyyMMdd\th:mm a').toString();
    const log_item = `${date_time}\t${uuid()}\t${message}`;

    try {
        const file_path = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(file_path)) {
            await fsPromises.mkdir();
        }

        await fsPromises.appendFile(path.join(file_path, fileName), log_item);
    } catch (error) {
        console.error(error);
    }
}

async function logger(req, res, next) {
    const message = `[${req.method}] "${req.url}" (${req.headers.origin})`;
    const file_name = 'requests.log';

    logEvents(message, file_name);

    next();
}

module.exports = { logger, logEvents };