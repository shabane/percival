const express = require('express');
const router = express.Router();


router.get('/:id', (req, res) => {
    if (!req.cookies.username && !req.cookies.password) res.status(403).send("Not Authorized");
    res.send("yep");
});

exports.router = router;