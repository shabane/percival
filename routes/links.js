express = require("express");
const router = express.Router()
const find_user = require("../utils/find_user");
const response_text = require("../utils/response_text");
const { Link, User_Link, User } = require("../models");
const {debug} = require("../settings");
const auth = require("basic-auth");


router.get("/:id", (req, res) => {
    const user = auth(req);
    find_user(user.name, user.pass).then(user => {
        if (!user) {
            res.status(403).send(response_text["403"]);
            return;
        }

        User_Link.findOne({
            where: {
                user: user.id,
                data: req.params.id,
            }
        }).then(user_link => {
            Link.findOne({
                where: {
                    id: req.params.id,
                },
            }).then(link => {
                res.send(link);
            }).catch(err => {
                res.status(404).send(response_text["404"]);
            });
        }).catch(err => {
            debug(err.message);
            res.status(403).send(response_text["403"]);
        });
    });
});


router.post("/", (req, res) => {
    const user = auth(req);
    find_user(user.name, user.pass).then(_user => {
        if (!_user) {
            res.status(403).send(response_text["403"]);
            return;
        }

        User.findOne({
            where: {
                username: req.body.username,
            }
        }).then(user => {
            if (!user) {
                res.status(404).send("Username not exist");
                return;
            }

            Link.create({
                dest: req.body.dest,
            }).then(link => {
                User_Link.create({
                    user: user.id,
                    data: link.id,
                    sender: user.username,
                }).then(user_link => {
                    res.send({
                        user: user.username,
                        link: link,
                        user_link: user_link,
                    });
                }).catch(err => {
                    debug(err);
                    res.status(500).send(err.message);
                    return;
                });
            }).catch(err => {
                debug(err);
                res.status(500).send(err.message);
                return;
            });
        }).catch(err => {
            debug(err);
            res.status(500).send(err.message);
            return;
        });
    }).catch(err => {
        debug(err);
        res.status(500).send(err.message);
        return;
    });
});


router.get("/", (req, res) => {
    const user = auth(req);
    find_user(user.name, user.pass).then(user => {
        if (!user) {
            res.status(403).send(response_text["403"]);
            return;
        }

        User_Link.findAll({
            where: {
                user: user.id,
            }
        }).then(user_links => {
            res.send(user_links);
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


router.options("/", (req, res) => {
    res.send(["GET", "POST"]);
});


exports.router = router;
