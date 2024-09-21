const express = require('express');
const router = express.Router();
const { User, Text, User_Data } = require('../models');
const { debug } = require('../settings');

router.get('/:id', (req, res) => {
    if (!req.cookies.username && !req.cookies.password) {
        res.status(400).send("Set Username and Password");
        return;
    }
    User.findOne({
        where: {
            username: req.cookies.username,
            password: req.cookies.password,
        },
    }).then(user => {
        if (!user) {
            res.status(403).send("No Such User!");
            return;
        }
        User_Data.findOne({
            where: {
                user: user.id,
                data: req.params.id,
            }
        }).then(user_data => {
            if (!user_data) {
                res.status(404).send("Text Not Found!");
                return;
            }
            Text.findByPk(user_data.data).then(text => {
                if (!text) {
                    res.status(404).send("Text Not Found!");
                    return;
                }
                res.send(text);
            }).catch(err => {
                res.status(500).send("Internal Error");
                debug(err.message);
            });
        }).catch(err => {
            debug(err.message);
            res.status(500).send("Internal Error");
        });
    }).catch(err => {
        debug(err.message);
        res.status(500).send("Internal Error");
    });
});

exports.router = router;