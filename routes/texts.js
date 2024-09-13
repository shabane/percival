const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send("Hi from Text API");
});

exports.router = router;