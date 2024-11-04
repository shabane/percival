const express = require('express');
const texts = require('./routes/texts');
const cookieParser = require('cookie-parser')
const links = require('./routes/links');
const users = require("./routes/users");
const files = require("./routes/files");
const cors = require("cors");

app = express();

// Installed middleWare
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/text/', texts.router);
app.use('/api/link/', links.router);
app.use('/api/user/', users.router);
app.use('/api/file/', files.router);

app.listen(process.env.PORT || 3000);
