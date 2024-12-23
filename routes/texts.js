const express = require('express');
const router = express.Router();
const { User, Text, User_Data } = require('../models');
const { debug } = require('../settings');
const response_text = require('../utils/response_text');
const find_user = require("../utils/find_user");
const auth = require("basic-auth");


router.get('/:id', (req, res) => {
    const user = auth(req);
    User.findOne({
        where: {
            username: user.name,
            password: user.pass,
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


router.post('/', (req, res) => {
    const user = auth(req);
    find_user(user.name, user.pass).then(_user => {
        if (!_user) {
            res.status(403).send(response_text["403"]);
            return;
        }
    }).catch( err => {
        debug(err);
        res.status(500).send(response_text["500"]);
        return;
    });

    User.findOne({
        where: {
            username: req.body.username,
        }
    }).then(user => {
        if (!user) {
            res.status(404).send("That user does not exist!");
            return;
        }

        Text.create({data: req.body.text}).then(text => {
            User_Data.create({
                user: user.id,
                data: text.id,
                sender: user.username,
            }).then(user_data => {
                res.send({
                    user: user.username,
                    text: text,
                    user_data: user_data,
                })
            }).catch(err => {
                debug(err);
                res.status(500).send(response_text["500"]);
                return;
            });
        }).catch(err => {
            debug(err);
            res.status(500).send(response_text["500"]);
            return;
        });
    }).catch(err => {
        debug(err);
        res.status(500).send(response_text["500"]);
        return;
    });
});


router.put("/", (req, res) => {
    res.status(501).send(response_text["501"]);
});


router.patch("/", (req, res) => {
    res.status(501).send(response_text["501"]);
});


router.delete("/", (req, res) => {
    res.status(501).send(response_text["501"]);
});


router.options("/", (req, res) => {
    res.send(["POST", "GET"]);
})


router.get("/", (req, res) => {
    const user = auth(req);
    find_user(user.name, user.pass).then(user => {
        if (!user) {
            res.status(403).send(response_text["403"]);
            return;
        }

        User_Data.findAll({
            where: {
                user: user.id,
            }
        }).then(user_data => {
            res.send(user_data);
        }).catch(err => {
            debug(err);
            res.status(500).send(response_text["500"]);
            return;
        });
    }).catch(err => {
        debug(err);
        res.status(500).send(response_text["500"]);
        return;
    })
});


exports.router = router;