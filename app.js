const express = require('express');
const texts = require('./routes/texts');

app = express();

app.use(express.json());
app.use('/api/text/', texts.router);

app.listen(process.env.PORT || 3000);
