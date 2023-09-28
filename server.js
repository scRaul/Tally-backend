const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const express = require('express');
const { logger } = require('./middleware/logger');
const path = require('path');
const root = require('./routes/root');


dotenv.config();

const PORT = process.env.PORT || 3500;

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(logger);
}

app.use(express.json());

app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/', express.static(path.join(__dirname, 'public')));

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
