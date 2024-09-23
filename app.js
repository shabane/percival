const express = require('express');
const texts = require('./routes/texts');
const cookieParser = require('cookie-parser')
const links = require('./routes/links');
const response_text = require('./utils/response_text');

app = express();

// Installed middleWare
app.use(express.json());
app.use(cookieParser());

// Check if cookies are exist
app.use((req, res, next) => {
    if (!req.cookies.username && !req.cookies.password) {
        res.status(401).send(response_text["401"]);
        return;
    }
    next();
});

// Routes
app.use('/api/text/', texts.router);
app.use('/api/link/', links.router);

app.listen(process.env.PORT || 3000);
