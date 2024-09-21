const express = require('express');
const router = express.Router();
const { User, Text, User_Data } = require('../models');
const { debug } = require('../settings');
const response_text = require('../utils/response_text');


router.get('/:id', (req, res) => {
    if (!req.cookies.username && !req.cookies.password) {
        res.status(401).send(response_text["401"]);
        return;
    }
    User.findOne({
        where: {
            username: req.cookies.username,
            password: req.cookies.password,
        },
    }).then(user => {
        if (!user) {
            res.status(401).send(response_text["401"]);
            return;
        }
        User_Data.findOne({
            where: {
                user: user.id,
                data: req.params.id,
            }
        }).then(user_data => {
            if (!user_data) {
                res.status(404).send(response_text["404"]);
                return;
            }
            Text.findByPk(user_data.data).then(text => {
                if (!text) {
                    res.status(404).send(response_text["404"]);
                    return;
                }
                res.send(text);
            }).catch(err => {
                res.status(500).send(response_text["500"]);
                debug(err.message);
            });
        }).catch(err => {
            debug(err.message);
            res.status(500).send(response_text["500"]);
        });
    }).catch(err => {
        debug(err.message);
        res.status(500).send(response_text["500"]);
    });
});

exports.router = router;