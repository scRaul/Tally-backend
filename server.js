import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import dotenv from 'dotenv';
import dbConnection from './config/dbConnection.js'
import errorHandler from './middleware/errorHandler.js';
import express from 'express';
import { logEvents, logger } from './middleware/logger.js';
import mongoose from 'mongoose';
import root from './routes/root.js';

dotenv.config();

const PORT = process.env.PORT || 3500;

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(logger);
}

dbConnection();

app.use(express.json());

app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/', express.static('public'));

app.use('/', root);

app.all('*', (req, res) => {
    res.status(404);

    if (req.accepts('json')) {
        res.json({ message: '404 - not found' });
    } else {
        res.type('text').send('404 not found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Tally connceted to database!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (error) => {
    console.error(error);

    const file = 'dbError.log';
    const message = `${error.no}: (${error.hostname}) ${error.syscall} ${error.code}\n`;

    logEvents(message, file);
});
