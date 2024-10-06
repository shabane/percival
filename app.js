const express = require('express');
const texts = require('./routes/texts');
const cookieParser = require('cookie-parser')
const links = require('./routes/links');
const users = require("./routes/users");
const check_cookies = require("./utils/check_cookies");
const files = require("./routes/files");
const cors = require("cors");


app = express();

// Installed middleWare
app.use(cors({origin: ["*"]}))
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/text/', check_cookies, texts.router);
app.use('/api/link/', check_cookies, links.router);
app.use('/api/user/', users.router);
app.use('/api/file/', check_cookies, files.router);

app.listen(process.env.PORT || 3000);
