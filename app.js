const express = require('express');
const texts = require('./routes/texts');
const cookieParser = require('cookie-parser')
const links = require('./routes/links');
const users = require("./routes/users");
const check_cookies = require("./utils/check_cookies");

app = express();

// Installed middleWare
app.use(express.json());
app.use(cookieParser());


// Routes
app.use('/api/text/', check_cookies, texts.router);
app.use('/api/link/', check_cookies, links.router);
app.use('/api/user/', users.router);

app.listen(process.env.PORT || 3000);
