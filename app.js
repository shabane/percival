const express = require('express');
const texts = require('./routes/texts');
const cookieParser = require('cookie-parser')

app = express();

// Installed middleWare
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/text/', texts.router);

app.listen(process.env.PORT || 3000);
