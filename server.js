import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorHandler.js';
import express from 'express';
import { logger } from './middleware/logger.js';
import root from './routes/root.js';

dotenv.config();

const PORT = process.env.PORT || 3500;

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(logger);
}

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
